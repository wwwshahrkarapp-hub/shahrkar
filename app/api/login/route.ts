import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است." },
        { status: 400 }
      );
    }

    console.log("LOGIN START:", email);

    // پیدا کردن کاربر در Firebase Auth
    const userRecord = await adminAuth.getUserByEmail(email);

    console.log("AUTH FOUND:", userRecord.uid);


    // گرفتن اطلاعات از Firestore
    const doc = await adminDb
      .collection("users")
      .doc(userRecord.uid)
      .get();


    if (!doc.exists) {
      return NextResponse.json(
        { error: "اطلاعات کاربر پیدا نشد." },
        { status: 404 }
      );
    }


    const user = doc.data();


    return NextResponse.json({
      success: true,
      user: {
        uid: userRecord.uid,
        name: user?.name,
        email: user?.email,
        role: user?.role,
      },
    });


  } catch (error: any) {

    console.log("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        error: "ایمیل یا رمز عبور اشتباه است."
      },
      {
        status: 401
      }
    );
  }
}
