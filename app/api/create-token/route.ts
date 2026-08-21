import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        {
          error: "UID وجود ندارد",
        },
        {
          status: 400,
        }
      );
    }

    const token = await adminAuth.createCustomToken(uid);

    return NextResponse.json({
      success: true,
      token,
    });

  } catch (error: any) {

    console.log("CREATE TOKEN ERROR:", error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
