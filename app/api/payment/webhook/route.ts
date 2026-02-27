// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db/mongodb";
// import { Candidate } from "@/models/Candidate.model";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     console.log("Webhook received:", body);

//     await connectToDatabase();

//     if (body.type === "PAYMENT_SUCCESS_WEBHOOK") {
//       const orderId = body?.data?.order?.order_id;

//       if (!orderId) {
//         return NextResponse.json({ error: "No orderId" }, { status: 400 });
//       }

//       await Candidate.findOneAndUpdate(
//         { paymentOrderId: orderId },
//         { paymentStatus: "success" }
//       );

//       console.log("Payment marked SUCCESS:", orderId);
//     }

//     if (body.type === "PAYMENT_FAILED_WEBHOOK") {
//       const orderId = body?.data?.order?.order_id;

//       if (!orderId) {
//         return NextResponse.json({ error: "No orderId" }, { status: 400 });
//       }

//       await Candidate.findOneAndUpdate(
//         { paymentOrderId: orderId },
//         { paymentStatus: "failed" }
//       );

//       console.log("Payment marked FAILED:", orderId);
//     }

//     return NextResponse.json({ ok: true }, { status: 200 });

//   } catch (err: any) {
//     console.error("Webhook error:", err);
//     return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
//   }
// }


// export const dynamic = "force-dynamic";
// import { NextRequest, NextResponse } from "next/server";
// import { connectToDatabase } from "@/lib/db/mongodb";
// import { Candidate } from "@/models/Candidate.model";
// import { sendRegistrationSuccessEmail } from "@/services/email.service";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     console.log("=== CASHFREE WEBHOOK RECEIVED ===");
//     console.log(JSON.stringify(body, null, 2));

//     await connectToDatabase();

//     // 🔎 Handle BOTH possible structures
//     const orderId =
//       body?.data?.order?.order_id ||
//       body?.order_id ||
//       body?.order?.order_id;

//     const paymentStatus =
//       body?.data?.payment?.payment_status ||
//       body?.order_status ||
//       body?.payment_status;

//     if (!orderId) {
//       console.log("❌ No orderId found in webhook");
//       return NextResponse.json({ ok: true });
//     }

//     console.log("Order ID:", orderId);
//     console.log("Payment Status:", paymentStatus);

//     if (
//       paymentStatus === "SUCCESS" ||
//       paymentStatus === "PAID"
//     ) {
//       const candidate = await Candidate.findOneAndUpdate(
//         { paymentOrderId: orderId },
//         { paymentStatus: "success" },
//         { new: true }
//       );

//       if (candidate) {
//         console.log("✅ Payment marked SUCCESS for:", candidate.email);

//         try {
//           await sendRegistrationSuccessEmail(
//             candidate.email,
//             candidate.firstName
//           );
//           console.log("✅ Confirmation email sent");
//         } catch (emailErr) {
//           console.error("❌ Email send failed:", emailErr);
//         }
//       } else {
//         console.log("❌ Candidate not found for orderId:", orderId);
//       }
//     } else {
//       console.log("Payment not success:", paymentStatus);
//     }

//     return NextResponse.json({ ok: true });

//   } catch (err: any) {
//     console.error("Webhook error:", err);
//     return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
//   }
// }



export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { Candidate } from "@/models/Candidate.model";
import { sendRegistrationSuccessEmail } from "@/services/email.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const orderId = body?.data?.order?.order_id;
    const paymentStatus = body?.data?.payment?.payment_status;

    if (!orderId) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (paymentStatus === "SUCCESS") {
      await connectToDatabase();

      const candidate = await Candidate.findOneAndUpdate(
        { paymentOrderId: orderId },
        { paymentStatus: "success" },
        { new: true }
      );

      if (candidate) {
        // 🔥 IMPORTANT: Email ko block nahi karna
        setImmediate(async () => {
          try {
            await sendRegistrationSuccessEmail(
              candidate.email,
              candidate.firstName
            );
            console.log("Confirmation email sent");
          } catch (err) {
            console.error("Email failed:", err);
          }
        });
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ received: true }, { status: 200 });
  }
}