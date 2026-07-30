'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserRound, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AuthShell } from '@/components/auth-shell'
import { Field } from '@/components/field'
import { cn } from '@/lib/utils'

type Role = 'applicant' | 'company'

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('applicant')

  return (
    <AuthShell
      title="ساخت حساب کاربری"
      subtitle="نوع حساب خود را انتخاب کنید و در چند ثانیه ثبت‌نام کنید."
    >
      <div className="mb-6 grid grid-cols-2 gap-3">
        {(
          [
            { key: 'applicant', label: 'کارجو', icon: UserRound },
            { key: 'company', label: 'کارفرما', icon: Building2 },
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
                'flex flex-col items-center gap-2 rounded-xl border p-4 text-sm font-medium transition-all',
                active
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-border bg-secondary text-muted-foreground hover:border-gold/40',
              )}
            >
              <Icon className="size-6" />
              {opt.label}
            </button>
          )
        })}
      </div>

      <form
  onSubmit={(e) => {
    e.preventDefault()

    if (role === 'company') {
      window.location.href = '/company'
    } else {
      window.location.href = '/applicant'
    }
  }}
  className="space-y-4"
>
        <Field
          id="name"
          label={role === 'company' ? 'نام شرکت' : 'نام و نام خانوادگی'}
          placeholder={role === 'company' ? 'مثلاً شرکت شهرکار' : 'مثلاً علی رضایی'}
        />
        <Field
          id="email"
          label="ایمیل"
          type="email"
          dir="ltr"
          placeholder="you@example.com"
          className="text-left"
        />
        <Field
          id="phone"
          label="شماره موبایل"
          type="tel"
          dir="ltr"
          placeholder="0912xxxxxxx"
          className="text-left"
        />
        <Field
          id="password"
          label="رمز عبور"
          type="password"
          placeholder="••••••••"
        />

        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="mt-1 size-4 accent-[oklch(0.8_0.13_84)]" />
          <span>
            با{' '}
            <Link href="#" className="text-gold hover:underline">
              قوانین و مقررات
            </Link>{' '}
            شهرکار موافقم.
          </span>
        </label>

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full bg-gold text-gold-foreground hover:bg-gold/90"
        >
          ثبت‌نام
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        قبلاً ثبت‌نام کرده‌اید؟{' '}
        <Link href="/login" className="font-medium text-gold hover:underline">
          وارد شوید
        </Link>
      </p>
    </AuthShell>
  )
}
