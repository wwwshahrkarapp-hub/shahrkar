'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
const router = useRouter()

const handleCompanyClick = () => {
  const savedUser = localStorage.getItem("user")

  if (!savedUser) {
    router.push("/login")
    return
  }

  const user = JSON.parse(savedUser)

  if (user.role === "company") {
    router.push("/company")
  } else {
    alert("فقط کارفرماها می‌توانند آگهی ثبت کنند")
  }
}
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col items-start gap-4 rounded-3xl border border-border bg-card p-8">
          <div className="grid size-12 place-items-center rounded-xl bg-gold/10 text-gold">
            <UserRound className="size-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground">به دنبال شغل هستید؟</h3>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            رزومه حرفه‌ای بسازید، برای هزاران فرصت شغلی درخواست دهید و مسیر شغلی
            خود را متحول کنید.
          </p>
          <Button
            size="lg"
           className="mt-2 rounded-2xl bg-yellow-500 px-6 font-bold text-black shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:bg-yellow-400 hover:shadow-yellow-500/50"
            render={<Link href="/register">ثبت‌نام کارجو</Link>}
          />
        </div>

        <div className="flex flex-col items-start gap-4 rounded-3xl border border-gold/30 bg-gradient-to-bl from-gold/10 to-transparent p-8">
          <div className="grid size-12 place-items-center rounded-xl bg-gold text-gold-foreground">
            <Building2 className="size-6" />
          </div>
          <h3 className="text-xl font-bold text-foreground">کارفرما هستید؟</h3>
          <p className="text-pretty leading-relaxed text-muted-foreground">
            آگهی استخدام ثبت کنید، به بانک رزومه دسترسی داشته باشید و بهترین
            استعدادها را جذب کنید.
          </p>
       <Button
  size="lg"
  className="mt-2 rounded-2xl bg-yellow-500 px-6 font-bold text-black shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:bg-yellow-400 hover:shadow-yellow-500/50"
  onClick={handleCompanyClick}
>
  ثبت آگهی شغلی
</Button>
        </div>
      </div>
    </section>
  )
}
