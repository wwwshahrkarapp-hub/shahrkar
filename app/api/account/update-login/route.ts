import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";


export async function POST(req: Request){

  try{

    const body = await req.json();

    const {
      uid,
      phone,
      email
    } = body;



const phoneRegex = /^09\d{9}$/;

if(
  !phone ||
  phone.length !== 11 ||
  !phoneRegex.test(phone)
){

  return NextResponse.json({
    success:false,
    message:"شماره موبایل معتبر نیست"
  });

}



const emailRegex =
/^[^\s@]+@(gmail|yahoo|outlook|hotmail)\.(com|ir)$/;


if(
  !email ||
  email.length > 80 ||
  !emailRegex.test(email)
){

  return NextResponse.json({
    success:false,
    message:"ایمیل معتبر نیست"
  });

}



    if(!uid){
      return NextResponse.json({
        success:false,
        message:"UID وجود ندارد"
      });
    }


   const userDoc = await adminDb
.collection("users")
.doc(uid)
.get();


if(!userDoc.exists){

  return NextResponse.json({
    success:false,
    message:"کاربر پیدا نشد"
  });

}


await adminDb
.collection("users")
.doc(uid)
.update({

  phone: phone || "",
  email: email || "",

  updatedAt:new Date().toISOString()

});


    return NextResponse.json({
      success:true,
      message:"اطلاعات ورود بروزرسانی شد"
    });


  }catch(error:any){

    return NextResponse.json({
      success:false,
      message:error.message
    },{
      status:500
    });

  }

}
