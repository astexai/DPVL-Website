// import { NextResponse, NextRequest } from "next/server";
// import { connectToDatabase } from "@/lib/db/mongodb";
// import { Candidate } from "@/models/Candidate.model";
// import jwt from "jsonwebtoken";
// import { sendRegistrationSuccessEmail } from "@/services/email.service";
// import { uploadToCloudinary } from "@/lib/cloudinary";

// const JWT_SECRET = process.env.JWT_SECRET || "secret";

// function validateAndSanitizeString(v: any) {
//   if (!v) return "";
//   return String(v).trim();
// }

// async function handleFileUpload(file: File | null, folder: string) {
//   if (!file) return null;
//   const maxBytes = 5 * 1024 * 1024;
//   const arrayBuf = await file.arrayBuffer();
//   if (arrayBuf.byteLength > maxBytes) {
//     throw new Error(`${file.name} is too large (max 5MB)`);
//   }
//   const buffer = Buffer.from(arrayBuf);
//   const result = await uploadToCloudinary(buffer, folder);
//   return result.url;
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connectToDatabase();
//     const form = await req.formData();

//     const token = validateAndSanitizeString(form.get("token"));
//     if (!token)
//       return NextResponse.json({ error: "Missing token" }, { status: 401 });

//     let decoded: any;
//     try {
//       decoded = jwt.verify(token, JWT_SECRET) as any;
//     } catch (e) {
//       return NextResponse.json(
//         { error: "Invalid or expired token" },
//         { status: 401 },
//       );
//     }

//     const emailFromToken = (decoded.email || "").toString().toLowerCase();
//     const email = validateAndSanitizeString(form.get("email")).toLowerCase();
//     if (email !== emailFromToken)
//       return NextResponse.json(
//         { error: "Token email mismatch" },
//         { status: 401 },
//       );

//     // Verify Payment first to avoid unnecessary uploads
//     const orderId = validateAndSanitizeString(form.get("orderId"));
//     if (!orderId) {
//       return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
//     }

//     const environment = process.env.CASHFREE_ENVIRONMENT || "SANDBOX";
//     const baseUrl =
//       environment === "PRODUCTION"
//         ? `https://api.cashfree.com/pg/orders/${orderId}`
//         : `https://sandbox.cashfree.com/pg/orders/${orderId}`;

//     const appId = process.env.CASHFREE_APP_ID || "";
//     const secretKey = process.env.CASHFREE_SECRET_KEY || "";

//     let isPaid = false;
//     if (!appId || !secretKey) {
//       console.warn("Cashfree API keys not found. Mocking payment.");
//       isPaid = true;
//     } else {
//       const pgResponse = await fetch(baseUrl, {
//         method: "GET",
//         headers: {
//           "x-api-version": "2023-08-01",
//           "x-client-id": appId,
//           "x-client-secret": secretKey,
//         },
//       });
//       const pgData = await pgResponse.json();
//       if (pgResponse.ok && pgData.order_status === "PAID") {
//         isPaid = true;
//       }
//     }

//     if (!isPaid) {
//       return NextResponse.json(
//         { error: "Payment verification failed" },
//         { status: 400 },
//       );
//     }

//     // Handle File Uploads to Cloudinary
//     let aadharFrontUrl, aadharBackUrl, photoUrl;
//     try {
//       [aadharFrontUrl, aadharBackUrl, photoUrl] = await Promise.all([
//         handleFileUpload(form.get("aadharFront") as File, "aadhar"),
//         handleFileUpload(form.get("aadharBack") as File, "aadhar"),
//         handleFileUpload(form.get("photo") as File, "photo"),
//       ]);
//     } catch (fileErr: any) {
//       return NextResponse.json({ error: fileErr.message }, { status: 400 });
//     }

//     // Capture Positions (can be multiple)
//     const positions = form.getAll("playingPosition").map((p) => String(p));

//     const payload: any = {
//       firstName: validateAndSanitizeString(form.get("firstName")),
//       lastName: validateAndSanitizeString(form.get("lastName")),
//       fatherName: validateAndSanitizeString(form.get("fatherName")),
//       dob: form.get("dob") ? new Date(String(form.get("dob"))) : undefined,
//       age: validateAndSanitizeString(form.get("age")),
//       height: Number(form.get("height")) || 0,
//       leadingHand: validateAndSanitizeString(form.get("leadingHand")),
//       playingPosition: positions,
//       experience: validateAndSanitizeString(form.get("experience")),
//       leaguesPlayed: validateAndSanitizeString(form.get("leaguesPlayed")),
//       achievements: validateAndSanitizeString(form.get("achievements")),
//       departmentRepresentation: validateAndSanitizeString(
//         form.get("departmentRepresentation"),
//       ),
//       departmentName: validateAndSanitizeString(form.get("departmentName")),
//       injuryHistory: validateAndSanitizeString(form.get("injuryHistory")),
//       injurySpecification: validateAndSanitizeString(
//         form.get("injurySpecification"),
//       ),
//       address: validateAndSanitizeString(form.get("address")),
//       district: validateAndSanitizeString(form.get("district")),
//       state: validateAndSanitizeString(form.get("state")),
//       aadharNumber: validateAndSanitizeString(form.get("aadharNumber")),
//       aadharFrontUrl,
//       aadharBackUrl,
//       photoUrl,
//       email,
//       phone: validateAndSanitizeString(form.get("phone")),
//       whatsappNumber: validateAndSanitizeString(form.get("whatsappNumber")),
//       basePriceAgreement: form.get("basePriceAgreement") === "true",
//       declarationAgreement: form.get("declarationAgreement") === "true",
//       emailVerified: true,
//       status: "pending",
//       paymentOrderId: orderId,
//       paymentStatus: "success",
//     };

//     // Save
//     const existing = await Candidate.findOne({ email });
//     if (existing) {
//       return NextResponse.json(
//         { error: "Email already registered" },
//         { status: 409 },
//       );
//     }

//     const user = new Candidate(payload);
//     await user.save();

//     // Trigger success email
//     try {
//       await sendRegistrationSuccessEmail(user.email, user.firstName);
//     } catch (emailErr) {
//       console.error("Email error:", emailErr);
//     }

//     return NextResponse.json({ ok: true, userId: user._id });
//   } catch (err: any) {
//     console.error("Registration error:", err);
//     return NextResponse.json(
//       { error: err?.message || "Internal server error" },
//       { status: 500 },
//     );
//   }
// }


import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import jwt from "jsonwebtoken";
import { uploadToCloudinary } from "@/lib/cloudinary";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

function sanitize(v: any) {
  if (!v) return "";
  return String(v).trim();
}

async function handleFileUpload(file: File | null, folder: string): Promise<string | undefined> {
  if (!file) return undefined;
  const maxBytes = 5 * 1024 * 1024;
  const arrayBuf = await file.arrayBuffer();
  if (arrayBuf.byteLength > maxBytes) {
    throw new Error(`${file.name} too large (max 10MB)`);
  }
  const buffer = Buffer.from(arrayBuf);
  const result = await uploadToCloudinary(buffer, folder);
  return result.url;
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const form = await req.formData();

    const token = sanitize(form.get("token"));
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const email = sanitize(form.get("email")).toLowerCase();
    if (email !== decoded.email) {
      return NextResponse.json({ error: "Token mismatch" }, { status: 401 });
    }

    const existing = await Candidate.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const aadharFrontUrl = await handleFileUpload(
      form.get("aadharFront") as File,
      "aadhar"
    );
    const aadharBackUrl = await handleFileUpload(
      form.get("aadharBack") as File,
      "aadhar"
    );
    const photoUrl = await handleFileUpload(
      form.get("photo") as File,
      "photo"
    );

    const newCandidate = await Candidate.create({
      firstName: sanitize(form.get("firstName")),
      lastName: sanitize(form.get("lastName")),
      fatherName: sanitize(form.get("fatherName")),
      dob: form.get("dob") ? new Date(String(form.get("dob"))) : undefined,
      age: sanitize(form.get("age")),
      height: Number(form.get("height")) || 0,
      leadingHand: sanitize(form.get("leadingHand")),
      playingPosition: form.getAll("playingPosition").map((p) => String(p)),
      experience: sanitize(form.get("experience")),
      leaguesPlayed: sanitize(form.get("leaguesPlayed")),
      achievements: sanitize(form.get("achievements")),
      departmentRepresentation: sanitize(
        form.get("departmentRepresentation")
      ),
      departmentName: sanitize(form.get("departmentName")),
      injuryHistory: sanitize(form.get("injuryHistory")),
      injurySpecification: sanitize(form.get("injurySpecification")),
      address: sanitize(form.get("address")),
      district: sanitize(form.get("district")),
      state: sanitize(form.get("state")),
      aadharNumber: sanitize(form.get("aadharNumber")),
      aadharFrontUrl: aadharFrontUrl || undefined,
aadharBackUrl: aadharBackUrl || undefined,
photoUrl: photoUrl || undefined,
      email,
      phone: sanitize(form.get("phone")),
      whatsappNumber: sanitize(form.get("whatsappNumber")),
      basePriceAgreement: form.get("basePriceAgreement") === "true",
      declarationAgreement: form.get("declarationAgreement") === "true",
      emailVerified: true,
      status: "pending",
      paymentStatus: "pending"
    });

    return NextResponse.json({
      ok: true,
      candidateId: newCandidate._id
    });
  } catch (err: any) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: err.message || "Registration failed" },
      { status: 500 }
    );
  }
}