import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id:string }> }
){

  const { id } = await params;

  const snap = await adminDb
    .collection("chats")
    .where("applicationId","==",id)
    .get();

console.log("APPLICATION ID:", id);
console.log("CHATS FOUND:", snap.size);

  if(snap.empty){
    return NextResponse.json({
      success:false,
      message:"چت پیدا نشد"
    });
  }


return NextResponse.json({
  success:true,
  chatId:snap.docs[0].id
});

}
