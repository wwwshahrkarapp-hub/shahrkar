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

    const relayUrl = process.env.OTP_RELAY_URL
    const relaySecret = process.env.OTP_RELAY_SECRET

    if (!relayUrl || !relaySecret) {
      console.error("OTP relay environment variables are missing")

      return NextResponse.json(
        {
          success: false,
          message: "تنظیمات پیامک ناقص است",
        },
        { status: 500 }
      )
    }

    const response = await fetch(`${relayUrl}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-relay-secret": relaySecret,
      },
      body: JSON.stringify({
        to: phone,
        text: `کد ورود شهرکار: ${code}`,
      }),
      cache: "no-store",
    })

    const result = await response.json()

    console.log("OTP Relay response:", {
      status: response.status,
      ok: result?.ok,
      error: result?.error,
    })

    if (!response.ok || !result?.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "ارسال پیامک انجام نشد",
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
    console.error(
      "Send OTP error type:",
      error instanceof Error ? error.name : "Unknown",
      error instanceof Error ? error.message : "Non-Error"
    )

    return NextResponse.json(
      {
        success: false,
        message: "خطا در ارسال کد",
      },
      { status: 500 }
    )
  }
}
