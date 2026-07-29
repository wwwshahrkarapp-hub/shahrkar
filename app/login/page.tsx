'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AuthShell } from '@/components/auth-shell'
import { Field } from '@/components/field'

export default function LoginPage() {
  return (
    <AuthShell
      title="ورود به حساب کاربری"
      subtitle="برای ادامه، ایمیل و رمز عبور خود را وارد کنید."
    >
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <Field
          id="email"
          label="ایمیل"
          type="email"
          dir="ltr"
          placeholder="you@example.com"
          className="text-left"
        />
        <Field
          id="password"
          label="رمز عبور"
          type="password"
          placeholder="••••••••"
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="size-4 accent-[oklch(0.8_0.13_84)]" />
            مرا به خاطر بسپار
          </label>
          <Link href="#" className="text-gold hover:underline">
            فراموشی رمز عبور؟
          </Link>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full bg-gold text-gold-foreground hover:bg-gold/90"
        >
          ورود
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        حساب کاربری ندارید؟{' '}
        <Link href="/register" className="font-medium text-gold hover:underline">
          ثبت‌نام کنید
        </Link>
      </p>
    </AuthShell>
  )
}
