'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  Bell,
  Search,
  Moon,
  Sun,
  BriefcaseBusiness,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/logo'

const navLinks = [
  {
    href: '/',
    label: 'خانه',
  },
  {
    href: '/#jobs',
    label: 'فرصت های شغلی',
  },
  {
    href: '/#categories',
    label: 'دسته بندی ها',
  },
  {
    href: '/company',
    label: 'پنل کارفرما',
  },
  {
    href: '/applicant',
    label: 'پنل کارجو',
  },
]

export function HeroSearch() {
  const [open, setOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const closeMenu = () => {
    setOpen(false)
  }
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}

        <Link
          href="/"
          aria-label="Shahrkar"
          className="transition hover:scale-105"
        >
          <Logo />
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search */}

        <div className="hidden xl:flex items-center rounded-xl bg-secondary px-3 py-2 w-80">

          <Search
            className="h-5 w-5 text-muted-foreground"
          />

          <input
            placeholder="جستجوی شغل..."
            className="mr-2 w-full bg-transparent outline-none text-sm"
          />

        </div>

        {/* Right Buttons */}

        <div className="hidden lg:flex items-center gap-2">

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            render={<Link href="/login">ورود</Link>}
          />

          <Button
            className="bg-gold text-gold-foreground hover:bg-gold/90"
            render={
              <Link href="/register">
                ثبت نام
              </Link>
            }
          />

          <Button
            className="gap-2"
            render={
              <Link href="/company">
                <BriefcaseBusiness className="h-4 w-4" />
                ثبت آگهی
              </Link>
            }
          />

        </div>
        {/* Mobile Menu Button */}

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="منو"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t border-border bg-background lg:hidden animate-in slide-in-from-top duration-300">

          <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">

            {navLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>

            ))}

            <div className="mt-3 flex flex-col gap-2">

              <Button
                variant="outline"
                render={<Link href="/login">ورود</Link>}
              />

              <Button
                className="bg-gold text-gold-foreground hover:bg-gold/90"
                render={<Link href="/register">ثبت نام</Link>}
              />

              <Button
                render={
                  <Link href="/company">
                    ثبت آگهی رایگان
                  </Link>
                }
              />

            </div>

          </nav>

        </div>
      )}
    </header>
  )
}

