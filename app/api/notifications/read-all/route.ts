import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";


export async function POST(req: NextRequest) {

  try {

    const { uid } = await req.json();


    if (!uid) {
      return NextResponse.json({
        success:false,
        message:"UID وجود ندارد"
      });
    }


    const snapshot = await adminDb
      .collection("notifications")
      .where("uid","==",uid)
      .where("read","==",false)
      .get();


    const batch = adminDb.batch();


    snapshot.docs.forEach((doc)=>{

      batch.update(doc.ref,{
        read:true
      });

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
