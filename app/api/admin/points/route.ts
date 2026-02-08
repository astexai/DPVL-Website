import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

const COLLECTION = 'pointsTable';
const DOC_ID = 'main';

// Define the team interface
interface Team {
  id: number;
  name: string;
  matches: number;
  wins: number;
  losses: number;
  points: number;
  setRatio: number;
  pointRatio: number;
  setsWon: number;
  setsLost: number;
  pointsFor: number;
  pointsAgainst: number;
  logo?: string;
}

// Define the document structure with string _id
interface PointsTableDoc {
  _id: string;  // ✅ String instead of ObjectId
  teams: Team[];
  updatedAt: Date;
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    
    // Type the collection with your interface
    const doc = await db.collection<PointsTableDoc>(COLLECTION).findOne({ _id: DOC_ID });
    
    // Normalize teams to include missing fields
    const teams = (doc?.teams ?? []).map((team) => ({
      ...team,
      pointsFor: team.pointsFor ?? 0,
      pointsAgainst: team.pointsAgainst ?? 0,
      setsWon: team.setsWon ?? 0,
      setsLost: team.setsLost ?? 0,
      setRatio: team.setRatio ?? 0,
      pointRatio: team.pointRatio ?? 0
    }));
    
    return NextResponse.json({ teams });
  } catch (err) {
    console.error('GET /api/admin/points error:', err);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body?.teams || !Array.isArray(body.teams)) {
      return NextResponse.json({ error: 'Invalid payload: teams array required' }, { status: 400 });
    }
    
    // Validate team structure
    for (const team of body.teams) {
      if (!team.name || typeof team.points !== 'number') {
        return NextResponse.json({ 
          error: 'Invalid team data: name and points required' 
        }, { status: 400 });
      }
    }
    
    const db = await connectToDatabase();
    
    const result = await db.collection<PointsTableDoc>(COLLECTION).updateOne(
      { _id: DOC_ID },
      { 
        $set: { 
          teams: body.teams, 
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );
    
    console.log('Update result:', result);
    
    return NextResponse.json({ 
      ok: true, 
      teams: body.teams,
      modified: result.modifiedCount,
      upserted: result.upsertedCount
    });
  } catch (err) {
    console.error('POST /api/admin/points error:', err);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}