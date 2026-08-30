import { NextResponse } from "next/server";
import { createSessionValue, COOKIE_NAME } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { uid } = await req.json();

    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          error: "UID وجود ندارد",
        },
        { status: 400 }
      );
    }

    const session = createSessionValue(uid);

    const response = NextResponse.json({
      success: true,
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: session,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error("SESSION CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || "خطا در ساخت نشست",
      },
      { status: 500 }
    );
  }
}
