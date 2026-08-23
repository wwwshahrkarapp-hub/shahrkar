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
        { error: "دسترسی مدیر لازم است." },
        { status: 403 }
      );
    }


    const { ticketId, reply } = await req.json();


    if (!ticketId || !reply) {
      return NextResponse.json(
        { error: "اطلاعات ناقص است." },
        { status: 400 }
      );
    }


   const ticketRef = adminDb
  .collection("supportTickets")
  .doc(ticketId);


const ticketDoc = await ticketRef.get();


if (!ticketDoc.exists) {
  return NextResponse.json(
    { error: "تیکت پیدا نشد." },
    { status: 404 }
  );
}


const ticketData = ticketDoc.data();


const messages = ticketData?.messages || [];


messages.push({
  text: reply,
  sender: "admin",
  createdAt: new Date().toISOString(),
});


await ticketRef.update({
  messages,
  adminReply: reply,
  status: "answered",
  updatedAt: new Date().toISOString(),
});


    return NextResponse.json({
      success: true,
      message: "پاسخ با موفقیت ثبت شد."
    });


  } catch (error: unknown) {

    console.error("ADMIN SUPPORT REPLY ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در ثبت پاسخ"
      },
      {
        status: 500
      }
    );
  }
}
