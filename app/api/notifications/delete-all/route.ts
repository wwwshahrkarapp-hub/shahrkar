import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {

    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json({
        success:false,
        message:"UID وجود ندارد"
      },{
        status:400
      });
    }


    const snap = await adminDb
      .collection("notifications")
      .where("uid","==",uid)
      .get();


    const batch = adminDb.batch();


    snap.docs.forEach((doc)=>{
      batch.delete(doc.ref);
    });


    await batch.commit();


    return NextResponse.json({
      success:true
    });


  } catch(error:any){

    return NextResponse.json({
      success:false,
      message:error.message
    },{
      status:500
    });

  }
}
