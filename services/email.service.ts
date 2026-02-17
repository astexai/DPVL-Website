import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API);

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

export async function sendCandidateStatusEmail(
  to: string,
  name: string,
  status: "accepted" | "rejected",
) {
  const fromEmail = process.env.EMAIL_FROM!;
  const subject =
    status === "accepted"
      ? "Congratulations! Your Registration is Verified"
      : "Registration Status Update - Delhi Premier Volleyball League";

  const message =
    status === "accepted"
      ? `<p>Dear ${name},</p>
         <p>Congratulations! We are pleased to inform you that your registration for the Delhi Premier Volleyball League has been <strong>verified and accepted</strong>.</p>
         <p>Our team will contact you shortly with further details regarding the match schedule and next steps.</p>
         <p>Best regards,<br/>The DPVL Team</p>`
      : `<p>Dear ${name},</p>
         <p>Thank you for your interest in the Delhi Premier Volleyball League.</p>
         <p>After reviewing your registration, we regret to inform you that your application has been <strong>rejected</strong> at this time. This could be due to incomplete documentation or other eligibility criteria.</p>
         <p>If you have any questions, please feel free to contact our support team.</p>
         <p>Best regards,<br/>The DPVL Team</p>`;

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html: message,
    });

    if (error) {
      console.error("Resend status email error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err: any) {
    console.error("Failed to send status email:", err);
    return { success: false, error: err.message };
  }
}
