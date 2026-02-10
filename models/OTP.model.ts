import mongoose, { Schema, Document } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otpHash: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

const OTPSchema = new Schema<IOTP>({
  email: { type: String, required: true, index: true },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() },
});

export const OTP = (mongoose.models.OTP as mongoose.Model<IOTP>) || mongoose.model<IOTP>("OTP", OTPSchema);