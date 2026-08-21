'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserRound, Building2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AuthShell } from '@/components/auth-shell'
import { Field } from '@/components/field'
import { cn } from '@/lib/utils'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'


type Role = 'applicant' | 'company'


export default function RegisterPage() {

  const router = useRouter()


  const [role, setRole] = useState<Role>('applicant')


  const [form, setForm] = useState({

    name: '',
    email: '',
    phone: '',
    password: '',

  })


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setForm({

      ...form,

      [e.target.id]: e.target.value,

    })

  }



  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {

  e.preventDefault()

  try {

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        role,
      }),
    })


    const text = await res.text()

let data

try {
  data = JSON.parse(text)
} catch {
  console.log("SERVER RESPONSE:", text)
  alert("پاسخ سرور نامعتبر است")
  return
}


    alert("ثبت نام موفق بود")

    router.push("/login")


  } catch (error:any) {

    console.log(error)

    alert(
      error.message || "خطا در ثبت نام"
    )

  }

}
  return (

    <AuthShell
     title="به شهرکار بپیوندید ⭐"
subtitle="فرصت‌های شغلی مناسب خودتان را پیدا کنید؛ سریع، هوشمند و قابل اعتماد."
    >


      <div className="mb-6 grid grid-cols-2 gap-3">


        {(
          [

            {
              key: 'applicant',
              label: 'کارجو',
              icon: UserRound
            },

            {
              key: 'company',
              label: 'کارفرما',
              icon: Building2
            }

          ] as const

        ).map((opt) => {


          const Icon = opt.icon

          const active = role === opt.key


          return (

            <button

              key={opt.key}

              type="button"

              onClick={() => setRole(opt.key)}

className={cn(
  'group flex flex-col items-center gap-3 rounded-3xl border p-6 text-sm font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
  active
    ? 'border-yellow-400 bg-yellow-500/10 text-yellow-400 shadow-xl shadow-yellow-500/30 ring-2 ring-yellow-400/30'
    : 'border-zinc-700 bg-zinc-900 text-gray-400 hover:border-yellow-500/40'
)}

            >

             <div className="rounded-2xl bg-yellow-500/10 p-3 text-yellow-400 group-hover:bg-yellow-500/20">
  <Icon className="size-7" />
</div>

              {opt.label}


            </button>

          )


        })}

</div>

  <div className="rounded-3xl border border-yellow-500/20 bg-zinc-900/70 p-6 shadow-xl shadow-yellow-500/10">

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        <Field
          id="name"
          label={
            role === "company"
              ? "نام شرکت"
              : "نام و نام خانوادگی"
          }
          value={form.name}
          onChange={handleChange}
          placeholder={
            role === "company"
              ? "مثلاً شرکت شهرکار"
              : "مثلاً علی رضایی"
          }
        />



        <Field
          id="email"
          label="ایمیل"
          type="email"
          dir="ltr"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="text-left"
        />



        <Field
          id="phone"
          label="شماره موبایل"
          type="tel"
          dir="ltr"
          value={form.phone}
          onChange={handleChange}
          placeholder="0912xxxxxxx"
          className="text-left"
        />



        <Field
          id="password"
          label="رمز عبور"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />



        <label className="flex items-start gap-2 text-sm text-muted-foreground">

          <input
            type="checkbox"
            className="mt-1 size-4"
          />


          <span>

            با{" "}

            <Link
              href="#"
              className="text-gold hover:underline"
            >
              قوانین و مقررات
            </Link>

            {" "}
            شهرکار موافقم.

          </span>


        </label>



        <Button
          type="submit"
          size="lg"
        className="h-12 w-full rounded-2xl bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/30 transition-all hover:bg-yellow-400 hover:scale-[1.02] hover:shadow-yellow-500/50"
        >

          ثبت‌نام

        </Button>


      </form>




      <p className="mt-6 text-center text-sm text-muted-foreground">


        قبلاً ثبت‌نام کرده‌اید؟{" "}


        <Link
          href="/login"
          className="font-medium text-gold hover:underline"
        >

          وارد شوید

        </Link>


      </p>

</div>


    </AuthShell>

  )

}
