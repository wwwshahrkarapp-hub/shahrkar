'use client'
import Link from 'next/link'

import {
  LayoutDashboard,
  FileText,
  Users,
  Building2,
  Settings,
  Plus,
  Eye,
  Briefcase,
  UserCheck,
} from 'lucide-react'
import { DashboardShell, StatCard, type NavItem } from '@/components/dashboard-shell'
import { Button } from '@/components/ui/button'

const nav: NavItem[] = [
  {
    label: 'داشبورد',
    icon: LayoutDashboard,
    href: '/company',
    active: true,
  },
  {
    label: 'آگهی‌های من',
    icon: FileText,
    href: '/company/jobs',
  },
  {
    label: 'درخواست‌ها',
    icon: Users,
    href: '/company/requests',
  },
  {
    label: 'پروفایل شرکت',
    icon: Building2,
    href: '/company/profile',
  },
  {
    label: 'تنظیمات',
    icon: Settings,
    href: '/company/settings',
  },
]

const postings = [
  { title: 'برنامه‌نویس ارشد فرانت‌اند', applicants: 42, views: 1280, status: 'فعال' },
  { title: 'کارشناس دیجیتال مارکتینگ', applicants: 28, views: 860, status: 'فعال' },
  { title: 'طراح محصول', applicants: 15, views: 540, status: 'در انتظار' },
  { title: 'کارآموز توسعه بک‌اند', applicants: 63, views: 2100, status: 'بسته' },
]

const applicants = [
  { name: 'سارا محمدی', role: 'فرانت‌اند', match: 96 },
  { name: 'رضا کریمی', role: 'دیجیتال مارکتینگ', match: 91 },
  { name: 'نگار احمدی', role: 'طراح محصول', match: 88 },
]

const statusStyle: Record<string, string> = {
  فعال: 'bg-gold/15 text-gold',
  'در انتظار': 'bg-muted text-muted-foreground',
  بسته: 'bg-destructive/15 text-destructive',
}

export default function CompanyPanel() {
  return (
    <DashboardShell role="پنل کارفرما" userName="شرکت شهرکار" nav={nav}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">داشبورد کارفرما</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت آگهی‌ها و درخواست‌های استخدام
          </p>
        </div>
        <Link href="/company/jobs/new">
  <Button size="lg" className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90">
    <Plus className="size-4" />
    ثبت آگهی جدید
  </Button>
</Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="آگهی‌های فعال" value="۱۲" icon={Briefcase} hint="۳ آگهی این ماه" />
        <StatCard label="کل درخواست‌ها" value="۳۴۸" icon={Users} hint="+۲۴ امروز" />
        <StatCard label="بازدید آگهی‌ها" value="۱۸٬۴۰۰" icon={Eye} hint="این هفته" />
        <StatCard label="استخدام‌شده‌ها" value="۲۷" icon={UserCheck} hint="امسال" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-bold text-foreground">آگهی‌های اخیر</h2>
            <Button variant="ghost" size="sm" className="text-gold">
              مشاهده همه
            </Button>
          </div>
          <div className="divide-y divide-border">
            {postings.map((post) => (
              <div
                key={post.title}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-medium text-foreground">{post.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {post.applicants.toLocaleString('fa-IR')} درخواست ·{' '}
                    {post.views.toLocaleString('fa-IR')} بازدید
                  </p>
                </div>
                <span
                  className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${statusStyle[post.status]}`}
                >
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="font-bold text-foreground">بهترین کارجویان</h2>
            <p className="mt-1 text-xs text-muted-foreground">بر اساس تطابق مهارت</p>
          </div>
          <div className="divide-y divide-border">
            {applicants.map((a) => (
              <div key={a.name} className="flex items-center gap-3 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-sm font-bold text-gold">
                  {a.name.charAt(0)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{a.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{a.role}</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-gold">
                  {a.match.toLocaleString('fa-IR')}٪
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
