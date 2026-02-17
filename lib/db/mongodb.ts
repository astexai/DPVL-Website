import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_OTP;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set");
}

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any)._mongoose || { conn: null, promise: null };

if (!cached.promise) {
  cached.promise = mongoose.connect(MONGODB_URI, { });
  (global as any)._mongoose = cached;
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  cached.conn = await cached.promise!;
  return cached.conn;
}