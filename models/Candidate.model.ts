import mongoose, { Schema, Document } from "mongoose";

export interface ICandidate extends Document {
  firstName: string; // Full Name
  lastName?: string;
  fatherName?: string;
  dob?: Date;
  age?: string;
  height?: number;
  leadingHand?: "Right Hand" | "Left Hand";
  playingPosition?: string[];
  experience?: string;
  leaguesPlayed?: string;
  achievements?: string;
  departmentRepresentation?: "Not associated" | "Yes, currently playing";
  departmentName?: string;
  injuryHistory?:
    | "No major injury"
    | "Had injury earlier"
    | "Currently injured";
  injurySpecification?: string;
  address?: string;
  district?: string;
  state?: string;
  aadharNumber?: string;
  aadharFrontUrl?: string;
  aadharBackUrl?: string;
  photoUrl?: string;
  email: string;
  phone?: string; // Calling
  whatsappNumber?: string;
  basePriceAgreement?: boolean;
  declarationAgreement?: boolean;
  emailVerified: boolean;
  status: "pending" | "accepted" | "rejected";
  paymentOrderId?: string;
  paymentSessionId?: string;
  paymentStatus: "pending" | "success" | "failed";
  createdAt: Date;
}

const CandidateSchema = new Schema<ICandidate>({
  firstName: { type: String, required: true },
  lastName: String,
  fatherName: String,
  dob: Date,
  age: String,
  height: Number,
  leadingHand: { type: String, enum: ["Right Hand", "Left Hand"] },
  playingPosition: [String],
  experience: String,
  leaguesPlayed: String,
  achievements: String,
  departmentRepresentation: {
    type: String,
    enum: ["Not associated", "Yes, currently playing"],
  },
  departmentName: String,
  injuryHistory: {
    type: String,
    enum: ["No major injury", "Had injury earlier", "Currently injured"],
  },
  injurySpecification: String,
  address: String,
  district: String,
  state: String,
  aadharNumber: String,
  aadharFrontUrl: String,
  aadharBackUrl: String,
  photoUrl: String,
  email: { type: String, required: true, unique: true, index: true },
  phone: String,
  whatsappNumber: String,
  basePriceAgreement: { type: Boolean, default: false },
  declarationAgreement: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  paymentOrderId: String,
  paymentSessionId: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  createdAt: { type: Date, default: () => new Date() },
});

// Ensure we pick up schema changes in development by deleting the cached model
if (process.env.NODE_ENV !== "production") {
  delete mongoose.models.Candidate;
}

export const Candidate =
  (mongoose.models.Candidate as mongoose.Model<ICandidate>) ||
  mongoose.model<ICandidate>("Candidate", CandidateSchema);
