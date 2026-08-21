import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {

  try {

    const { phone } = await req.json();
console.log("PHONE FROM LOGIN:", phone);

    if(!phone){

      return NextResponse.json(
        {
          error:"شماره موبایل نیست"
        },
        {
          status:400
        }
      );

    }


    const users = await adminDb
      .collection("users")
      .where("phone","==",phone)
      .limit(1)
      .get();

console.log("FOUND USERS:", users.size);
    if(users.empty){

      return NextResponse.json(
        {
          error:"کاربر پیدا نشد"
        },
        {
          status:404
        }
      );

    }


    const doc = users.docs[0];

    const user = doc.data();


    return NextResponse.json({

      success:true,

      user:{
        uid:doc.id,
        name:user.name,
        phone:user.phone,
        role:user.role
      }

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
