'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

const navLinks = [
  { href: '/', label: 'خانه' },
  { href: '/#jobs', label: 'فرصت‌های شغلی' },
  { href: '/#categories', label: 'دسته‌بندی‌ها' },
  { href: '/company', label: 'پنل کارفرما' },
  { href: '/applicant', label: 'پنل کارجو' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="شهرکار">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
  <Link
    key={link.href}
    href={link.href}
    className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
  >
    {link.label}
  </Link>
))}
            
              
             

           
              
           
          
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="lg"
            render={<Link href="/login">ورود</Link>}
          />
          <Button
            size="lg"
            className="bg-gold text-gold-foreground hover:bg-gold/90"
            render={<Link href="/register">ثبت‌نام</Link>}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="منو"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2">
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                render={<Link href="/login">ورود</Link>}
              />
              <Button
                size="lg"
                className="flex-1 bg-gold text-gold-foreground hover:bg-gold/90"
                render={<Link href="/register">ثبت‌نام</Link>}
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}


