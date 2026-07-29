'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, type LucideIcon } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type NavItem = { label: string; icon: LucideIcon; active?: boolean }

export function DashboardShell({
  role,
  userName,
  nav,
  children,
}: {
  role: string
  userName: string
  nav: NavItem[]
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/" className="px-2">
        <Logo />
      </Link>
      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                item.active
                  ? 'bg-gold text-gold-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <Icon className="size-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground"
          render={
            <Link href="/">
              <LogOut className="size-5" />
              خروج از حساب
            </Link>
          }
        />
      </div>
    </div>
  )

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen border-l border-border bg-sidebar lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 right-0 w-72 border-l border-border bg-sidebar">
            <button
              onClick={() => setOpen(false)}
              aria-label="بستن"
              className="absolute left-3 top-3 text-muted-foreground"
            >
              <X className="size-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="منو"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">
              {role}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">خوش آمدید،</span>
            <span className="flex items-center gap-2">
              <span className="hidden text-sm font-medium text-foreground sm:inline">
                {userName}
              </span>
              <span className="grid size-9 place-items-center rounded-full bg-gold text-sm font-bold text-gold-foreground">
                {userName.charAt(0)}
              </span>
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
}: {
  label: string
  value: string
  icon: LucideIcon
  hint?: string
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="grid size-9 place-items-center rounded-lg bg-gold/10 text-gold">
          <Icon className="size-5" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-extrabold text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
