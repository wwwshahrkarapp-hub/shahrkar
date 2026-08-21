import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import fs from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    let jobData:any = null;

// اول با ID خود Firebase امتحان کن
const doc = await adminDb
  .collection("jobs")
  .doc(id)
  .get();


if (doc.exists) {

  jobData = {
    id: doc.id,
    ...doc.data()
  };

} else {

  // اگر پیدا نشد با id عددی بگرد
  const snapshot = await adminDb
    .collection("jobs")
    .get();


  const found = snapshot.docs.find(
    (item:any) =>
      item.data().id === Number(id) ||
      item.data().jobId === id
  );


  if (found) {
    jobData = {
      id: found.id,
      ...found.data()
    };
  }

}


if (!jobData) {

  try {

    const filePath = path.join(
      process.cwd(),
      "data",
      "jobs.json"
    );

    const file = await fs.readFile(
      filePath,
      "utf8"
    );

    const jobs = JSON.parse(file);

    const found = jobs.find(
      (job:any) =>
        String(job.id) === String(id)
    );

    if (found) {
      jobData = found;
    }

  } catch(error) {
    console.error("Failed to load job:", error);
  }

}


if (!jobData) {

  return NextResponse.json(
    {
      error: "آگهی پیدا نشد."
    },
    {
      status:404
    }
  );

}


return NextResponse.json(jobData);


  } catch(error:any) {

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }

}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    await adminDb
      .collection("jobs")
      .doc(id)
      .delete();

    return NextResponse.json({
      success: true
    });

  } catch(error:any) {

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }

}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await params;

    const body = await request.json();

    await adminDb
      .collection("jobs")
      .doc(id)
      .update({
        title: body.title,
        company: body.company,
        city: body.city,
        salary: body.salary,
        description: body.description,
      });


    return NextResponse.json({
      success: true
    });


  } catch(error:any) {

    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );

  }

}
