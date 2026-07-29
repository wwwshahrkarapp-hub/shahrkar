import Link from 'next/link'
import { Building2, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaBanner() {
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
            className="mt-2 bg-gold text-gold-foreground hover:bg-gold/90"
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
            variant="outline"
            className="mt-2"
            render={<Link href="/company">ثبت آگهی شغلی</Link>}
          />
        </div>
      </div>
    </section>
  )
}
