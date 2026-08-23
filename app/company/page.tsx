'use client'


import Link from 'next/link'
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
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


const [companyName, setCompanyName] = useState("");

const [newCandidates, setNewCandidates] = useState<any[]>([]);

const [stats, setStats] = useState({
  activeJobs: 0,
  applications: 0,
  views: 0,
  hired: 0,
});

const [recentJobs, setRecentJobs] = useState<any[]>([]);
const [unreadSupport, setUnreadSupport] = useState(0);
const [showAllJobs, setShowAllJobs] = useState(false); 

  
useEffect(() => {
  async function loadSupportNotifications() {

    const user = auth.currentUser;

    if (!user) return;


    const res = await fetch("/api/company/support/unread", {
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
      setUnreadSupport(data.count);
    }
  }


  loadSupportNotifications();

}, []);




useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if(savedUser){
 
    const user = JSON.parse(savedUser);

    console.log("COMPANY USER:", user);

    setCompanyName(user.name || "کارفرما");


    fetch("/api/applications")
    .then((res)=>res.json())
 
      fetch("/api/applications")
        .then((res)=>res.json())
        .then((data)=>{

          const candidates = data.filter(
            (item:any)=>
              item.ownerUid === user.uid &&
              item.status === "در حال بررسی"
          );

          setNewCandidates(candidates.slice(0,3)) 

const companyApplications = data.filter(
  (item:any)=> item.ownerUid === user.uid
);

setStats((prev)=>({
  ...prev,
  applications: companyApplications.length,
  hired: companyApplications.filter(
    (item:any)=> item.status === "تأیید شد"
  ).length
}));


        });


      fetch("/api/jobs")
        .then((res)=>res.json())
        .then((data)=>{

         
const companyJobs = data
.filter(
  (job:any)=> job.ownerUid === user.uid
)
.sort(
  (a:any,b:any)=>
    b.createdAt._seconds - a.createdAt._seconds
);


          setRecentJobs(companyJobs);


setStats((prev)=>({
  ...prev,
  activeJobs: companyJobs.filter(
    (job:any)=>job.status === "active"
  ).length,

  views: companyJobs.reduce(
    (sum:any, job:any)=>sum + (job.views || 0),
    0
  )
}));


        });


  }

}, []);


  return (

    <DashboardShell
      role="پنل کارفرما"
      userName={companyName}
      nav={nav}
    > 

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">داشبورد کارفرما</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت آگهی‌ها و درخواست‌های استخدام
          </p>
        </div>




{unreadSupport > 0 && (
  <div className="mb-5 rounded-2xl border border-yellow-500/40 bg-yellow-950/70 p-5 shadow-lg shadow-yellow-500/20">

    <h2 className="font-bold text-yellow-300">
      🔔 پاسخ جدید پشتیبانی دارید
    </h2>

    <p className="mt-2 text-sm text-gray-300">
      مدیر شهرکار به درخواست شما پاسخ داده است.
    </p>

  </div>
)}




        <Link href="/company/jobs/new">
<Button
  size="lg"
  className="
  gap-2
  rounded-xl
  bg-yellow-500
  px-5
  font-bold
  text-black
  shadow-lg
  shadow-yellow-500/20
  transition-all
  hover:scale-105
  hover:bg-yellow-400
  "
>
 

    <Plus className="size-4" />
    ثبت آگهی جدید
  </Button>
</Link>
      </div>


<div className="mt-4 grid grid-cols-2 gap-3">

  <StatCard
    label="آگهی‌های فعال"
    value={stats.activeJobs.toLocaleString("fa-IR")}
    icon={Briefcase}
    hint="آگهی‌های فعال شما"
  />

  <StatCard
    label="کل درخواست‌ها"
    value={stats.applications.toLocaleString("fa-IR")}
    icon={Users}
    hint="درخواست‌های دریافتی"
  />

  <StatCard
    label="بازدید آگهی‌ها"
    value={stats.views.toLocaleString("fa-IR")}
    icon={Eye}
    hint="مجموع بازدیدها"
  />

  <StatCard
    label="استخدام‌شده‌ها"
    value={stats.hired.toLocaleString("fa-IR")}
    icon={UserCheck}
    hint="بر اساس تأیید درخواست‌ها"
  />

</div>


<div
  className="
  mt-6
  rounded-2xl
  border
  border-yellow-500/20
  bg-card
  p-5
  shadow-lg
  shadow-yellow-500/5
  "
>

  <div className="flex items-center justify-between mb-4">

    <h2 className="font-bold text-foreground">
      کاندیداهای جدید ⭐
    </h2>

    <Link
  href="/company/requests"
  className="
  rounded-xl
  border
  border-yellow-500/40
  bg-yellow-500/10
  px-4
  py-2
  text-sm
  font-bold
  text-yellow-400
  shadow-lg
  shadow-yellow-500/10
  transition-all
  hover:scale-105
  hover:bg-yellow-500/20
  "
>
  مشاهده همه
</Link>

  </div>


  {
    newCandidates.length === 0 ? (

      <p className="text-sm text-muted-foreground">
        کاندیدای جدیدی وجود ندارد
      </p>

    ) : (

      <div className="space-y-3">

      {
        newCandidates.map((candidate)=>(
          
          <div
          key={candidate.id}
          className="
          flex
          items-center
          justify-between
          rounded-xl
          border
          border-border
          bg-background
          p-3
          "
          >

            <div className="text-right">

              <p className="font-bold text-foreground">
                {candidate.name}
              </p>

              <p className="text-xs text-muted-foreground">
                درخواست استخدام جدید
              </p>

            </div>


            <span
            className="
            rounded-xl
            bg-yellow-500/10
            px-3
            py-1
            text-xs
            font-bold
            text-yellow-400
            "
            >
              جدید
            </span>


          </div>

        ))
      }

      </div>

    )
  }


</div>



      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="font-bold text-foreground">آگهی‌های اخیر ⭐  </h2>
            
<Button
  variant="ghost"
  size="sm"
  onClick={()=>setShowAllJobs(!showAllJobs)}
  className="
  rounded-xl
  border
  border-yellow-500/40
  bg-yellow-500/10
  px-4
  py-2
  text-sm
  font-bold
  text-yellow-400
  shadow-lg
  shadow-yellow-500/10
  transition-all
  hover:scale-105
  hover:bg-yellow-500/20
  "
>
  {showAllJobs ? "نمایش کمتر" : "مشاهده همه"}
</Button>


          </div>
          <div className="divide-y divide-border">
          {(showAllJobs ? recentJobs : recentJobs.slice(0,3)).map((post:any)=>(
              <div
                key={post.title}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-medium text-foreground">{post.title}</h3>

                  
<p className="mt-1 text-xs text-muted-foreground">
 آگهی فعال · {post.city || "بدون شهر"}
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

        </div>

      </DashboardShell>
    )
}
