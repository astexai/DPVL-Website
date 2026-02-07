import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const matches = await db.collection("matches").find({}).sort({ matchNumber: 1, createdAt: 1 }).toArray();
    return NextResponse.json({ matches });
  } catch (err) {
    console.error("GET /api/matches error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}