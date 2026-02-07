import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Define interfaces for better TypeScript support
interface MatchRecord {
  opponent: string;
  setsWon: number;
  setsLost: number;
  ptsScored: number;
  ptsConceded: number;
  result: "Win" | "Loss";
  matchId: ObjectId;
}

interface ScoreboardDocument {
  teamname: string;
  totalMatches: number;
  totalWins: number;
  totalLosses: number;
  points: number;
  setsWon: number;
  setsLost: number;
  pointsScored: number;
  pointsConceded: number;
  setRatio: number;
  pointsRatio: number;
  allMatches: MatchRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Await the params Promise
    const resolvedParams = await params;
    const body = await req.json();
    const { winner } = body || {};
    
    if (!winner) return NextResponse.json({ error: "Winner required" }, { status: 400 });

    const db = await connectToDatabase();
    const matchesCol = db.collection("matches");
    const scoreboard = db.collection<ScoreboardDocument>("scoretable"); // Specify document type

    // Use resolvedParams.id instead of params.id
    const match = await matchesCol.findOne({ _id: new ObjectId(resolvedParams.id) });
    
    if (!match) return NextResponse.json({ error: "Match not found" }, { status: 404 });

    // Update match winner and status
    await matchesCol.updateOne(
      { _id: match._id }, 
      { $set: { winner, status: "Completed", updatedAt: new Date() } }
    );

    // Optional: recompute scoreboard entries for both teams
    // Recompute scoreboard from scratch for accuracy:
    await scoreboard.deleteMany({}); // clear existing scoreboard
    
    const allMatches = await matchesCol.find({}).toArray();
    
    for (const m of allMatches) {
      const teamA = m.team1;
      const teamB = m.team2;
      const sets = m.sets || [];
      
      let setsWonA = 0, setsWonB = 0, ptsA = 0, ptsB = 0;
      
      for (const s of sets) {
        const pA = Number(s.pointsA || 0);
        const pB = Number(s.pointsB || 0);
        if (pA > pB) setsWonA++; 
        else if (pB > pA) setsWonB++;
        ptsA += pA; 
        ptsB += pB;
      }
      
      const calculatePoints = (sa: number, sb: number) => {
        if (sa === 3 && sb === 0) return [4, 0];
        if (sb === 3 && sa === 0) return [0, 4];
        if (sa === 2 && sb === 1) return [2, 1];
        if (sb === 2 && sa === 1) return [1, 2];
        return sa > sb ? [3, 0] : [0, 3];
      };
      
      const [mpA, mpB] = calculatePoints(setsWonA, setsWonB);
      const isTeamAWinner = setsWonA > setsWonB;
      const isTeamBWinner = setsWonB > setsWonA;
      
      // Helper function to accumulate/update team stats
      async function updateTeamStats(
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
        
        const matchRecord: MatchRecord = {
          opponent: opponentName,
          setsWon,
          setsLost,
          ptsScored,
          ptsConceded,
          result: isWin ? "Win" : "Loss",
          matchId: m._id
        };

        if (!existing) {
          // Insert new team record
          await scoreboard.insertOne({
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
          });
        } else {
          // Update existing team record
          const updateObj: any = {
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
              allMatches: matchRecord
            },
            $set: { updatedAt: new Date() }
          };

          await scoreboard.updateOne(
            { _id: existing._id }, 
            updateObj
          );
          
          // Recalculate ratios
          const fresh = await scoreboard.findOne({ _id: existing._id });
          if (fresh) {
            const setRatio = fresh.setsLost > 0 
              ? Number((fresh.setsWon / fresh.setsLost).toFixed(2)) 
              : Number(fresh.setsWon.toFixed(2));
              
            const pointsRatio = fresh.pointsConceded > 0 
              ? Number((fresh.pointsScored / fresh.pointsConceded).toFixed(2)) 
              : Number(fresh.pointsScored.toFixed(2));
              
            await scoreboard.updateOne(
              { _id: existing._id }, 
              { $set: { setRatio, pointsRatio } }
            );
          }
        }
      }
      
      // Update both teams' stats
      await updateTeamStats(teamA, setsWonA, setsWonB, ptsA, ptsB, mpA, isTeamAWinner);
      await updateTeamStats(teamB, setsWonB, setsWonA, ptsB, ptsA, mpB, isTeamBWinner);
    }

    return NextResponse.json({ message: "Winner updated and leaderboard recomputed" });
  } catch (err) {
    console.error("PATCH /api/matches/:id/winner error:", err);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}