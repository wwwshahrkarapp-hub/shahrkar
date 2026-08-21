import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";


export async function POST(req: Request) {

  try {

    const { uid } = await req.json();


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



    const doc = await adminDb
      .collection("companies")
      .doc(uid)
      .get();



    if (!doc.exists) {

      return NextResponse.json({

        success: true,

        billing: {
          plan: "free",
          subscriptionStatus: "active",
          maxJobs: 1
        }

      });

    }



    return NextResponse.json({

      success: true,

      billing: doc.data()

    });



  } catch(error:any) {


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
