import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body || {};
    
    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // Check if JWT_SECRET is defined
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const db = await connectToDatabase();
    const admin = await db.collection("admins").findOne({ username });

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { 
        id: admin._id.toString(), 
        username: admin.username, 
        role: admin.role 
      },
      JWT_SECRET, // Now this is guaranteed to be a string
      { expiresIn: "8h" }
    );

    return NextResponse.json({
      token,
      id: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    });
  } catch (err) {
    console.error("Login error", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}