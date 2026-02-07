import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    
    const token = auth.split(" ")[1];
    const secret = process.env.JWT_SECRET;
    
    // Check if secret is defined BEFORE using it
    if (!secret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json({ ok: false, error: "Server configuration error" }, { status: 500 });
    }
    
    // Now secret is guaranteed to be a string
    const payload = jwt.verify(token, secret);
    
    return NextResponse.json({ ok: true, user: payload }, { status: 200 });
  } catch (err) {
    console.error("Token verification error:", err);
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}