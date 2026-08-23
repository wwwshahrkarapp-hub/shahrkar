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


    const userDoc = await adminDb
      .collection("users")
      .doc(uid)
      .get();


    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "کاربر پیدا نشد." },
        { status: 404 }
      );
    }


    const user = userDoc.data();


    if (user?.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "دسترسی مدیر لازم است."
        },
        {
          status: 403
        }
      );
    }


    return NextResponse.json({
      success: true,
      admin: true
    });


  } catch (error: unknown) {

    console.error("ADMIN CHECK ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در بررسی دسترسی"
      },
      {
        status: 500
      }
    );
  }
}
