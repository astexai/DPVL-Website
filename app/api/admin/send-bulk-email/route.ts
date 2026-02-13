import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const resend = new Resend(process.env.Resend_API);

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
      return NextResponse.json({ error: "Missing emails or content" }, { status: 400 });
    }

    const fromEmail = process.env.EMAIL_FROM!;

    // Resend batch sending
    const results = await Promise.all(
      emails.map((to: string) =>
        resend.emails.send({
          from: fromEmail,
          to,
          subject: subject || "Participation Update",
          text: content,
          html: `<p>${content.replace(/\n/g, "<br>")}</p>`,
        })
      )
    );

    return NextResponse.json({ ok: true, results });
  } catch (err: any) {
    console.error("Bulk email error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
