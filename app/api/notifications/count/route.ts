import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";


export async function POST(req: NextRequest) {

  try {

    const { uid } = await req.json();


    if (!uid) {
      return NextResponse.json({
        success:false,
      });
    }


    const snapshot = await adminDb
      .collection("notifications")
      .where("uid", "==", uid)
      .where("read", "==", false)
      .get();


    return NextResponse.json({
      success:true,
      count:snapshot.size,
    });


  } catch(error:any){

    return NextResponse.json({
      success:false,
      message:error.message,
    });

  }

}
