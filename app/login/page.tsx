"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase";
import PageHeader from "@/components/page-header";


function LoginContent(){

  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")


  const [phone,setPhone] = useState("")
  const [code,setCode] = useState("")

  const [step,setStep] = useState(1)

  const [loading,setLoading] = useState(false)



  const sendCode = async()=>{

    try{

      setLoading(true)


      const res = await fetch(
        "/api/send-otp",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            phone
          })
        }
      )


      const data =
        await res.json()



      if(data.success){

        alert(
          "کد ارسال شد"
        )

        setStep(2)


      }else{

        alert(
          data.message
        )

      }



    }catch(error){

      console.log(error)

      alert(
        "خطا در ارسال کد"
      )


    }finally{

      setLoading(false)

    }

  }





  const verifyCode = async()=>{

    try{

      setLoading(true)


      const res = await fetch(
        "/api/verify-otp",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            phone,
            code
          })
        }
      )


      const data =
        await res.json()



      if(!data.success){

        alert(
          data.message
        )

        return

      }



      alert(
  "ورود موفق بود"
)

const userRes = await fetch("/api/login-phone", {
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    phone
  })
})


const userData = await userRes.json()


if(!userData.success){

  alert(userData.error)

  return

}
localStorage.setItem(
  "user",
  JSON.stringify(userData.user)
)

alert(
  JSON.stringify(userData.user)
)
console.log(
  "SAVED USER:",
  localStorage.getItem("user")
)

  const sessionRes = await fetch("/api/auth/session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: userData.user.uid,
    }),
  });

  const sessionData = await sessionRes.json();

  if (!sessionData.success) {
    alert(sessionData.error || "خطا در ساخت نشست");
    return;
  }

  console.log("SECURE SESSION CREATED");

if (redirect) {
  router.push(redirect)
} else if (userData.user.role === "company") {
  router.push("/company")
} else {
  router.push("/applicant")
}



}catch(error){
  console.error("LOGIN ERROR:", error)
  alert(
    error instanceof Error
      ? error.message
      : "خطا در بررسی کد"
  )

    }finally{

      setLoading(false)

    }

  }




  return (
    <div
className="
min-h-screen
flex
items-center
justify-center
bg-background
text-foreground
p-6
"
    >



   
   <div
className="
w-full
max-w-md
rounded-2xl
border
border-yellow-500/20
bg-card
shadow-lg
shadow-yellow-500/5
p-6
"
>



        <div
          className="
          text-center
          mb-8
          "
        >


          <div
            className="
            flex
            justify-center
            mb-5
            "
          >

            <div
              className="
              w-14
              h-14
              rounded-full
            bg-yellow-500
              flex
              items-center
              justify-center
              text-black
              text-×1
              shadow-lg
              "
            >

              🏠

            </div>

          </div>



          <h1
            className="
            text-3xl
            font-bold
            text-yellow-500
            "
          >

            شهرکار

          </h1>


          <p
            className="
            text-zinc-400
            mt-2
            "
          >

            جستجوی هوشمند شغل

          </p>


        </div>




        <h2
         className="
text-white
text-2xl
font-bold
text-right
mb-2
mt-10
"
        >

          ورود به شهرکار

        </h2>



        <p
          className="
          text-gray-400
          text-right
          mb-8
          "
        >

          با شماره موبایل وارد شوید

        </p>




        {
          step === 1 ? (


            <div
              className="
              space-y-5
              "
            >


              <label
                className="
                block
                text-white
                text-right
                "
              >

                شماره موبایل

              </label>



              <input

                type="tel"

                dir="ltr"

                value={phone}

                onChange={(e)=>
                  setPhone(
                    e.target.value
                  )
                }

                placeholder="09123456789"

           className="
w-full
rounded-2xl
border
border-border
bg-background
px-4
py-3
text-foreground
outline-none
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
             />



              <button

                onClick={sendCode}

                disabled={loading}

      className="
w-full
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-8
py-3
font-bold
text-yellow-300
shadow-lg
shadow-yellow-500/20
transition-all
hover:scale-105
hover:bg-yellow-900/80
"
              >

                {
                  loading
                  ?
                  "در حال ارسال..."
                  :
                  "ارسال کد"
                }


              </button>



            </div>


          ) : (
            <div
              className="
              space-y-5
              "
            >


              <label
                className="
                block
                text-white
                text-right
                "
              >

                کد تایید

              </label>



              <input

                type="tel"

                dir="ltr"

                value={code}

                onChange={(e)=>
                  setCode(
                    e.target.value
                  )
                }

                placeholder="123456"

   className="
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-8
py-3
font-bold
text-yellow-300
shadow-lg
shadow-yellow-500/20
transition-all
hover:scale-105
hover:bg-yellow-900/80
"
      
/>


              <button

                onClick={verifyCode}

                disabled={loading}

className="
rounded-2xl
border
border-emerald-500/40
bg-emerald-950/70
px-8
py-3
font-bold
text-emerald-300
shadow-lg
shadow-emerald-500/20
transition-all
hover:scale-105
hover:bg-emerald-900/80
"
  
            >

                {
                  loading
                  ?
                  "در حال بررسی..."
                  :
                  "ورود"
                }


              </button>



            </div>


          )

        }


      </div>


    </div>


  )


}

export default function LoginPage(){
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
