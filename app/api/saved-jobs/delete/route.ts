import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          error: "ID وجود ندارد"
        },
        {
          status: 400
        }
      );
    }


    await adminDb
      .collection("savedJobs")
      .doc(id)
      .delete();


    return NextResponse.json({
      success: true,
    });


  } catch (error:any) {

    console.log("DELETE SAVED JOB ERROR:", error);

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }
}
