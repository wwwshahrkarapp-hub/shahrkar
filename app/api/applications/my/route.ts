import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        { success: false, message: "uid الزامی است" },
        { status: 400 }
      );
    }

    const snapshot = await adminDb
      .collection("applications")
      .where("uid", "==", uid)
      .get();

   const applications = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .filter((app:any) => app.status !== "لغو شده");

    return NextResponse.json({
      success: true,
      applications,
    });

  } catch (error:any) {
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
