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


    const body = await req.json();

    const {
      subject,
      message,
    } = body;


    if (!subject || !message) {
      return NextResponse.json(
        { error: "موضوع و توضیحات الزامی است." },
        { status: 400 }
      );
    }


    const ticketRef = adminDb
      .collection("supportTickets")
      .doc();


    const now = new Date().toISOString();


await ticketRef.set({
  uid,
  subject,
  message,

  messages: [
    {
      text: message,
      sender: "company",
      createdAt: now,
    },
  ],

  status: "open",
  createdAt: now,
  updatedAt: now,
});


    return NextResponse.json({
      success: true,
      ticketId: ticketRef.id,
    });


  } catch (error: unknown) {

    console.error("SUPPORT CREATE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "خطا در ثبت درخواست پشتیبانی",
      },
      {
        status: 500,
      }
    );
  }
}
