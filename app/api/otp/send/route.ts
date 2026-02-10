import { NextResponse, NextRequest } from "next/server";
import { createAndSendOtp } from "@/services/otp.service";
import { connectToDatabase } from "@/lib/db/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const email = (body?.email || "").toString().trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    await createAndSendOtp(email);
    return NextResponse.json({ ok: true, message: "OTP sent" });
  } catch (err: any) {
    console.error("POST /api/otp/send error:", err?.message || err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 429 });
  }
}