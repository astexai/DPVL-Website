import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const col = db.collection("scoretable");
    const leaderboard = await col.find({}).sort({
      totalWins: -1,
      points: -1,
      setRatio: -1,
      pointsRatio: -1
    }).toArray();
    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error("GET /api/leaderboard error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}