import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature");

    const expectedSignature = crypto
      .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const body = JSON.parse(rawBody);

    if (body.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const orderId = body.data.order.order_id;

      await connectToDatabase();

      await Candidate.findOneAndUpdate(
        { paymentOrderId: orderId },
        { paymentStatus: "success" }
      );
    }

    if (body.type === "PAYMENT_FAILED_WEBHOOK") {
      const orderId = body.data.order.order_id;

      await connectToDatabase();

      await Candidate.findOneAndUpdate(
        { paymentOrderId: orderId },
        { paymentStatus: "failed" }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}