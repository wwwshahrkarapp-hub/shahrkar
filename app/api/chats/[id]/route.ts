
import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";


// گرفتن پیام‌های یک چت
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

   const { id } = await params;

const chatDoc = await adminDb
  .collection("chats")
  .doc(id)
  .get();

const chatData = chatDoc.data();
let companyName = "کارفرما";

if (chatData?.companyUid) {
  const companyDoc = await adminDb
    .collection("users")
    .doc(chatData.companyUid)
    .get();

  const companyData = companyDoc.data();

  companyName = companyData?.name || "کارفرما";
}


const messages = await adminDb
  .collection("chats")
  .doc(id)
  .collection("messages")
  .orderBy("createdAt", "asc")
  .get();


  return NextResponse.json({
  success:true,
  status: chatData?.status || "open",
  companyUid: chatData?.companyUid || "",
  companyName,
  messages: messages.docs.map(doc=>({
    id:doc.id,
    ...doc.data()
  }))
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



// ارسال پیام جدید
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
){

try {

const { id } = await params;

const body = await req.json();

const chatDoc = await adminDb
  .collection("chats")
  .doc(id)
  .get();

const chatData = chatDoc.data();


if(chatData?.status === "closed"){
  return NextResponse.json({
    success:false,
    message:"این چت بسته شده است"
  },{
    status:403
  });
}


if(!chatData){
  return NextResponse.json({
    success:false,
    message:"اطلاعات چت پیدا نشد"
  },{
    status:404
  });
}

if(!body.text || !body.senderUid){
return NextResponse.json({
success:false,
message:"اطلاعات ناقص"
});
}


await adminDb
.collection("chats")
.doc(id)
.collection("messages")
.add({

text: body.text,

senderUid: body.senderUid,

createdAt:new Date().toISOString()

});

const receiverUid =
  chatData.applicantUid === body.senderUid
    ? chatData.companyUid
    : chatData.applicantUid;


await adminDb
  .collection("notifications")
  .add({
    uid: receiverUid,
    message: "یک پیام جدید در چت دارید 💬",
    type: "chat",
    read: false,
    createdAt: new Date().toISOString()
  });

return NextResponse.json({
success:true
});


}catch(error:any){

return NextResponse.json({
success:false,
message:error.message
},{
status:500
});

}

}


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    await adminDb
      .collection("chats")
      .doc(id)
      .update({
        status: "closed",
        closedAt: new Date().toISOString(),
      });


    return NextResponse.json({
      success: true,
      message: "چت بسته شد"
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




export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
){

  try {

    const { id } = await params;

    const body = await req.json();

    const { messageId, senderUid } = body;


    if(!messageId || !senderUid){
      return NextResponse.json({
        success:false,
        message:"اطلاعات ناقص"
      });
    }


    const messageRef = adminDb
      .collection("chats")
      .doc(id)
      .collection("messages")
      .doc(messageId);


    const messageDoc = await messageRef.get();


    if(!messageDoc.exists){
      return NextResponse.json({
        success:false,
        message:"پیام پیدا نشد"
      });
    }


    const messageData = messageDoc.data();


    // فقط صاحب پیام اجازه حذف دارد
    if(messageData?.senderUid !== senderUid){

      return NextResponse.json({
        success:false,
        message:"اجازه حذف این پیام را ندارید"
      },{
        status:403
      });

    }


    await messageRef.delete();


    return NextResponse.json({
      success:true
    });


  }catch(error:any){

    return NextResponse.json({
      success:false,
      message:error.message
    },{
      status:500
    });

  }

}
