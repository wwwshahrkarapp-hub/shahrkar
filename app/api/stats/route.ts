import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  try {

    const jobsSnap = await adminDb
      .collection("jobs")
      .where("status", "==", "active")
      .get();


    const usersSnap = await adminDb
      .collection("users")
      .get();


    const applicationsSnap = await adminDb
      .collection("applications")
      .get();


    let companies = 0;
    let applicants = 0;


    usersSnap.forEach((doc)=>{

      const data = doc.data();

      if(data.role === "company"){
        companies++;
      }

      if(data.role === "applicant"){
        applicants++;
      }

    });


    return NextResponse.json({

      jobs: jobsSnap.size,
      companies,
      applicants,
      applications: applicationsSnap.size

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
