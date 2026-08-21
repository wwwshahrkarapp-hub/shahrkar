import Link from 'next/link'
import { Check } from 'lucide-react'
import { Logo } from '@/components/logo'

const perks = [
  'دسترسی به هزاران فرصت شغلی معتبر',
  'ساخت رزومه حرفه‌ای در چند دقیقه',
  'پیگیری وضعیت درخواست‌ها',
  'دریافت پیشنهادهای شغلی هوشمند',
]

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand side */}
      <div className="relative hidden overflow-hidden border-l border-border bg-card lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(50% 50% at 100% 0%, oklch(0.8 0.13 84 / 0.16), transparent 70%)',
          }}
        />
        <Link href="/" className="relative">
          <Logo />
        </Link>

        <div className="relative">
          <h2 className="text-3xl font-extrabold leading-snug text-foreground">
            مسیر شغلی خود را با <span className="text-gold">شهرکار</span> بسازید
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-muted-foreground">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                  <Check className="size-4" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-muted-foreground">
          بیش از ۹۵۰ هزار کارجو به شهرکار اعتماد کرده‌اند.
        </p>
      </div>

      {/* Form side */}
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-16">
        <div className="mx-auto w-full max-w-md">
         <div className="mb-8 flex justify-center">
  <Link href="/" aria-label="شهرکار">
    <Logo />
  </Link>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
