import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

function calcMatchPoints(setsWonA: number, setsWonB: number): [number, number] {
  // Follow the math from your second snippet
  if (setsWonA === 3 && setsWonB === 0) return [4, 0];
  if (setsWonB === 3 && setsWonA === 0) return [0, 4];
  if (setsWonA === 2 && setsWonB === 1) return [2, 1];
  if (setsWonB === 2 && setsWonA === 1) return [1, 2];
  // fallback
  return setsWonA > setsWonB ? [3, 0] : [0, 3];
}

// Define interface for set
interface SetData {
  pointsA: number;
  pointsB: number;
}

// Define interface for match request body
interface MatchRequestBody {
  teamA: string;
  teamB: string;
  sets: SetData[];
  stadium?: string;
  time?: string;
  matchNumber?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: MatchRequestBody = await req.json();
    const { teamA, teamB, sets = [], stadium = "", time = "" } = body || {};

    if (!teamA || !teamB || !Array.isArray(sets) || sets.length === 0) {
      return NextResponse.json({ error: "Invalid match data" }, { status: 400 });
    }

    // calculate set wins and points
    let setsWonA = 0, setsWonB = 0;
    let pointsScoredA = 0, pointsScoredB = 0;

    for (const s of sets) {
      const pA = Number(s.pointsA);
      const pB = Number(s.pointsB);
      if (Number.isNaN(pA) || Number.isNaN(pB)) {
        return NextResponse.json({ error: "Invalid points value in sets" }, { status: 400 });
      }
      if (pA > pB) setsWonA++; else setsWonB++;
      pointsScoredA += pA;
      pointsScoredB += pB;
    }

    const [matchPointsA, matchPointsB] = calcMatchPoints(setsWonA, setsWonB);
    const winner = setsWonA > setsWonB ? teamA : (setsWonB > setsWonA ? teamB : "");

    const db = await connectToDatabase();
    const matchesCol = db.collection("matches");
    const scoreboard = db.collection("scoretable");

    // insert match doc
    const matchDoc = {
      matchNumber: body.matchNumber ?? undefined,
      team1: teamA,
      team2: teamB,
      sets,
      team1Score: String(pointsScoredA),
      team2Score: String(pointsScoredB),
      winner,
      status: winner ? "Completed" : "Pending",
      stadium,
      time,
      createdAt: new Date(),
    };
    const insertRes = await matchesCol.insertOne(matchDoc);

    // helper to update a team doc
    async function updateTeam(
      name: string,
      setsWon: number,
      setsLost: number,
      ptsScored: number,
      ptsConceded: number,
      matchPoints: number,
      isWin: boolean
    ) {
      const existing = await scoreboard.findOne({ teamname: name });
      const opponentName = name === teamA ? teamB : teamA;
      const matchRecord = {
        opponent: opponentName,
        setsWon,
        setsLost,
        ptsScored,
        ptsConceded,
        result: isWin ? "Win" : "Loss",
        matchId: insertRes.insertedId,
        createdAt: new Date()
      };

      if (!existing) {
        const newDoc = {
          teamname: name,
          totalMatches: 1,
          totalWins: isWin ? 1 : 0,
          totalLosses: isWin ? 0 : 1,
          points: matchPoints,
          setsWon,
          setsLost,
          pointsScored: ptsScored,
          pointsConceded: ptsConceded,
          setRatio: setsLost > 0 ? Number((setsWon / setsLost).toFixed(2)) : Number(setsWon.toFixed(2)),
          pointsRatio: ptsConceded > 0 ? Number((ptsScored / ptsConceded).toFixed(2)) : Number(ptsScored.toFixed(2)),
          allMatches: [matchRecord],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        await scoreboard.insertOne(newDoc);
      } else {
        const updated = {
          $inc: {
            totalMatches: 1,
            totalWins: isWin ? 1 : 0,
            totalLosses: isWin ? 0 : 1,
            points: matchPoints,
            setsWon: setsWon,
            setsLost: setsLost,
            pointsScored: ptsScored,
            pointsConceded: ptsConceded
          },
          $push: {
            allMatches: matchRecord as any // Type assertion to fix TypeScript error
          },
          $set: { updatedAt: new Date() }
        };
        await scoreboard.updateOne({ _id: existing._id }, updated);
        
        // recalc ratios after update
        const fresh = await scoreboard.findOne({ _id: existing._id });
        if (fresh) {
          const setRatio = fresh.setsLost > 0 ? Number((fresh.setsWon / fresh.setsLost).toFixed(2)) : Number(fresh.setsWon.toFixed(2));
          const pointsRatio = fresh.pointsConceded > 0 ? Number((fresh.pointsScored / fresh.pointsConceded).toFixed(2)) : Number(fresh.pointsScored.toFixed(2));
          await scoreboard.updateOne({ _id: existing._id }, { $set: { setRatio, pointsRatio } });
        }
      }
    }

    // apply updates for both teams
    await updateTeam(teamA, setsWonA, setsWonB, pointsScoredA, pointsScoredB, matchPointsA, setsWonA > setsWonB);
    await updateTeam(teamB, setsWonB, setsWonA, pointsScoredB, pointsScoredA, matchPointsB, setsWonB > setsWonA);

    return NextResponse.json({ 
      message: "Match recorded", 
      matchId: insertRes.insertedId 
    });
  } catch (err) {
    console.error("POST /api/matches/add error:", err);
    return NextResponse.json({ 
      error: "Internal server error", 
      details: String(err) 
    }, { status: 500 });
  }
}