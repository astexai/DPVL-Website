import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone } = await req.json();

    if (!firstName || !email) {
      return NextResponse.json(
        { error: "Missing required customer details" },
        { status: 400 },
      );
    }

    // Prepare Cashfree API call
    const environment = process.env.CASHFREE_ENVIRONMENT || "SANDBOX";
    const baseUrl =
      environment === "PRODUCTION"
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

    const appId = process.env.CASHFREE_APP_ID || "";
    const secretKey = process.env.CASHFREE_SECRET_KEY || "";

    // If API keys are not provided yet, we can mock a successful session ID for frontend testing
    if (!appId || !secretKey) {
      console.warn(
        "Cashfree API keys not found. Returning a mock payment session id for UI testing.",
      );
      return NextResponse.json({
        payment_session_id: "session_" + Date.now(),
        order_id: "order_" + Date.now(),
      });
    }

    const orderId = `order_reg_${Date.now()}`;

    const payload = {
      order_id: orderId,
      order_amount: 499,
      order_currency: "INR",
      customer_details: {
        customer_id: email.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase(),
        customer_name: `${firstName} ${lastName}`,
        customer_email: email.toLowerCase(),
        customer_phone: phone || "9999999999",
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/register?order_id={order_id}`,
      },
    };

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": appId,
        "x-client-secret": secretKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cashfree order creation failed:", data);
      return NextResponse.json(
        { error: data.message || "Failed to create order on Cashfree" },
        { status: response.status },
      );
    }

    return NextResponse.json({
      payment_session_id: data.payment_session_id,
      order_id: data.order_id,
    });
  } catch (err: any) {
    console.error("Create Order Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
