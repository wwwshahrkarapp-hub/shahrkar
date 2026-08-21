"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";


export function LatestJobs() {

  const [jobs,setJobs] = useState<any[]>([]);


  useEffect(()=>{

    async function loadJobs(){

      const res = await fetch("/api/jobs");

     const data = await res.json();

if (Array.isArray(data)) {
  setJobs(data);
} else {
  setJobs([]);

}
    }


    loadJobs();

  },[]);



  return (
    <section id="jobs" className="border-t border-border bg-card/40">

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

         <div className="text-center w-full">
  <h2 className="text-3xl font-bold">
    جدیدترین فرصت‌های شغلی
  </h2>

  <p className="mt-3 text-gray-400">
    تازه‌ترین آگهی‌های استخدام از شرکت‌های برتر
  </p>
</div>


        <Button
  variant="outline"
  size="lg"
  className="gap-2 border-yellow-500 bg-yellow-500 text-black hover:bg-yellow-400"
  render={
    <Link href="/jobs">
      مشاهده همه
      <ArrowLeft className="size-4" />
    </Link>
  }
/>

        </div>


        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


        {jobs.map((job)=>(

          <JobCard
            key={job.id}
            job={{
              id:String(job.id),
              title:job.title,
              company:job.company,
              location:job.city,
              type: job.type || "نامشخص",
              salary:job.salary,
              tags:[],
              postedAt: job.createdAt
                ? new Date(job.createdAt).toLocaleDateString("fa-IR")
                : "",
city: job.city || "",
category: job.category || "",
              remote:false,
            }}
          />

        ))}


        </div>

      </div>

    </section>
  );

}
