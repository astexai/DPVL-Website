import { Resend } from "resend";

const resend = new Resend(process.env.Resend_API);

export async function sendOtpEmail(to: string, otp: string) {
  const fromEmail = process.env.EMAIL_FROM!;
  
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: "Your verification code",
      text: `Your verification code is ${otp}. It expires in ${process.env.OTP_EXPIRY || "30"} minutes.`,
      html: `<p>Your verification code is <strong>${otp}</strong>. It expires in ${process.env.OTP_EXPIRY || "30"} minutes.</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error(error.message);
    }

    return data;
  } catch (err: any) {
    console.error("Failed to send OTP email via Resend:", err);
    throw err;
  }
}