import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    console.log("PROFILE SAVE BODY:", body);

    const {
      uid,
      name,
      email,
      phone,
      city,
      skills,
      experience,
      about,
    } = body;


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
          skills: skills || [],
          experience: experience || "",
          about: about || "",
          updatedAt: new Date().toISOString(),
        },
        {
          merge: true,
        }
      );


    console.log("PROFILE SAVED");


    return NextResponse.json({
      success: true,
    });


  } catch (error:any) {

    console.log("PROFILE SAVE ERROR:", error);

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 500
      }
    );

  }
}
