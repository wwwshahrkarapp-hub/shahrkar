import { NextResponse } from "next/server"
import { 
  getOtp,
  removeOtp
} from "@/lib/otp-store"


export async function POST(req: Request) {


  const {
    phone,
    code
  } = await req.json()


  if (!phone || !code) {

    return NextResponse.json({

      success:false,

      message:"اطلاعات ناقص"

    })

  }


  const savedCode =
    await getOtp(phone)


  if(savedCode === code){

  await removeOtp(phone)

  return NextResponse.json({

    success:true,

    user:{
      phone
    },

    message:"کد صحیح است"

  })

}


  return NextResponse.json({

    success:false,

    message:"کد اشتباه است"

  })


}
