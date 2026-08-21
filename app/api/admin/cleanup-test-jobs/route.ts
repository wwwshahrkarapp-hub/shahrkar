import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {

    const snapshot = await adminDb
      .collection("jobs")
      .get();

    const testJobs:any[] = [];

    snapshot.docs.forEach((doc)=>{

      const job:any = doc.data();

      const text = (
        (job.title || "") +
        " " +
        (job.company || "") +
        " " +
        (job.description || "")
      );

      if(
        text.includes("تست") ||
        text.includes("0918") ||
        text.includes("0990")
      ){
        testJobs.push({
          id:doc.id,
          title:job.title,
          company:job.company
        });
      }

    });


    return NextResponse.json({
      count:testJobs.length,
      jobs:testJobs
    });


  } catch(error:any){

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



export async function DELETE() {
  try {

    const snapshot = await adminDb
      .collection("jobs")
      .get();

    const batch = adminDb.batch();

    let deleted = 0;


    snapshot.docs.forEach((doc)=>{

      const job:any = doc.data();

      const text = (
        (job.title || "") +
        " " +
        (job.company || "") +
        " " +
        (job.description || "")
      );


      if(
        text.includes("تست") ||
        text.includes("0918") ||
        text.includes("0990")
      ){

        // نگه داشتن تست AI
        if(job.title === "لب تاپ"){
          return;
        }

        batch.delete(doc.ref);
        deleted++;

      }

    });


    await batch.commit();


    return NextResponse.json({
      deleted
    });


  } catch(error:any){

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
