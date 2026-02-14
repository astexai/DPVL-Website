import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();

    const candidate = await Candidate.findById(id).select(
      "aadhaarData aadhaarContentType",
    );

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidate not found" },
        { status: 404 },
      );
    }

    if (!candidate.aadhaarData) {
      return NextResponse.json(
        { error: "Aadhaar binary data missing in database" },
        { status: 404 },
      );
    }

    return new NextResponse(new Uint8Array(candidate.aadhaarData), {
      headers: {
        "Content-Type":
          candidate.aadhaarContentType || "application/octet-stream",
        "Content-Disposition": "inline",
      },
    });
  } catch (err: any) {
    console.error("GET /api/admin/candidates/aadhaar/[id] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
