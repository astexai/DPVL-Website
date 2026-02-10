import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { User } from "@/models/User.model";
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
    if (!token) return NextResponse.json({ error: "Missing token" }, { status: 401 });

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any;
    } catch (e) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const emailFromToken = (decoded.email || "").toString().toLowerCase();
    const email = validateAndSanitizeString(form.get("email")).toLowerCase();
    if (email !== emailFromToken) return NextResponse.json({ error: "Token email mismatch" }, { status: 401 });

    // collect fields
    const payload: any = {
      firstName: validateAndSanitizeString(form.get("firstName")),
      lastName: validateAndSanitizeString(form.get("lastName")),
      fatherName: validateAndSanitizeString(form.get("fatherName")),
      email,
      phone: validateAndSanitizeString(form.get("phone")),
      state: validateAndSanitizeString(form.get("state")),
      district: validateAndSanitizeString(form.get("district")),
      age: validateAndSanitizeString(form.get("age")),
      gender: validateAndSanitizeString(form.get("gender")),
      position: validateAndSanitizeString(form.get("position")),
      experience: validateAndSanitizeString(form.get("experience")),
      emailVerified: true,
    };

    // Aadhaar file handling (FormData File)
    const aadhaarFile = form.get("aadhaar") as File | null;
    if (!aadhaarFile) {
      return NextResponse.json({ error: "Aadhaar file required" }, { status: 400 });
    }

    // limit file size to 5MB
    const maxBytes = 5 * 1024 * 1024;
    const arrayBuf = await aadhaarFile.arrayBuffer();
    if (arrayBuf.byteLength > maxBytes) {
      return NextResponse.json({ error: "Aadhaar file too large" }, { status: 400 });
    }

    // ensure uploads dir
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    // write file
    const filename = `aadhaar-${Date.now()}-${Math.random().toString(36).slice(2,8)}-${String(aadhaarFile.name).replace(/\s+/g,"_")}`;
    const targetPath = path.join(uploadsDir, filename);
    const buffer = Buffer.from(arrayBuf);
    fs.writeFileSync(targetPath, buffer);

    payload.aadhaarPath = `/uploads/${filename}`;

    // Save user (unique email)
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    const user = new User(payload);
    await user.save();

    return NextResponse.json({ ok: true, userId: user._id });
  } catch (err: any) {
    console.error("POST /api/register error:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}