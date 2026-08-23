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


    const doc = await adminDb
      .collection("users")
      .doc(uid)
      .get();


    if (!doc.exists) {
      return NextResponse.json(
        { error: "اطلاعات شرکت پیدا نشد" },
        { status: 404 }
      );
    }


    return NextResponse.json({
      success: true,
      company: {
        uid: doc.id,
        ...doc.data(),
      },
    });


  } catch (error: unknown) {

    console.error("COMPANY PROFILE GET ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در دریافت پروفایل",
      },
      {
        status: 500,
      }
    );
  }
}
