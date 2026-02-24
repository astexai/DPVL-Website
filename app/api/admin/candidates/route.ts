import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import jwt from "jsonwebtoken";
import { sendCandidateStatusEmail } from "@/services/email.service";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

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

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const users = await Candidate.find({ paymentStatus: "success" }).sort({
      createdAt: -1,
    });
    return NextResponse.json(users);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 },
      );
    }

    const user = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!user) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    // Trigger email notification
    if (status === "accepted" || status === "rejected") {
      try {
        await sendCandidateStatusEmail(
          user.email,
          `${user.firstName} ${user.lastName}`,
          status,
        );
      } catch (emailErr) {
        console.error("Failed to send status email:", emailErr);
        // We don't block the response if email fails, but we log it
      }
    }

    return NextResponse.json({ ok: true, user });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing candidate ID" },
        { status: 400 },
      );
    }

    const user = await Candidate.findByIdAndDelete(id);

    if (!user) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Candidate deleted successfully",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
