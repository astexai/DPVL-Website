import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Webhook received:", body);

    await connectToDatabase();

    if (body.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const orderId = body?.data?.order?.order_id;

      if (!orderId) {
        return NextResponse.json({ error: "No orderId" }, { status: 400 });
      }

      await Candidate.findOneAndUpdate(
        { paymentOrderId: orderId },
        { paymentStatus: "success" }
      );

      console.log("Payment marked SUCCESS:", orderId);
    }

    if (body.type === "PAYMENT_FAILED_WEBHOOK") {
      const orderId = body?.data?.order?.order_id;

      if (!orderId) {
        return NextResponse.json({ error: "No orderId" }, { status: 400 });
      }

      await Candidate.findOneAndUpdate(
        { paymentOrderId: orderId },
        { paymentStatus: "failed" }
      );

      console.log("Payment marked FAILED:", orderId);
    }

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}