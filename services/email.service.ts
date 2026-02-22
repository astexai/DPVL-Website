import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Email Verification – Delhi Pro Volleyball League (DPVL)",
    html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
      
      <h2 style="text-align: center; color: #3B3BB7; margin-bottom: 30px;">
        Email Verification - Delhi Pro Volleyball League (DPVL)
      </h2>

      <!-- English Version -->
 

      <p>Dear Player,</p>

      <p>
        Thank you for registering for the <strong>Delhi Pro Volleyball League (DPVL)</strong>.
        To verify your email address, please use the OTP given below:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="
          display: inline-block;
          background-color: #3B3BB7;
          color: #ffffff;
          padding: 15px 40px;
          font-size: 28px;
          letter-spacing: 8px;
          border-radius: 8px;
          font-weight: bold;">
          ${otp}
        </div>
      </div>

      <p>This OTP is valid for the next <strong>${process.env.OTP_EXPIRY || "10"} minutes</strong>.</p>

      <p>For security reasons, please do not share this code with anyone.</p>

      <p>We look forward to completing your registration process.</p>
<!-- Contact Section -->
      <p><strong>For any queries:</strong></p>
      <p>
        📧 <a href="mailto:founder@delhiprovolleyballleague.com">
        founder@delhiprovolleyballleague.com</a><br/>
        📞 +91 77999 88500<br/>
        📞 +91 98119 79075
      </p>

      <p style="margin-top: 30px;">
        Warm regards,<br/>
        <strong>Team Delhi Pro Volleyball League<br/>
        </strong>
      </p>
      <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />

      <!-- Hindi Version -->


      <p>प्रिय खिलाड़ी,</p>

      <p>
        दिल्ली प्रो वॉलीबॉल लीग (DPVL) में पंजीकरण करने के लिए धन्यवाद।
        अपने ईमेल को सत्यापित करने के लिए नीचे दिया गया OTP दर्ज करें:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="
          display: inline-block;
          background-color: #3B3BB7;
          color: #ffffff;
          padding: 15px 40px;
          font-size: 28px;
          letter-spacing: 8px;
          border-radius: 8px;
          font-weight: bold;">
          ${otp}
        </div>
      </div>

      <p>यह OTP अगले <strong>${process.env.OTP_EXPIRY || "10"} मिनट</strong> तक मान्य रहेगा।</p>

      <p>कृपया सुरक्षा कारणों से इस कोड को किसी के साथ साझा न करें।</p>

      <p>हम आपके पंजीकरण को पूर्ण करने के लिए उत्सुक हैं।</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <!-- Contact Section -->
      <p><strong>किसी भी सहायता के लिए:</strong></p>
      <p>
        📧 <a href="mailto:founder@delhiprovolleyballleague.com">
        founder@delhiprovolleyballleague.com</a><br/>
        📞 +91 77999 88500<br/>
        📞 +91 98119 79075
      </p>

      <p style="margin-top: 30px;">
        सादर,<br/>
        <strong>
        टीम दिल्ली प्रो वॉलीबॉल लीग</strong>
      </p>

    </div>
  </div>
  `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err: any) {
    console.error("Failed to send OTP email via Nodemailer:", err);
    throw err;
  }
}

export async function sendCandidateStatusEmail(
  to: string,
  name: string,
  status: "accepted" | "rejected",
) {
  const subject =
    status === "accepted"
      ? "Congratulations! Your Registration is Verified"
      : "Registration Status Update - Delhi Premier Volleyball League";

  const message =
    status === "accepted"
      ? `<p>Dear ${name},</p>

<p style="font-size:18px; color:#00A63D">🎉 <strong>Congratulations!</strong> 🎉</p>

<p>
Your registration for the <strong>Delhi Pro Volleyball League (DPVL)</strong> has been successfully approved.
You are now officially a part of the league.
</p>

<p>
Our team will contact you soon regarding match schedules, player guidelines, and further updates.
</p>

<hr style="margin:30px 0; border:none; border-top:1px solid #ddd;" />

<p><strong>For any queries:</strong></p>
<p>
📧 <a href="mailto:founder@delhiprovolleyballleague.com">
founder@delhiprovolleyballleague.com</a><br/>
📞 +91 77999 88500<br/>
📞 +91 98119 79075
</p>

<p>
Welcome to the league!<br/>
Best wishes,<br/>
<strong>Team Delhi Pro Volleyball League</strong>
</p>

<hr style="margin:40px 0; border:none; border-top:1px solid #ccc;" />

<!-- Hindi Version -->

<p>प्रिय ${name},</p>

<p style="font-size:18px; color:#00A63D"">🎉 <strong>बधाई हो!</strong> 🎉</p>

<p>
आपका <strong>दिल्ली प्रो वॉलीबॉल लीग (DPVL)</strong> के लिए पंजीकरण सफलतापूर्वक स्वीकृत कर लिया गया है।
अब आप आधिकारिक रूप से लीग का हिस्सा हैं।
</p>

<p>
जल्द ही हमारी टीम आपको मैच शेड्यूल और अन्य जानकारी साझा करेगी।
</p>

<p><strong>किसी भी सहायता के लिए:</strong></p>

<p>
📧 <a href="mailto:founder@delhiprovolleyballleague.com">
founder@delhiprovolleyballleague.com</a><br/>
📞 +91 77999 88500<br/>
📞 +91 98119 79075
</p>

<p>
लीग में आपका स्वागत है!<br/>
सादर,<br/>
<strong>टीम दिल्ली प्रो वॉलीबॉल लीग</strong>
</p>`
      : `<p>Dear ${name},</p>

<h2 style="color:#d32f2f; margin-bottom:10px;">
❌ Registration Rejected
</h2>

<p>
Your registration for the 
<strong>Delhi Pro Volleyball League (DPVL)</strong> has been rejected.
</p>

<p>
<strong>Reason:</strong>
<span style="background-color:yellow; padding:2px 6px; font-weight:bold;">
Due to payment not received
</span>
</p>

<p>
If you believe this is a mistake or want clarification, you may contact us:
</p>

<p>
📧 <a href="mailto:founder@delhiprovolleyballleague.com">
founder@delhiprovolleyballleague.com</a><br/>
📞 +91 77999 88500<br/>
📞 +91 98119 79075
</p>

<p>
Best regards,<br/>
<strong>Team Delhi Pro Volleyball League</strong>
</p>

<hr style="margin:40px 0; border:none; border-top:1px solid #ccc;" />

<!-- Hindi Version -->

<h2 style="color:#d32f2f; margin-bottom:10px;">
❌ रजिस्ट्रेशन अस्वीकृत
</h2>

<p>
प्रिय ${name} जी,
</p>

<p>
आपका <strong>दिल्ली प्रो वॉलीबॉल लीग (DPVL)</strong> का रजिस्ट्रेशन अस्वीकृत कर दिया गया है।
</p>

<p>
<strong>अस्वीकृति का कारण:</strong>
<span style="background-color:yellow; padding:2px 6px; font-weight:bold;">
भुगतान प्राप्त नहीं हुआ
</span>
</p>

<p>
यदि आपको लगता है कि यह गलती है या आपको कोई जानकारी चाहिए, तो कृपया हमसे संपर्क करें:
</p>

<p>
📧 <a href="mailto:founder@delhiprovolleyballleague.com">
founder@delhiprovolleyballleague.com</a><br/>
📞 +91 77999 88500<br/>
📞 +91 98119 79075
</p>

<p>
धन्यवाद,<br/>
<strong>टीम दिल्ली प्रो वॉलीबॉल लीग</strong>
</p>`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, data: info };
  } catch (err: any) {
    console.error("Failed to send status email:", err);
    return { success: false, error: err.message };
  }
}

export async function sendRegistrationSuccessEmail(to: string, name: string) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Registration Successful – Delhi Pro Volleyball League (DPVL)",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px;">
        
        <h2 style="text-align: center; color: #3B3BB7; margin-bottom: 30px;">
          You have successfully registered for DPVL!
        </h2>
  
        <p>Dear ${name},</p>
  
        <p>
          Thank you for registering for the <strong>Delhi Pro Volleyball League (DPVL)</strong>.
          Your payment has been received and your registration has been successfully submitted.
        </p>
        
        <p>Our verification team will carefully review your profile and submitted details.
Once the review process is completed, you will be notified via email regarding approval or rejection.</p>
  
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
  
        <!-- Contact Section -->
        <p><strong>For any queries:</strong></p>
        <p>
          📧 <a href="mailto:founder@delhiprovolleyballleague.com">
          founder@delhiprovolleyballleague.com</a><br/>
          📞 +91 77999 88500<br/>
          📞 +91 98119 79075
        </p>
  
        <p style="margin-top: 30px;">
          Warm regards,<br/>
          <strong>Team Delhi Pro Volleyball League</strong>
        </p>
  
        <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />
  
        <p>प्रिय ${name},</p>
  
        <p>
          दिल्ली प्रो वॉलीबॉल लीग (DPVL) के लिए सफलतापूर्वक पंजीकरण करने के लिए धन्यवाद।
          आपका भुगतान प्राप्त हो गया है और आपका पंजीकरण सफलतापूर्वक जमा हो गया है।
        </p>
  
        <p>हमारी सत्यापन टीम आपके प्रोफाइल और विवरणों की जांच करेगी।
समीक्षा पूर्ण होने के बाद आपको स्वीकृति या अस्वीकृति की जानकारी ईमेल के माध्यम से दी जाएगी।</p>
  
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
  
        <p><strong>किसी भी सहायता के लिए:</strong></p>
        <p>
          📧 <a href="mailto:founder@delhiprovolleyballleague.com">
          founder@delhiprovolleyballleague.com</a><br/>
          📞 +91 77999 88500<br/>
          📞 +91 98119 79075
        </p>
  
        <p style="margin-top: 30px;">
          सादर,<br/>
          <strong>टीम दिल्ली प्रो वॉलीबॉल लीग</strong>
        </p>
  
      </div>
    </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, data: info };
  } catch (err: any) {
    console.error("Failed to send registration success email:", err);
    return { success: false, error: err.message };
  }
}
