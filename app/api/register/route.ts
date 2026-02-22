import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import jwt from "jsonwebtoken";
import { sendRegistrationSuccessEmail } from "@/services/email.service";

import fs from "fs";
import path from "path";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

function validateAndSanitizeString(v: any) {
  if (!v) return "";
  return String(v).trim();
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    // Expect multipart/form-data from client (FormData)
    const form = await req.formData();

    const token = validateAndSanitizeString(form.get("token"));
    if (!token)
      return NextResponse.json({ error: "Missing token" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (e) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      );
    }

    const emailFromToken = (decoded.email || "").toString().toLowerCase();
    const email = validateAndSanitizeString(form.get("email")).toLowerCase();
    if (email !== emailFromToken)
      return NextResponse.json(
        { error: "Token email mismatch" },
        { status: 401 },
      );

    // collect fields
    const payload: any = {
      firstName: validateAndSanitizeString(form.get("firstName")),
      lastName: validateAndSanitizeString(form.get("lastName")),
      fatherName: validateAndSanitizeString(form.get("fatherName")),
      email,
      phone: validateAndSanitizeString(form.get("phone")),
      state: validateAndSanitizeString(form.get("state")),
      district: validateAndSanitizeString(form.get("district")),
      emailVerified: true,
      status: "pending",
    };

    // phone validation
    if (!/^\d{10}$/.test(payload.phone)) {
      return NextResponse.json(
        { error: "Invalid phone number: 10 digits required" },
        { status: 400 },
      );
    }

    // Aadhaar file handling (FormData File)
    const aadhaarFile = form.get("aadhaar") as File | null;
    if (!aadhaarFile) {
      return NextResponse.json(
        { error: "Aadhaar file required" },
        { status: 400 },
      );
    }

    // limit file size to 5MB
    const maxBytes = 5 * 1024 * 1024;
    const arrayBuf = await aadhaarFile.arrayBuffer();
    if (arrayBuf.byteLength > maxBytes) {
      return NextResponse.json(
        { error: "Aadhaar file too large" },
        { status: 400 },
      );
    }

    payload.aadhaarData = Buffer.from(arrayBuf);
    payload.aadhaarContentType = aadhaarFile.type || "application/octet-stream";

    // Verify Payment with Cashfree
    const orderId = validateAndSanitizeString(form.get("orderId"));
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const environment = process.env.CASHFREE_ENVIRONMENT || "SANDBOX";
    const baseUrl =
      environment === "PRODUCTION"
        ? `https://api.cashfree.com/pg/orders/${orderId}`
        : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

    const appId = process.env.CASHFREE_APP_ID || "";
    const secretKey = process.env.CASHFREE_SECRET_KEY || "";

    let isPaid = false;
    if (!appId || !secretKey) {
      console.warn(
        "Cashfree API keys not found. Mocking successful payment verification.",
      );
      isPaid = true;
    } else {
      const pgResponse = await fetch(baseUrl, {
        method: "GET",
        headers: {
          "x-api-version": "2023-08-01",
          "x-client-id": appId,
          "x-client-secret": secretKey,
        },
      });
      const pgData = await pgResponse.json();
      if (pgResponse.ok && pgData.order_status === "PAID") {
        isPaid = true;
      }
    }

    if (!isPaid) {
      return NextResponse.json(
        { error: "Payment verification failed. Please try again." },
        { status: 400 },
      );
    }

    payload.paymentOrderId = orderId;
    payload.paymentStatus = "success";

    // Save user (unique email)
    const existing = await Candidate.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    const user = new Candidate(payload);
    await user.save();

    // Update aadhaarPath with the dynamic URL using the saved ID
    user.aadhaarPath = `/api/admin/candidates/aadhaar/${user._id}`;
    await user.save();

    // Trigger success email
    try {
      await sendRegistrationSuccessEmail(
        user.email,
        `${user.firstName} ${user.lastName}`,
      );
    } catch (emailErr) {
      console.error("Failed to send registration success email:", emailErr);
    }

    return NextResponse.json({ ok: true, userId: user._id });
  } catch (err: any) {
    console.error("POST /api/register error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
