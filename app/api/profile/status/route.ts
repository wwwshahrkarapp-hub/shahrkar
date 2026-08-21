import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { doc, getDoc } from "firebase/firestore";


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { uid } = body;


    if (!uid) {

      return NextResponse.json(
        {
          success: false,
          message: "UID ارسال نشده"
        },
        {
          status: 400
        }
      );

    }


    const snap = await adminDb
  .collection("users")
  .doc(uid)
  .get();


   if (!snap.exists) {

  return NextResponse.json({

    success: true,

    percent: 0,

    completed: []

  });

}


  const user = snap.data() || {};


    let percent = 0;

    const completed: string[] = [];



    if (user.name) {

      percent += 10;
      completed.push("name");

    }


    if (user.email) {

      percent += 10;
      completed.push("email");

    }


    if (user.phone) {

      percent += 10;
      completed.push("phone");

    }


    if (user.city) {

      percent += 10;
      completed.push("city");

    }


    if (
      user.skills &&
      user.skills.length > 0
    ) {

      percent += 20;
      completed.push("skills");

    }


    if (user.experience) {

      percent += 20;
      completed.push("experience");

    }


    if (user.about) {

      percent += 20;
      completed.push("about");

    }



    return NextResponse.json({

      success: true,

      percent,

      completed

    });



  } catch(error:any) {


    console.log(
      "PROFILE STATUS ERROR:",
      error
    );


    return NextResponse.json(

      {
        success:false,
        message:error.message
      },

      {
        status:500
      }

    );


  }

}
