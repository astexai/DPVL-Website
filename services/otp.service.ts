import { OTP } from "@/models/OTP.model";
import bcrypt from "bcryptjs";
import { sendOtpEmail } from "./email.service";
import { connectToDatabase } from "@/lib/db/mongodb";

const SALT_ROUNDS = 10;
const OTP_LENGTH = 6;
const OTP_EXPIRY_MIN = Number(process.env.OTP_EXPIRY || 10);
const MAX_VERIFY_ATTEMPTS = 3;
const MAX_SENDS_PER_HOUR = 5;

function generateNumericOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createAndSendOtp(email: string) {
  await connectToDatabase();
  // limit sends in last hour
  const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
  const recentCount = await OTP.countDocuments({ email, createdAt: { $gte: oneHourAgo } });
  if (recentCount >= MAX_SENDS_PER_HOUR) {
    throw new Error("Too many OTP requests. Try again later.");
  }

  const otp = generateNumericOtp();
  const otpHash = await bcrypt.hash(otp, SALT_ROUNDS);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MIN * 60 * 1000);

  // upsert single OTP record for email (replace previous)
  await OTP.findOneAndUpdate(
    { email },
    { otpHash, expiresAt, attempts: 0, createdAt: new Date() },
    { upsert: true, new: true }
  );

  // send email (do not block DB errors)
  await sendOtpEmail(email, otp);
  return { ok: true };
}

export async function verifyOtpForEmail(email: string, otpCandidate: string) {
  await connectToDatabase();
  const record = await OTP.findOne({ email });
  if (!record) throw new Error("No OTP found for this email. Request a new one.");

  if (record.attempts >= MAX_VERIFY_ATTEMPTS) {
    throw new Error("Maximum verification attempts exceeded. Request a new OTP.");
  }

  if (record.expiresAt < new Date()) {
    await OTP.deleteOne({ email });
    throw new Error("OTP expired. Request a new one.");
  }

  const match = await bcrypt.compare(otpCandidate, record.otpHash);
  if (!match) {
    record.attempts += 1;
    await record.save();
    throw new Error("Invalid OTP");
  }

  // successful: remove OTP
  await OTP.deleteOne({ email });
  return { ok: true };
}