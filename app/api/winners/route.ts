import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    const db = await connectToDatabase();
    const matches = await db
      .collection("matches")
      .find({})
      .sort({ matchNumber: 1 })
      .toArray();

    return NextResponse.json({ matches });
  } catch (err) {
    console.error("GET /api/winners error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
export async function POST(req: NextRequest) {
  try {
    // Check if JWT_SECRET is defined
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // require admin token
    const auth = req.headers.get("authorization") || "";
    if (!auth.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const token = auth.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Invalid token format" }, { status: 401 });
    }

    try {
      jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const {
      id, // optional Mongo _id string
      matchNumber,
      winner,
      team1Score,
      team2Score,
      status = "Completed",
    } = body || {};

    if (!winner || (!id && !matchNumber)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const filter = id ? { _id: new ObjectId(id) } : { matchNumber: Number(matchNumber) };

    const update = {
      $set: {
        winner,
        team1Score: String(team1Score ?? ""),
        team2Score: String(team2Score ?? ""),
        status,
        updatedAt: new Date(),
      },
    };

    const res = await db.collection("matches").findOneAndUpdate(filter, update, {
      returnDocument: "after",
      upsert: false,
    });

    // Handle the case where res might be null
    if (!res) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    // Now TypeScript knows res is not null, so we can safely access res.value
    if (!res.value) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 });
    }

    return NextResponse.json({ match: res.value });
  } catch (err) {
    console.error("POST /api/winners error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}