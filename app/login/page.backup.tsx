'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AuthShell } from '@/components/auth-shell'
import { Button } from '@/components/ui/button'
import { Field } from '@/components/field'

import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'

import {
  auth,
  db,
} from '@/lib/firebase'

import {
  doc,
  getDoc,
} from 'firebase/firestore'


export default function LoginPage() {

  const router = useRouter()

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')

  const [step, setStep] = useState(1)

  const [confirmation, setConfirmation] =
    useState<any>(null)


  const sendCode = async () => {

    try {

      const phoneNumber =
        phone.startsWith('09')
          ? '+98' + phone.substring(1)
          : phone


      if (!window.recaptchaVerifier) {

        window.recaptchaVerifier =
          new RecaptchaVerifier(
            auth,
            'recaptcha-container',
            {
              size: 'invisible'
            }
          )

      }


      const result =
        await signInWithPhoneNumber(
          auth,
          phoneNumber,
          window.recaptchaVerifier
        )


      setConfirmation(result)

      setStep(2)


      alert(
        'کد ارسال شد'
      )


    } catch(error:any) {


      console.log(
        'PHONE ERROR:',
        error
      )


      alert(
        error.code +
        '\n' +
        error.message
      )

    }

  }
  const verifyCode = async () => {
alert("verify شروع شد")
    try {

      if (!confirmation) {

        alert(
          "اول کد را ارسال کنید"
        )

        return

      }

alert("دارم کد رو چک می‌کنم: " + code)
      const result =
        await confirmation.confirm(
          code
        )


      console.log(
        "PHONE USER:",
        result.user
      )
alert("ورود Firebase موفق شد")

      const uid =
        result.user.uid
alert("UID: " + uid)

      const userDoc =
        await getDoc(
          doc(
            db,
            "users",
            uid
          )
        )


      if (!userDoc.exists()) {alert("پروفایل کاربر وجود ندارد")

        console.log(
          "PROFILE NOT FOUND"
        )


        router.push(
          "/applicant"
        )


        return

      }


      const userData =
        userDoc.data()


      console.log(
        "USER DATA:",
        userData
      )
alert("پروفایل پیدا شد")

      if (
        userData.role === "company"
      ) {

        router.push(
          "/company"
        )

      } else {

        router.push(
          "/applicant"
        )

      }


    } catch(error:any) {


      console.log(
        "VERIFY ERROR:",
        error
      )


      alert(
        error.code +
        "\n" +
        error.message
      )

    }

  }



  return (

    <AuthShell
      title="ورود به شهرکار"
      subtitle="با شماره موبایل وارد شوید"
    >


      <div
        id="recaptcha-container"
      />


      {
        step === 1 ? (

          <div className="space-y-4">


            <Field
              id="phone"
              label="شماره موبایل"
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(e)=>
                setPhone(
                  e.target.value
                )
              }
              placeholder="09123456789"
            />


            <Button
              onClick={sendCode}
              className="w-full h-11"
            >

              ارسال کد

            </Button>


          </div>


        ) : (


          <div className="space-y-4">


            <Field
              id="code"
              label="کد تایید"
              type="number"
              dir="ltr"
              value={code}
              onChange={(e)=>
                setCode(
                  e.target.value
                )
              }
              placeholder="123456"
            />


            <Button
              onClick={verifyCode}
              className="w-full h-11"
            >

              ورود

            </Button>


          </div>


        )

      }


    </AuthShell>

  )

}

