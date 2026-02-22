import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Middleware-like helper for admin auth
async function isAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) return false;
  const token = auth.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (e) {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { emails, subject, content } = body;

    if (!emails || !Array.isArray(emails) || emails.length === 0 || !content) {
      return NextResponse.json(
        { error: "Missing emails or content" },
        { status: 400 },
      );
    }

    // Nodemailer batch sending
    const results = await Promise.all(
      emails.map((to: string) =>
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to,
          subject: subject || "Participation Update",
          text: content,
          html: `<p>${content.replace(/\n/g, "<br>")}</p>`,
        }),
      ),
    );

    return NextResponse.json({ ok: true, results });
  } catch (err: any) {
    console.error("Bulk email error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
