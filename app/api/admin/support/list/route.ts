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


    const adminDoc = await adminDb
      .collection("users")
      .doc(uid)
      .get();


    const adminUser = adminDoc.data();


    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        {
          error: "دسترسی مدیر لازم است."
        },
        {
          status: 403
        }
      );
    }


    const snapshot = await adminDb
      .collection("supportTickets")
      .orderBy("createdAt", "desc")
      .get();


    const tickets = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    return NextResponse.json({
      success: true,
      tickets,
    });


  } catch (error: unknown) {

    console.error("ADMIN SUPPORT LIST ERROR:", error);


    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در دریافت تیکت‌ها"
      },
      {
        status: 500
      }
    );
  }
}
