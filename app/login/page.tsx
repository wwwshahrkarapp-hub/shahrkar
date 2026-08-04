"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


export default function LoginPage(){

  const router = useRouter()


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


      router.push(
        "/applicant"
      )



    }catch(error){

      console.log(error)


      alert(
        "خطا در بررسی کد"
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
      bg-[#090807]
      p-5
      "
    >


      <div
        className="
        w-full
        max-w-md
        rounded-2xl
        bg-[#0f0e0c]
        border
        border-[#2b2418]
        shadow-2xl
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
              bg-[#e8b84b]
              flex
              items-center
              justify-center
              text-black
              text-2xl
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
            text-[#e8b84b]
            "
          >

            شهرکار

          </h1>


          <p
            className="
            text-gray-400
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
                bg-[#17140f]
                border
                border-[#e8b84b]
                text-white
                rounded-xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-[#e8b84b]
                "
              />



              <button

                onClick={sendCode}

                disabled={loading}

                className="
                w-full
                bg-[#e8b84b]
                text-black
                font-bold
                rounded-xl
                p-4
                hover:opacity-90
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
                w-full
                bg-[#17140f]
                border
                border-[#e8b84b]
                text-white
                rounded-xl
                p-4
                outline-none
                focus:ring-2
                focus:ring-[#e8b84b]
                "
              />



              <button

                onClick={verifyCode}

                disabled={loading}

                className="
                w-full
                bg-[#e8b84b]
                text-black
                font-bold
                rounded-xl
                p-4
                hover:opacity-90
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
