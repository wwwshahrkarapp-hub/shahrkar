import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

const PLANS = {
  pro: {
    amountToman: 199000,
    amountRial: 1990000,
    maxJobs: 10,
  },
  business: {
    amountToman: 499000,
    amountRial: 4990000,
    maxJobs: 50,
  },
} as const;

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "احراز هویت انجام نشده است." },
        { status: 401 }
      );
    }

    const idToken = authHeader.substring(7);
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const body: unknown = await req.json();

    const plan =
      typeof body === "object" &&
      body !== null &&
      "plan" in body &&
      typeof body.plan === "string"
        ? body.plan
        : null;

    if (plan !== "pro" && plan !== "business") {
      return NextResponse.json(
        { error: "پلن انتخابی معتبر نیست." },
        { status: 400 }
      );
    }

    const selectedPlan = PLANS[plan];

    const orderRef = adminDb.collection("orders").doc();

    const now = new Date().toISOString();

    const order = {
      uid,
      plan,

      amountToman: selectedPlan.amountToman,
      amountRial: selectedPlan.amountRial,

      maxJobs: selectedPlan.maxJobs,

      status: "pending",

      // آماده برای اتصال آینده به زرین‌پال
      paymentProvider: "zarinpal",
      authority: null,
      transactionId: null,
      paidAt: null,

      createdAt: now,
      updatedAt: now,
    };

    await orderRef.set(order);

    return NextResponse.json({
      success: true,
      orderId: orderRef.id,
      order,
    });
  } catch (error: unknown) {
    console.error("PAYMENT CREATE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در ایجاد سفارش",
      },
      { status: 500 }
    );
  }
}
