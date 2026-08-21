import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      uid,
      name,
      email,
      phone,
      city,
      about,
    } = body;


    if (!uid) {
      return NextResponse.json(
        {
          error: "UID وجود ندارد"
        },
        {
          status:400
        }
      );
    }


    await adminDb
      .collection("users")
      .doc(uid)
      .set(
        {
          uid,
          name: name || "",
          email: email || "",
          phone: phone || "",
          city: city || "",
          about: about || "",
          role: "company",
          updatedAt: new Date().toISOString(),
        },
        {
          merge:true
        }
      );


    return NextResponse.json({
      success:true
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
