import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          message: "UID وجود ندارد",
        },
        {
          status: 400,
        }
      );
    }


   const snapshot = await adminDb
  .collection("notifications")
  .where("uid", "==", uid)
  .get();


   const notifications = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .sort((a:any, b:any) =>
    new Date(b.createdAt).getTime() -
    new Date(a.createdAt).getTime()
  );


    return NextResponse.json({
      success: true,
      notifications,
    });


  } catch (error:any) {

    console.log("NOTIFICATIONS ERROR:", error);

    return NextResponse.json(
      {
        success:false,
        message:error.message,
      },
      {
        status:500,
      }
    );
  }
}
