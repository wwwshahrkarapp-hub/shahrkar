'use client'

import Link from "next/link";
import { categories } from "@/lib/data";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";


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
Bell
} from 'lucide-react'

import {
  DashboardShell,
  StatCard,
  type NavItem
} from '@/components/dashboard-shell'

import { Button } from '@/components/ui/button'



const nav: NavItem[] = [
  {
    label: 'داشبورد',
    icon: LayoutDashboard,
    href: '/applicant',
    active: true
  },
  
  {
    label: 'رزومه من',
    icon: FileText,
    href: '/applicant/profile'
  },
  {
    label: 'مشاغل ذخیره‌شده',
    icon: Bookmark,
    href: '/applicant/saved-jobs'
  },
  {
    label: 'تنظیمات',
    icon: Settings,
    href: '/applicant/settings'
    
    }
] 

const statusStyle: Record<string,string> = {
  'در حال بررسی':
    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40',

  'تأیید شد':
    'bg-green-500/20 text-green-400 border border-green-500/40',

  'رد شد':
    'bg-red-500/20 text-red-400 border border-red-500/40',
}


export default function ApplicantPanel() {

  const [userName, setUserName] = useState("");
  const [profilePercent, setProfilePercent] = useState(0);
const [applications, setApplications] = useState<any[]>([]);
const [notifications, setNotifications] = useState<any[]>([]);
const [debugCount, setDebugCount] = useState(0);
const [jobs, setJobs] = useState<any[]>([]);
const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
const [sendingJob, setSendingJob] = useState("");
const [sentJobs, setSentJobs] = useState<string[]>([]);
const [applicationIds, setApplicationIds] = useState<Record<string,string>>({});
const [showAllSuggested, setShowAllSuggested] = useState(false);
const [showAllApplications, setShowAllApplications] = useState(false);
 useEffect(() => {

  async function loadUserProfile() {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      return;
    }

    const user = JSON.parse(savedUser);

    setUserName(user.name || "");

const appRes = await fetch("/api/applications/my", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    uid: user.uid,
  }),
});

const appData = await appRes.json();

if (appData.success) {
  const ids = appData.applications.map(
    (item:any) => String(item.jobId)
  );

  const appMap:any = {};

  appData.applications.forEach((item:any) => {
    appMap[String(item.jobId)] = item.id;
  });

  setSentJobs(ids);
  setApplicationIds(appMap);
}

    const res = await fetch("/api/profile/status", {
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

      setProfilePercent(data.percent);

    }

  }


 loadUserProfile();

async function loadApplications() {

  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return;
  }

  const user = JSON.parse(savedUser);

  const res = await fetch("/api/applications");
  const data = await res.json();

  const myApps = data.filter(
    (app:any) => app.uid === user.uid
  );
console.log("USER UID:", user.uid);
console.log("APP UID:", data[0]?.uid);
setApplications(myApps);
setDebugCount(myApps.length);
}

loadApplications();

async function loadNotifications() {

  const savedUser = localStorage.getItem("user");

  if (!savedUser) {
    return;
  }

  const user = JSON.parse(savedUser);


  const res = await fetch("/api/notifications", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({
      uid:user.uid,
    }),
  });


  const data = await res.json();


  if(data.success){
    setNotifications(data.notifications);
console.log("MY NOTIFICATIONS:", data.notifications);
  }

}

loadNotifications();

async function loadJobs(){
  const res = await fetch("/api/jobs");
  const data = await res.json();
  setJobs(data);
}

loadJobs();
loadRecommendedJobs();

async function loadRecommendedJobs(){

  const savedUser = localStorage.getItem("user");

  if(!savedUser){
    return;
  }


  const user = JSON.parse(savedUser);


  const res = await fetch("/api/jobs/recommended",{

    method:"POST",

    headers:{
      "Content-Type":"application/json",
    },

    body:JSON.stringify({
      uid:user.uid
    })

  });


  const data = await res.json();


  setRecommendedJobs(data);

}


loadRecommendedJobs();

async function loadCategoryCounts(){

  const res = await fetch("/api/jobs/counts");

  const data = await res.json();

  setCategoryCounts(data);

}

loadCategoryCounts();

  

}, []);


    const suggested =
  recommendedJobs.length > 0
    ? recommendedJobs
    : jobs.slice(0,3);



async function sendApplication(job:any) {

  const savedUser = localStorage.getItem("user");

  if (!savedUser) return;

  const user = JSON.parse(savedUser);

  const res = await fetch("/api/applications/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uid: user.uid,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.city,
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      message: "درخواست استخدام از طریق شهرکار",
    }),
  });


  const data = await res.json();


  if(data.success){

    setSentJobs((prev)=>[
      ...prev,
      String(job.id)
    ]);


    setApplicationIds((prev)=>({
      ...prev,
      [String(job.id)]: data.applicationId
    }));

  }

}


  return (
<DashboardShell
  role="پنل کارجو"
  userName={userName}
  nav={nav}
>

<div>

  <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

    <div>

<h1 className="mt-10 text-xl font-extrabold text-foreground text-center">
     ☆  آینده شغلی تو از همین امروز ساخته می‌شود  ☆
</h1>

    </div>

<Button
  size="lg"
  className="mt-8 gap-2 rounded-xl bg-yellow-400 text-black font-bold shadow-lg shadow-yellow-500/30 hover:bg-yellow-300"
>
  <Search className="size-4" />
  جستجوی شغل
</Button>

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

    <div className="flex items-center justify-between">

      <h2 className="font-bold text-foreground">
        تکمیل پروفایل
      </h2>


       
<span
  className="
  rounded-full
  bg-yellow-500/10
  px-3
  py-1
  text-sm
  font-extrabold
  text-yellow-400
"
>
  {profilePercent}٪
</span>


    </div>



    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-secondary">

      <div
       
className="
h-full
rounded-full
bg-yellow-400
shadow-lg
shadow-yellow-500/40
transition-all
duration-500
"

        style={{
          width:`${profilePercent}%`
        }}
      />

    </div>
</div>


    <p className="mt-2 text-xs text-muted-foreground">
      برای افزایش شانس استخدام، نمونه‌کارها و مهارت‌های خود را کامل کنید.
    </p>


  </div>



  <div className="mt-6 grid grid-cols-2 gap-3">

    <StatCard
      label="درخواست‌های ارسالی"
      value={String(applications.length)}
      icon={Send}
      hint="این ماه"
    />


    <StatCard
      label="بازدید رزومه"
      value="۲۴۰"
      icon={Eye}
      hint="+۱۲ این هفته"
    />


    <StatCard
      label="دعوت به مصاحبه"
      value={String(
  applications.filter((app: any) => app.status === "مصاحبه").length
)}
      icon={CheckCircle2}
      hint="فعال"
    />


    <StatCard
      label="مشاغل ذخیره‌شده"
      value="۹"
      icon={Bookmark}
    />
</div>




{/* جستجو بر اساس دسته‌بندی شغلی */}
<div className="mt-8 rounded-2xl border border-yellow-500/20 bg-card p-4">

  <div className="mb-5 text-center">

    <h2 className="text-xl font-extrabold text-foreground">
      جستجو بر اساس دسته‌بندی شغلی
    </h2>

    <p className="mt-2 text-sm text-muted-foreground">
      حوزه مورد علاقه خود را انتخاب کنید
    </p>

  </div>



<div className="grid grid-cols-2 gap-3">

{[
 {
 title:"کارگر ساده",
 slug:"simple-worker",
 icon:"🧰"
 },
 {
  title:"بازاریابی و فروش",
  slug:"marketing",
  icon:"📣"
 },
 {
  title:"طراحی و هنر",
  slug:"design",
  icon:"🎨"
 },
 {
  title:"فناوری اطلاعات",
  slug:"it",
  icon:"</>"
 },
 {
  title:"مالی و حسابداری",
  slug:"finance",
  icon:"💰"
 },
 {
  title:"داده و تحلیل",
  slug:"data",
  icon:"📊"
 }

].map((item)=>(



<Link
  key={item.title}
  href={`/jobs?category=${item.slug}`}
  className="
    flex
    items-center
    justify-between
    rounded-2xl
    border
    border-yellow-500/20
    bg-background
    p-3
    transition
    hover:border-yellow-400/50
  "
>

  <div
    className="
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-xl
      bg-yellow-500/10
      text-xl
    "
  >


          {item.icon}
        </div>



        <div className="text-right">

          <h3 className="text-sm font-bold text-foreground">
            {item.title}
          </h3>

          <p className="text-xs text-muted-foreground">
            {categoryCounts[item.slug] || 0} فرصت شغلی
          </p>

        </div>

      </Link>

    ))}

  </div>

</div>


<div className="mt-10">

  <h2 className="text-2xl font-extrabold text-foreground">
  
  </h2>


    {/* وضعیت درخواست‌ها */}

  <div className="mt-10 rounded-2xl border border-border bg-card">

 <div className="
border-b 
border-border 
p-5 
flex 
items-center 
justify-between
">

 <h2 className="font-bold text-foreground">
    وضعیت درخواست‌ها ⭐
</h2>

<button
  onClick={() => setShowAllApplications(!showAllApplications)}
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
    shadow-yellow-500/20
    transition-all
    hover:bg-yellow-500/20
    hover:scale-105
  "
>
  {showAllApplications ? "نمایش کمتر" : "مشاهده همه"}
</button>

</div>


<div className="grid grid-cols-1 gap-3 p-4">

  {(showAllApplications ? applications : applications.slice(0, 5)).map((app) => (

          <div
           key={app.jobTitle}
className="rounded-2xl border border-border bg-background p-4 flex items-start  gap-4 hover:border-gold/50 transition"

          >


            <span
              className="
              grid
              size-10
              shrink-0
              place-items-center
              rounded-xl
              bg-secondary
              text-secondary-foreground
              "
            >

              <Building2 className="size-5" />

            </span>



            <div className="min-w-0 flex-1">


              <p className="truncate text-sm font-medium text-foreground">
                {app.jobTitle}
              </p>


              <p className="truncate text-xs text-muted-foreground">
                {app.company}
              </p>


            </div>




            <span
              className={`
              shrink-0
             rounded-xl
px-5
py-2
text-sm
font-bold
              ${statusStyle[app.status]}
              `}
            >

              {app.status}

            </span>
{app.status === "تأیید شد" && (
  <button
    onClick={async () => {

      const res = await fetch(
        `/api/chats/by-application/${app.id}`
      );

      const data = await res.json();

      if(data.success){

        window.location.href =
          `/user/chats/${data.chatId}`;

      } else {

        alert(data.message);

      }

    }}
  className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white"
  >
    💬 چت
  </button>
)}

          </div>


        ))}


      </div>


    </div>


<div className="
  border-b
  border-border
  p-5
  flex
  items-center
  justify-between
">

  <h2 className="font-bold text-foreground">
      پیشنهاد شغل برای شما ⭐
  </h2>

  <button
    onClick={() => setShowAllSuggested(!showAllSuggested)}
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
      shadow-yellow-500/20
      transition-all
      hover:bg-yellow-500/20
      hover:scale-105
    "
  >
    {showAllSuggested ? "نمایش کمتر" : "مشاهده همه"}
  </button>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">


 {recommendedJobs
.slice(0, showAllSuggested ? 20 : 5)
.map((job) => (
 <div
  key={job.id}
  className="
    rounded-2xl
    border
    border-yellow-500/20
    bg-background
    p-4
    transition
    hover:border-yellow-400/50
    hover:shadow-lg
    hover:shadow-yellow-500/10
  "
>


<div className="mb-3 inline-flex rounded-full bg-yellow-500/10 px-3 py-1 text-xs font-bold text-amber-300">
  ⭐ پیشنهاد مناسب برای شما
</div>

   
<h3 className="text-base font-extrabold text-foreground">
  💼 {job.title}
</h3>

<div className="mt-2 space-y-1 text-xs text-muted-foreground">
  <p>
    🏢 {job.company}
  </p>

  <p>
    📍 {job.city}
  </p>

  <p>
    🕒 {job.type}
  </p>

  <p className="font-bold text-yellow-400">
    💰 {job.salary}
  </p>


<p className="font-bold text-green-400">
  🤖 میزان تطبیق: {job.matchScore || 0}٪
</p>


{
 job.matchReasons?.map(
  (reason:string,index:number)=>(
    <p
      key={index}
      className="text-xs text-muted-foreground mt-1"
    >
      {reason}
    </p>
  )
 )
}


</div>


<div className="mt-3 flex gap-2">

  {!sentJobs.includes(String(job.id)) ? (

    <Button
      className="
        flex-1
        rounded-2xl
        border
        border-yellow-500/40
        bg-yellow-950/70
        py-2
        font-bold
        text-yellow-400
        shadow-lg
        shadow-yellow-500/10
        transition-all
        hover:scale-105
      "
     onClick={() => sendApplication(job)}
    >
      ارسال درخواست
    </Button>

  ) : (

    <>
      <Button
        className="
          flex-1
          rounded-2xl
          border
          border-emerald-500/40
          bg-emerald-950/70
          py-2
          font-bold
          text-emerald-400
          shadow-lg
          shadow-emerald-500/10
        "
      >
        ارسال شد ✓
      </Button>

      <Button
        className="
          rounded-2xl
          border
          border-red-500/40
          bg-red-950/70
          px-4
          py-2
          font-bold
          text-red-400
          shadow-lg
          shadow-red-500/10
          transition-all
          hover:scale-105
        "
        
onClick={async () => {

  const applicationId = applicationIds[String(job.id)];

  if (!applicationId) {
    return;
  }

  const savedUser = localStorage.getItem("user");

  if (!savedUser) return;

  const user = JSON.parse(savedUser);

  const token = await auth.currentUser?.getIdToken();

  const res = await fetch(
    `/api/applications/${applicationId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "لغو شده",
      }),
    }
  );


  if (res.ok) {

    setSentJobs((prev) =>
      prev.filter(
        (id) => id !== String(job.id)
      )
    );

  }

}}

      >
        لغو
      </Button>
    </>

  )}

</div>


      </div>
    ))}

  </div>

</div>

   


</DashboardShell>

  );

}
