import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import jwt from "jsonwebtoken";

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

    return NextResponse.json({ ok: true, userId: user._id });
  } catch (err: any) {
    console.error("POST /api/register error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
