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


    const { ticketId, message } = await req.json();


    if (!ticketId || !message) {
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


    const ticket = ticketDoc.data();


    if (ticket?.uid !== uid) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز." },
        { status: 403 }
      );
    }


    const messages = ticket?.messages || [];


    messages.push({
      text: message,
      sender: "company",
      createdAt: new Date().toISOString(),
    });


    await ticketRef.update({
      messages,
      status: "open",
      updatedAt: new Date().toISOString(),
    });


    return NextResponse.json({
      success: true,
      message: "پیام ارسال شد.",
    });


  } catch (error: unknown) {

    console.error("COMPANY SUPPORT REPLY ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در ارسال پیام",
      },
      {
        status: 500,
      }
    );

  }
}
