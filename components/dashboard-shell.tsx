'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Menu, X, LogOut, Bell, type LucideIcon } from 'lucide-react'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type NavItem = {
  label: string
  icon: LucideIcon
  href: string
  active?: boolean
}

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
const [notificationCount, setNotificationCount] = useState(0);
const router = useRouter()
useEffect(() => {

  async function loadNotificationCount() {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) return;


    const user = JSON.parse(savedUser);


   const res = await fetch("/api/notifications/count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
      }),
    });


    const data = await res.json();


   if (data.success) {
  setNotificationCount(data.count);
}

  }


  loadNotificationCount();

}, []);
  const sidebar = (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/" className="px-2">
        <Logo />
      </Link>

      <nav className="flex flex-col gap-1">
        {nav.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',

item.active
 ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-500/30 hover:scale-[1.02]'
 : 'text-muted-foreground hover:bg-secondary hover:text-foreground'

              )}
              onClick={() => setOpen(false)}
            >
              <Icon className="size-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto">
       
<Button
  variant="ghost"
  className="
  w-full
  justify-start
  gap-3
  rounded-xl
  border
  border-red-500/40
  bg-red-500/10
  text-red-400
  font-bold
  shadow-lg
  shadow-red-500/20
  transition-all
  hover:bg-red-500/20
  hover:scale-105
  animate-bounce
  "
  onClick={() => {
    localStorage.removeItem("user")
    router.push("/")
  }}
>
  <LogOut className="size-5" />
  خروج از حساب
</Button>

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

<span className="rounded-xl border border-yellow-300 bg-yellow-400 px-5 py-2 text-base font-extrabold text-black shadow-lg shadow-yellow-500/30">
  {role}
</span>

          </div>

         <div className="flex items-center gap-3">

<Link
  href="/applicant/notifications"
  className="relative flex size-10 items-center justify-center rounded-xl hover:bg-secondary"
>
  <Bell className="size-5 text-foreground" />

<span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
  {notificationCount}
</span>
</Link>


<span className="flex items-center gap-2">
  <span
    className="
    flex
    items-center
    justify-center
    rounded-xl
    border
    border-yellow-300
    bg-yellow-400
    px-4
    py-2
    text-sm
    font-extrabold
    text-black
    shadow-lg
    shadow-yellow-500/50
    animate-pulse
    "
  >
    {userName || "کاربر شهرکار"}
  </span>
</span>


</div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
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
   <div className="rounded-2xl border border-border bg-card p-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {label}
        </span>

       <span className="grid size-8 place-items-center rounded-lg bg-gold/10 text-gold">
        <Icon className="size-4" />
        </span>
      </div>

     <p className="mt-2 text-xl font-extrabold text-foreground">
        {value}
      </p>

      {hint && (
        <p className="mt-1 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}
