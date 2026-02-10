import { NextResponse, NextRequest } from "next/server";
import { verifyOtpForEmail } from "@/services/otp.service";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db/mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const email = (body?.email || "").toString().trim().toLowerCase();
    const otp = (body?.otp || "").toString().trim();
    if (!email || !otp) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    await verifyOtpForEmail(email, otp);

    // Issue short-lived token (10m)
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: `${process.env.OTP_EXPIRY || 10}m` });
    return NextResponse.json({ ok: true, token });
  } catch (err: any) {
    console.error("POST /api/otp/verify error:", err?.message || err);
    return NextResponse.json({ error: err?.message || "Verification failed" }, { status: 400 });
  }
}