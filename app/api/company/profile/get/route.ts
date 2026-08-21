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


    const doc = await adminDb
      .collection("users")
      .doc(uid)
      .get();


    if (!doc.exists) {
      return NextResponse.json(
        { error: "اطلاعات شرکت پیدا نشد" },
        { status:404 }
      );
    }


    return NextResponse.json({
      success:true,
      company:{
        uid: doc.id,
        ...doc.data()
      }
    });


  } catch(error:any){

    return NextResponse.json(
      {error:error.message},
      {status:500}
    );

  }

}
