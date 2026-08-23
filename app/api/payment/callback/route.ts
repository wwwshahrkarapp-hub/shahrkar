import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const authority = searchParams.get("Authority");
    const status = searchParams.get("Status");

    if (!authority) {
      return NextResponse.json(
        { error: "Authority دریافت نشد." },
        { status: 400 }
      );
    }

    const ordersSnapshot = await adminDb
      .collection("orders")
      .where("authority", "==", authority)
      .limit(1)
      .get();

    if (ordersSnapshot.empty) {
      return NextResponse.json(
        { error: "سفارش مربوط به این Authority پیدا نشد." },
        { status: 404 }
      );
    }

    const orderDoc = ordersSnapshot.docs[0];

    const order = orderDoc.data();

    if (order.status !== "pending") {
      return NextResponse.json({
        success: false,
        message: "این سفارش قبلاً پردازش شده است.",
        status: order.status,
      });
    }

    if (status !== "OK") {
      await orderDoc.ref.update({
        status: "cancelled",
        updatedAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: false,
        message: "پرداخت توسط کاربر لغو یا ناموفق شد.",
        orderId: orderDoc.id,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Callback دریافت شد و سفارش آماده Verify است.",
      orderId: orderDoc.id,
      authority,
    });
  } catch (error: unknown) {
    console.error("PAYMENT CALLBACK ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در Callback پرداخت",
      },
      { status: 500 }
    );
  }
}
