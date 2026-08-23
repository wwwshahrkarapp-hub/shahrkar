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


    const batch = adminDb.batch();


    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        adminReplySeen: true,
        updatedAt: new Date().toISOString(),
      });
    });


    await batch.commit();


    return NextResponse.json({
      success: true,
      readCount: snapshot.size,
    });


  } catch (error: unknown) {

    console.error("SUPPORT READ ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در خواندن اعلان"
      },
      {
        status: 500
      }
    );
  }
}
