import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { calculateJobMatch } from "@/lib/job-match-ai";
import { explainJobMatch } from "@/lib/job-match-explain-ai";
import { calculateJobRanking } from "@/lib/job-ranking-ai";



export async function POST(req:Request){

  try{

    const {uid}=await req.json();


    const profileSnap = await adminDb
      .collection("users")
      .doc(uid)
      .get();


    const profile:any = profileSnap.data();


    const jobsSnap = await adminDb
      .collection("jobs")
      .where("status","==","active")
      .get();


    let jobs:any[] = jobsSnap.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
    }));



    jobs.forEach(job=>{

      job.matchScore =
        calculateJobMatch(
          profile?.skills || [],
          job.skills || [],
          profile?.city || "",
          job.city || ""
        );

    });



jobs = jobs.map((job:any)=>({

  ...job,

  matchScore: calculateJobMatch(
    profile?.skills || [],
    job.skills || [],
    profile?.city || "",
    job.city || ""
  ),

  matchReasons: explainJobMatch(
    profile?.skills || [],
    job.skills || [],
    profile?.city || "",
    job.city || ""
  ),

  rankingScore: calculateJobRanking(
    calculateJobMatch(
      profile?.skills || [],
      job.skills || [],
      profile?.city || "",
      job.city || ""
    ),
    profile?.city === job.city,
    job.createdAt
  )

}));



jobs.sort((a,b)=>{

return b.rankingScore - a.rankingScore;

});



    return NextResponse.json(
      jobs.slice(0,6)
    );



  }catch(error:any){

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
