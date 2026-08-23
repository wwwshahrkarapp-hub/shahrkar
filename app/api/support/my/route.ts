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


    const snapshot = await adminDb
      .collection("supportTickets")
      .where("uid", "==", uid)
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

    console.error("SUPPORT MY ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در دریافت درخواست‌ها",
      },
      {
        status: 500,
      }
    );
  }
}
