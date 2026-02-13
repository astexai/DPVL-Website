import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  phone?: string;
  state?: string;
  district?: string;
  aadhaarPath?: string;
  emailVerified: boolean;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
}

const CandidateSchema = new Schema<ICandidate>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: String,
  state: String,
  district: String,
  aadhaarPath: String,
  emailVerified: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: () => new Date() },
});

export const Candidate = (mongoose.models.Candidate as mongoose.Model<ICandidate>) || mongoose.model<ICandidate>("Candidate", CandidateSchema);
