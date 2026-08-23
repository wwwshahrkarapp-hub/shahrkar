import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { error: "UID وجود ندارد" },
        { status: 400 }
      );
    }


    const snapshot = await adminDb
      .collection("supportTickets")
      .where("uid", "==", uid)
      .where("adminReplySeen", "==", false)
      .get();


    return NextResponse.json({
      success: true,
      count: snapshot.size,
    });


  } catch (error: unknown) {

    console.error("SUPPORT UNREAD ERROR:", error);


    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در دریافت اعلان‌ها"
      },
      {
        status: 500
      }
    );
  }
}
