"use client";

import { useEffect, useState } from "react";

export function SiteStats(){

  const [stats,setStats] = useState({
    jobs:0,
    companies:0,
    applicants:0,
    applications:0
  });


  useEffect(()=>{

    fetch("/api/stats")
      .then(res=>res.json())
      .then(data=>setStats(data));

  },[]);


  const items = [
    {
      value: stats.jobs,
      label:"فرصت شغلی فعال"
    },
    {
      value: stats.companies,
      label:"شرکت ثبت‌شده"
    },
    {
      value: stats.applicants,
      label:"کارجوی ثبت‌نام‌شده"
    },
    {
      value: stats.applications,
      label:"درخواست استخدام"
    }
  ];


return (

<section className="border-y border-border bg-card/40">

<div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4">

{items.map((item)=>(
<div
key={item.label}
className="text-center"
>

<div className="text-3xl font-extrabold text-gold">
{(item.value ?? 0).toLocaleString("fa-IR")}+
</div>

<p className="mt-2 text-sm text-muted-foreground">
{item.label}
</p>

</div>
))}

</div>

</section>

)

}
