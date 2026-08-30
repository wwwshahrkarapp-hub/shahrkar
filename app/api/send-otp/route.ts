import { NextResponse } from "next/server"
import { saveOtp } from "@/lib/otp-store"

export async function POST(req: Request) {
  try {
    const { phone } = await req.json()

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message: "شماره وارد نشده",
        },
        { status: 400 }
      )
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    const username = process.env.PAYAMMATNI_USERNAME
    const password = process.env.PAYAMMATNI_PASSWORD
    const from = process.env.PAYAMMATNI_FROM

    if (!username || !password || !from) {
      console.error("PayamMatni environment variables are missing")

      return NextResponse.json(
        {
          success: false,
          message: "تنظیمات پیامک ناقص است",
        },
        { status: 500 }
      )
    }

    const params = new URLSearchParams({
      method: "sendsms",
      format: "json",
      from,
      to: phone,
      text: `کد ورود شهرکار: ${code}`,
      username,
      password,
      type: "0",
    })

    const response = await fetch(
      `https://payammatni.com/webservice/url/send.php?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    )

    const result = await response.text()

    console.log("PayamMatni response:", result)

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "ارسال پیامک انجام نشد",
        },
        { status: 502 }
      )
    }

    if (result.includes('"4"')) {
      return NextResponse.json(
        {
          success: false,
          message: "ارسال پیامک از طرف سرویس انجام نشد",
        },
        { status: 502 }
      )
    }

    await saveOtp(phone, code)

    return NextResponse.json({
      success: true,
      message: "کد ارسال شد",
    })
  } catch (error) {
    console.error("Send OTP error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ارسال کد",
      },
      { status: 500 }
    )
  }
}
