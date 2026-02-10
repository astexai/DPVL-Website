import nodemailer from "nodemailer";

const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT || 587);
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

if (!host || !user || !pass) {
  console.warn("Email config missing: set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS");
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: {
    user,
    pass,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  const mail = {
    from: process.env.EMAIL_FROM || user,
    to,
    subject: "Your verification code",
    text: `Your verification code is ${otp}. It expires in ${process.env.OTP_EXPIRY || "10"} minutes.`,
    html: `<p>Your verification code is <strong>${otp}</strong>. It expires in ${process.env.OTP_EXPIRY || "10"} minutes.</p>`,
  };
  return transporter.sendMail(mail);
}