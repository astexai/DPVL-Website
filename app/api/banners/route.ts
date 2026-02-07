import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const banners = await db.collection("banners").find({}).sort({ createdAt: 1 }).toArray();
    return NextResponse.json({ banners });
  } catch (err) {
    console.error("GET /api/banners error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const mobileSrc = body?.mobileSrc;
    const laptopSrc = body?.laptopSrc;
    const title = body?.title ?? "";
    const status = body?.status ?? "Active";

    if (!mobileSrc || !laptopSrc) {
      return NextResponse.json({ error: "mobileSrc and laptopSrc are required" }, { status: 400 });
    }

    // REMOVED: Size limit check - allowing any image size
    // Only basic validation for required fields
    
    const db = await connectToDatabase();
    const col = db.collection("banners");

    const doc = {
      title,
      mobileSrc,
      laptopSrc,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await col.insertOne(doc);
    const inserted = await col.findOne({ _id: result.insertedId });

    return NextResponse.json({ ok: true, banner: inserted });
  } catch (err) {
    console.error("POST /api/banners error:", err);
    // return error message to client to aid debugging (remove details in production)
    return NextResponse.json({ error: "Internal server error", details: String(err) }, { status: 500 });
  }
}

// DELETE banner by ID (using query parameter)
export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    
    console.log("DELETE request received for ID:", id);
    
    if (!id) {
      return NextResponse.json({ error: "Banner ID is required" }, { status: 400 });
    }

    // Validate if the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      console.log("Invalid ObjectId format:", id);
      return NextResponse.json({ error: "Invalid banner ID format" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const col = db.collection("banners");

    console.log("Attempting to delete banner with _id:", new ObjectId(id));
    
    // First, check if the banner exists
    const banner = await col.findOne({ _id: new ObjectId(id) });
    console.log("Found banner:", banner ? "Yes" : "No");
    
    if (!banner) {
      return NextResponse.json({ 
        error: "Banner not found",
        id: id,
        objectId: new ObjectId(id).toString()
      }, { status: 404 });
    }

    const result = await col.deleteOne({ _id: new ObjectId(id) });
    console.log("Delete result:", result);

    if (result.deletedCount === 0) {
      return NextResponse.json({ 
        error: "Failed to delete banner",
        id: id 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Banner deleted successfully",
      deletedId: id 
    });
  } catch (err) {
    console.error("DELETE /api/banners error:", err);
    return NextResponse.json({ 
      error: "Internal server error",
      details: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
}