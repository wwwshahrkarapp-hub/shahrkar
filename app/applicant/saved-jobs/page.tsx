"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/page-header";

export default function SavedJobsPage() {

  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  useEffect(() => {

    async function loadSavedJobs() {

      const savedUser = localStorage.getItem("user");

      if (!savedUser) return;

      const user = JSON.parse(savedUser);

      const res = await fetch(
        `/api/saved-jobs?uid=${user.uid}`
      );

      const data = await res.json();

      setSavedJobs(data);

    }

    loadSavedJobs();

  }, []);


  return (
    <main className="min-h-screen bg-black text-white p-6">
<PageHeader />
     <h1 className="text-xl font-bold mb-5">
  ⭐ شغل‌های ذخیره شده
</h1>


      {savedJobs.length === 0 ? (

        <p className="text-gray-400">
          هنوز شغلی ذخیره نکرده‌اید.
        </p>

      ) : (

        <div className="grid gap-5">

          {savedJobs.map((job) => (

          <div
  key={job.id}
  className="
rounded-3xl
border
border-gold/40
bg-card
p-4
shadow-lg
shadow-gold/10
"
>

             <h2 className="text-base font-bold">
                {job.title}
              </h2>

<p className="mt-2 text-sm text-muted-foreground">
  شرکت: {job.company}
</p>

<p className="mt-1 text-sm text-muted-foreground">
  شهر: {job.city}
</p>          


<div className="flex gap-2 mt-3">

  <Link
  href={`/jobs/${job.jobId}`}
 className="
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-8
py-3
font-bold
text-yellow-300
shadow-lg
shadow-yellow-500/20
transition-all
hover:scale-105
hover:bg-yellow-900/80
"
>
  باز کردن آگهی
</Link>


  <button
    type="button"
    onClick={async (e) => {

      e.preventDefault();

      const res = await fetch("/api/saved-jobs/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: job.id,
        }),
      });


      const data = await res.json();


      if (data.success) {
        window.location.reload();
      }

    }}
   className="
rounded-2xl
border
border-red-500/40
bg-red-950/70
px-8
py-3
font-bold
text-red-300
shadow-lg
shadow-red-500/20
transition-all
hover:scale-105
hover:bg-red-900/80
"
  >
    حذف
  </button>

</div>

</div>

))}

        </div>

      )}

    </main>
  );
}
