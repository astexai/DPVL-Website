import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import { sendRegistrationSuccessEmail } from "@/services/email.service";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const baseUrl =
      process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
        ? `https://api.cashfree.com/pg/orders/${orderId}`
        : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    const response = await fetch(baseUrl, {
      method: "GET",
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
    });

    const data = await response.json();

    if (!response.ok || data.order_status !== "PAID") {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 400 }
      );
    }

    const candidate = await Candidate.findOne({
      paymentOrderId: orderId,
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 }
      );
    }

    // ✅ UPDATE STATUS
    candidate.paymentStatus = "success";
    await candidate.save();

    // ✅ SEND EMAIL
    await sendRegistrationSuccessEmail(
      candidate.email,
      candidate.firstName
    );

    return NextResponse.json({ success: true });

  } catch (err: any) {
    console.error("Verify payment error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}