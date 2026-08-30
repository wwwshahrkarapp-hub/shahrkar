import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { detectJobCategory } from "@/lib/job-category-ai";


export async function GET() {
  try {

    const snapshot = await adminDb
      .collection("jobs")
      .get();

const unknownJobs:any[] = [];
    const counts: Record<string, number> = {};


    snapshot.docs.forEach((doc) => {

      const job:any = doc.data();

if(!job.category){
  unknownJobs.push({
    title: job.title,
    description: job.description
  });
}

      let category = job.category;


if(!category){

  category = detectJobCategory(
  job.title || "",
  job.description || ""
).category;


console.log(
  "AI:",
  job.title,
  "=>",
  category
);


}


if(category === "support"){
  category = "simple-worker";
}


      if(category){
        counts[category] =
          (counts[category] || 0) + 1;
      }

    });


console.log("UNKNOWN JOBS:", unknownJobs);

    return NextResponse.json(counts);


  } catch (error:any) {

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
