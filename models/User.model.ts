import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  fatherName: string;
  email: string;
  phone?: string;
  state?: string;
  district?: string;
  aadhaarPath?: string;
  age?: string;
  gender?: string;
  position?: string;
  experience?: string;
  emailVerified: boolean;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: String,
  state: String,
  district: String,
  aadhaarPath: String,
  age: String,
  gender: String,
  position: String,
  experience: String,
  emailVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

export const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>("User", UserSchema);