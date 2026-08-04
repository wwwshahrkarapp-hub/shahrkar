import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    console.log("REGISTER BODY:", body);


    const {
      name,
      email,
      phone,
      password,
      role,
    } = body;


    if (!name || !email || !phone || !password || !role) {

      return NextResponse.json(
        {
          error: "تمام فیلدها الزامی هستند"
        },
        {
          status:400
        }
      );

    }


    const user = await adminAuth.createUser({

      email,

      password,

      displayName:name,

    });


    console.log(
      "AUTH USER CREATED:",
      user.uid
    );


    await adminDb
      .collection("users")
      .doc(user.uid)
      .set({

        uid:user.uid,

        name,

        email,

        phone,

        role,

        createdAt:new Date().toISOString(),

      });


    return NextResponse.json({

      success:true,

      uid:user.uid,

    });


  } catch(error:any){


    console.log(
      "REGISTER ERROR:",
      error
    );


    return NextResponse.json(

      {
        error:String(error.message || error)
      },

      {
        status:500
      }

    );

  }

}
