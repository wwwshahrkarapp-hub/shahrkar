"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import MobileFrame from "@/components/mobile-frame";
import { Briefcase, MapPin, Building2 } from "lucide-react";
export default function SavedJobsPage() {
const [jobs, setJobs] = useState<any[]>([]);

  async function loadSavedJobs() {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) return;

    const user = JSON.parse(savedUser);

    const res = await fetch(`/api/saved-jobs?uid=${user.uid}`);

    const data = await res.json();


    const uniqueJobs = data.filter(
      (job:any, index:number, self:any[]) =>
        index === self.findIndex(
          (j:any) => j.jobId === job.jobId
        )
    );


    setJobs(uniqueJobs);

  }


  useEffect(() => {
    loadSavedJobs();
  }, []);


  async function deleteJob(id:string) {

    await fetch("/api/saved-jobs/delete", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        id,
      }),
    });


    loadSavedJobs();

  }



  return (
  <>
    <SiteHeader />

    <MobileFrame>

<div>


        <h1 className="
text-2xl
font-bold
text-[#e5b84b]
mb-10
text-right
">
  ⭐ مشاغل ذخیره‌شده
</h1>

<p className="
text-zinc-400
text-sm
mb-10
text-right
">
  فرصت‌های شغلی مورد علاقه شما در اینجا ذخیره شده‌اند
</p>

        {jobs.length === 0 ? (

          <div className="
          rounded-2xl
          bg-[#111111]
          border border-[#332714]
          p-6
          text-center
          text-zinc-400
          ">
            هنوز شغلی ذخیره نکرده‌اید
          </div>


        ) : (


          <div className="grid gap-5">


            {jobs.map((job)=>(


          <div
key={job.id}
className="
w-full
rounded-[28px]
bg-[#111111]
border
border-[#e5b84b]/30
p-6
shadow-[0_10px_40px_rgba(0,0,0,0.45)]
text-right
"
>


             <div className="flex items-center gap-3 mb-5">

  <div className="
  w-11
  h-11
rounded-2xl
  bg-[#252015]
  flex
  items-center
  justify-center
  ">
    <Briefcase className="text-[#e5b84b]" size={22} />
  </div>


  <h2 className="
  text-xl
  font-bold
  text-white
  ">
    {job.title}
  </h2>

</div>



         <div className="space-y-3 text-zinc-400 text-sm">

  <div className="flex items-center gap-2">
    <Building2
      size={18}
      className="text-[#e5b84b]"
    />
    <span>
      شرکت: {job.company}
    </span>
  </div>


  <div className="flex items-center gap-2">
    <MapPin
      size={18}
      className="text-[#e5b84b]"
    />
    <span>
      شهر: {job.city}
    </span>
  </div>

</div>



                <div className="flex gap-3 mt-6">


                  <Link
                  href={`/jobs/${job.jobId}`}
                  className="
rounded-xl
bg-[#e5b84b]
text-black
px-6
py-2.5
font-bold
shadow-[0_5px_15px_rgba(229,184,75,0.25)]
transition-all
hover:scale-105
"
                  
                 
                  
                  
                  
                  
                  
                  >
                    مشاهده
                  </Link>



                  <button
                  onClick={()=>deleteJob(job.id)}
                  className="
rounded-xl
bg-red-900
px-5
py-2.5
font-bold
transition-all
hover:bg-red-800
"
                  >
                    حذف
                  </button>


                </div>


              </div>


            ))}


          </div>


        )}


      </div>

    </MobileFrame>

  </>
  );
}
