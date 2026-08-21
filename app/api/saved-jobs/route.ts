import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);

  const uid = searchParams.get("uid");
if (!uid) {
  return NextResponse.json(
    {
      error: "UID وجود ندارد"
    },
    {
      status: 400
    }
  );
}
  try {
    const snapshot = await adminDb
  .collection("savedJobs")
  .where("uid", "==", uid)
  .get();

    const jobs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(jobs);

  } catch (error:any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      uid,
      jobId,
      title,
      company,
      city,
    } = body;


    if (!uid) {
      return NextResponse.json(
        { error: "UID وجود ندارد" },
        { status: 400 }
      );
    }


    const exists = await adminDb
      .collection("savedJobs")
      .where("uid", "==", uid)
      .where("jobId", "==", jobId)
      .get();


    if (!exists.empty) {
      return NextResponse.json({
        success: true,
        message: "قبلاً ذخیره شده"
      });
    }


    const savedJob = await adminDb
      .collection("savedJobs")
      .add({
        uid,
        jobId,
        title: title || "",
        company: company || "",
        city: city || "",
        createdAt: new Date().toISOString(),
      });


    return NextResponse.json({
      success: true,
      id: savedJob.id,
    });


  } catch (error:any) {

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );

  }
}
