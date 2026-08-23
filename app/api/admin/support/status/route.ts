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


    const token = authHeader.substring(7);

    const decoded = await adminAuth.verifyIdToken(token);

    const uid = decoded.uid;


    const adminDoc = await adminDb
      .collection("users")
      .doc(uid)
      .get();


    const adminUser = adminDoc.data();


    if (!adminUser || adminUser.role !== "admin") {
      return NextResponse.json(
        { error: "دسترسی مدیر لازم است." },
        { status: 403 }
      );
    }


    const { ticketId, status } = await req.json();


    if (!ticketId || !status) {
      return NextResponse.json(
        { error: "اطلاعات ناقص است." },
        { status: 400 }
      );
    }


    const allowedStatus = [
      "open",
      "checking",
      "answered",
      "closed",
    ];


    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        { error: "وضعیت نامعتبر است." },
        { status: 400 }
      );
    }


    await adminDb
      .collection("supportTickets")
      .doc(ticketId)
      .update({
        status,
        updatedAt: new Date().toISOString(),
      });


    return NextResponse.json({
      success: true,
    });


  } catch (error: unknown) {

    console.error("SUPPORT STATUS ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در تغییر وضعیت"
      },
      {
        status: 500
      }
    );
  }
}
