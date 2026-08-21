import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { detectJobCategory } from "@/lib/job-category-ai";

export async function GET() {

  try {

    const snapshot = await adminDb
      .collection("jobs")
      .get();


    const counts:any = {
      "simple-worker": 0,
      "it": 0,
      "marketing": 0,
      "design": 0,
      "mixed": 0,
    };


    snapshot.docs.forEach((doc)=>{

      const job:any = doc.data();


let category = job.category;

if(!category){
  category = detectJobCategory(
    job.title || "",
    job.description || ""
  ).category;
}


console.log("JOB:", job.title, "CATEGORY:", job.category);

    if(category){

  if(job.category === "support"){
    counts["simple-worker"]++;
  }

  else if(counts[job.category] !== undefined){
    counts[job.category]++;
  }

}
 
else {

        counts.mixed++;

      }

    });


    return NextResponse.json(counts);


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
