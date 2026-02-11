import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from '@/lib/db/mongodb';
import Banners from "@/app/models/Banners";


export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: "Banner ID is required" }, { status: 400 });
    }

    await connectToDatabase(); // Connect to MongoDB

    // Delete using Mongoose model
    const result = await Banners.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Banner deleted successfully",
      deletedId: id 
    });
  } catch (err) {
    console.error("DELETE /api/banners/[id] error:", err);
    return NextResponse.json({ 
      error: "Internal server error",
      details: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
}