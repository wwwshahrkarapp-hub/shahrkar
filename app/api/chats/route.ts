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


    const applicantChats = await adminDb
      .collection("chats")
      .where("applicantUid","==",uid)
      .get();


    const companyChats = await adminDb
      .collection("chats")
      .where("companyUid","==",uid)
      .get();


    const chats = [
      ...applicantChats.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      })),
      ...companyChats.docs.map(doc=>({
        id:doc.id,
        ...doc.data()
      }))
    ];


    return NextResponse.json({
      success:true,
      chats
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

export async function PUT(req: NextRequest) {
  try {

    const body = await req.json();

    await adminDb
      .collection("chats")
      .doc(body.chatId)
      .collection("messages")
      .add({
        senderUid: body.senderUid,
        message: body.message,
        createdAt: new Date().toISOString()
      });

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
