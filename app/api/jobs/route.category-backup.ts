import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";


// گرفتن همه آگهی‌ها
export async function GET() {
  try {

    const snapshot = await adminDb
  .collection("jobs")
  .orderBy("createdAt", "desc")
  .limit(20)
  .get();


    const jobs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


    return NextResponse.json(jobs);


  } catch (error:any) {

    console.log("JOBS GET ERROR:", error);

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status:500
      }
    );

  }
}



// ثبت آگهی
export async function POST(req: Request) {

  try {

    const body = await req.json();


    const {
      title,
      company,
      city,
      salary,
      description,
      ownerUid,
    } = body;



    if (
      !title ||
      !company ||
      !city ||
      !salary ||
      !description ||
      !ownerUid
    ) {

      return NextResponse.json(
        {
          error:"تمام فیلدها الزامی هستند."
        },
        {
          status:400
        }
      );

    }



    const jobRef = await adminDb
      .collection("jobs")
      .add({

        title,
        company,
        city,
        salary,
        description,

        ownerUid,

        status:"active",

        createdAt: FieldValue.serverTimestamp(),

      });



    return NextResponse.json({

      success:true,

      id:jobRef.id

    });



  } catch(error:any) {


    console.log("JOBS POST ERROR:", error);


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
