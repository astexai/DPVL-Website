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
    
    if (!email || !otp) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await verifyOtpForEmail(email, otp);

    // Parse OTP expiry from env or default to 10
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY || "10", 10);
    
    // Issue short-lived token
    const token = jwt.sign(
      { 
        email,
        type: "otp_verification"
      }, 
      JWT_SECRET, 
      { 
        expiresIn: `${expiryMinutes}m`  // Convert to string like "10m"
      }
    );
    
    return NextResponse.json({ 
      ok: true, 
      token,
      expiresIn: expiryMinutes * 60 // Return in seconds for client reference
    });
    
  } catch (err: any) {
    console.error("POST /api/otp/verify error:", err?.message || err);
    return NextResponse.json({ 
      error: err?.message || "Verification failed" 
    }, { 
      status: 400 
    });
  }
}