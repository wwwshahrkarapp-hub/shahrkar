import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: "شماره تلفن وارد نشده است.",
        },
        { status: 400 }
      );
    }

    const snapshot = await adminDb
      .collection("users")
      .where("phone", "==", phone)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return NextResponse.json(
        {
          success: false,
          error: "کاربر با این شماره پیدا نشد.",
        },
        { status: 404 }
      );
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    return NextResponse.json({
      success: true,
      user: {
        uid: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
      },
    });
  } catch (error) {
    console.error(
      "LOGIN PHONE ERROR:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        error: "خطا در ورود با شماره تلفن",
      },
      { status: 500 }
    );
  }
}
