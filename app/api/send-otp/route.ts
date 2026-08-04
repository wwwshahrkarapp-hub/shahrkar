import { NextResponse } from "next/server"
import { saveOtp } from "@/lib/otp-store"


export async function POST(req: Request) {

  const { phone } = await req.json()


  if (!phone) {

    return NextResponse.json(
      {
        success:false,
        message:"شماره وارد نشده"
      },
      {
        status:400
      }
    )

  }


  const code =
    Math.floor(
      100000 +
      Math.random() * 900000
    ).toString()


  saveOtp(
    phone,
    code
  )


  console.log(
    "OTP:",
    phone,
    code
  )


  return NextResponse.json({

    success:true,

    message:"کد ارسال شد"

  })

}
