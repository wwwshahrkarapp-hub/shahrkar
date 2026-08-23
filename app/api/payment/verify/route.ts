import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

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

    const orderId =
      typeof body === "object" &&
      body !== null &&
      "orderId" in body &&
      typeof body.orderId === "string"
        ? body.orderId
        : null;

    if (!orderId) {
      return NextResponse.json(
        { error: "شماره سفارش ارسال نشده است." },
        { status: 400 }
      );
    }

    const orderRef = adminDb.collection("orders").doc(orderId);
    const orderSnap = await orderRef.get();

    if (!orderSnap.exists) {
      return NextResponse.json(
        { error: "سفارش پیدا نشد." },
        { status: 404 }
      );
    }

    const order = orderSnap.data();

    if (!order) {
      return NextResponse.json(
        { error: "اطلاعات سفارش موجود نیست." },
        { status: 404 }
      );
    }

    if (order.uid !== uid) {
      return NextResponse.json(
        { error: "دسترسی به این سفارش مجاز نیست." },
        { status: 403 }
      );
    }

    if (order.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message: "این سفارش قبلاً پردازش شده است.",
          status: order.status,
        },
        { status: 400 }
      );
    }

    if (!order.authority) {
      return NextResponse.json(
        {
          success: false,
          message: "Authority پرداخت هنوز ثبت نشده است.",
        },
        { status: 400 }
      );
    }

    /*
     * اتصال واقعی به زرین‌پال در این مرحله انجام نمی‌شود.
     *
     * بعداً این قسمت با Merchant ID و API واقعی زرین‌پال
     * تکمیل خواهد شد.
     *
     * تا قبل از Verify واقعی، سفارش نباید paid شود.
     */

    return NextResponse.json({
      success: false,
      ready: true,
      message:
        "سفارش آماده Verify زرین‌پال است، اما اتصال واقعی هنوز فعال نشده است.",
      orderId,
      authority: order.authority,
      amountRial: order.amountRial,
    });
  } catch (error: unknown) {
    console.error("PAYMENT VERIFY ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در بررسی پرداخت",
      },
      { status: 500 }
    );
  }
}
