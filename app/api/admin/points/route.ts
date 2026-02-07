import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const COLLECTION = 'pointsTable';
// Use a constant ObjectId
const DOC_ID = new ObjectId('65f4b8e9d8a1b2c3d4e5f6a7'); // Replace with actual ID

export async function GET() {
  try {
    const db = await connectToDatabase();
    
    // Find document with ObjectId
    const doc = await db.collection(COLLECTION).findOne({ _id: DOC_ID });
    
    return NextResponse.json({ teams: doc?.teams ?? [] });
  } catch (err) {
    console.error('GET /api/admin/points error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body?.teams || !Array.isArray(body.teams)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
    
    const db = await connectToDatabase();
    
    await db.collection(COLLECTION).updateOne(
      { _id: DOC_ID }, // ObjectId
      { 
        $set: { 
          teams: body.teams, 
          updatedAt: new Date() 
        } 
      },
      { upsert: true }
    );
    
    return NextResponse.json({ 
      ok: true, 
      teams: body.teams 
    });
  } catch (err) {
    console.error('POST /api/admin/points error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}