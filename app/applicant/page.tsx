'use client'

import {
  LayoutDashboard,
  Search,
  FileText,
  Bookmark,
  Settings,
  Send,
  Eye,
  CheckCircle2,
  Building2,
} from 'lucide-react'
import { DashboardShell, StatCard, type NavItem } from '@/components/dashboard-shell'
import { Button } from '@/components/ui/button'
import { jobs } from '@/lib/data'

const nav: NavItem[] = [
  { label: 'داشبورد', icon: LayoutDashboard, href: '/applicant', active: true },
  { label: 'جستجوی شغل', icon: Search, href: '/jobs' },
  { label: 'رزومه من', icon: FileText, href: '/applicant' },
  { label: 'مشاغل ذخیره‌شده', icon: Bookmark, href: '/jobs' },
  { label: 'تنظیمات', icon: Settings, href: '/applicant/settings' },
]

const applications = [
  { title: 'برنامه‌نویس ارشد فرانت‌اند', company: 'دیجی‌پی', status: 'در حال بررسی' },
  { title: 'مهندس داده', company: 'کافه‌بازار', status: 'مصاحبه' },
  { title: 'کارشناس دیجیتال مارکتینگ', company: 'اسنپ', status: 'رد شده' },
  { title: 'مدیر محصول', company: 'دیوار', status: 'پذیرفته شده' },
]

const statusStyle: Record<string, string> = {
  'در حال بررسی': 'bg-muted text-muted-foreground',
  مصاحبه: 'bg-gold/15 text-gold',
  'رد شده': 'bg-destructive/15 text-destructive',
  'پذیرفته شده': 'bg-gold/25 text-gold',
}

export default function ApplicantPanel() {
  const suggested = jobs.slice(0, 3)

  return (
    <DashboardShell role="پنل کارجو" userName="علی رضایی" nav={nav}>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">سلام علی</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            امروز ۵ فرصت شغلی جدید متناسب با پروفایل شما ثبت شده است.
          </p>
        </div>

        <Button size="lg" className="gap-2 bg-gold text-gold-foreground hover:bg-gold/90">
          <Search className="size-4" />
          جستجوی شغل
        </Button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground">تکمیل پروفایل</h2>
          <span className="text-sm font-bold text-gold">۷۵٪</span>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-3/4 rounded-full bg-gold" />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          برای افزایش شانس استخدام، نمونه‌کارها و مهارت‌های خود را کامل کنید.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="درخواست‌های ارسالی" value="۱۸" icon={Send} hint="این ماه" />
        <StatCard label="بازدید رزومه" value="۲۴۰" icon={Eye} hint="+۱۲ این هفته" />
        <StatCard label="دعوت به مصاحبه" value="۴" icon={CheckCircle2} hint="فعال" />
        <StatCard label="مشاغل ذخیره‌شده" value="۹" icon={Bookmark} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="font-bold text-foreground">وضعیت درخواست‌ها</h2>
          </div>
          <div className="divide-y divide-border">
            {applications.map((app) => (
              <div key={app.title} className="flex items-center gap-3 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-gold">
                  <Building2 className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{app.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{app.company}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyle[app.status]}`}
                >
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-bold text-foreground">پیشنهاد شغلی برای شما</h2>
            <Button variant="ghost" size="sm" className="text-gold">
              مشاهده همه
            </Button>
          </div>
          <div className="divide-y divide-border">
            {suggested.map((job) => (
              <div key={job.id} className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{job.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {job.company} · {job.location}
                  </p>
                </div>
                <Button size="sm" className="bg-gold text-gold-foreground hover:bg-gold/90">
                  ارسال
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
