import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";


export async function POST(req: NextRequest) {

  try {

    const { id } = await req.json();


    if (!id) {

      return NextResponse.json(
        {
          success:false,
          message:"شناسه اعلان وجود ندارد"
        },
        {
          status:400
        }
      );

    }


    await adminDb
      .collection("notifications")
      .doc(id)
      .update({
        read:true
      });


    return NextResponse.json({
      success:true
    });


  } catch(error:any){

    return NextResponse.json(
      {
        success:false,
        message:error.message
      },
      {
        status:500
      }
    );

  }

}
