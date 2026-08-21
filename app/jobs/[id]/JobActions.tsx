"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SaveButton from "./SaveButton";

export default function JobActions({
  job,
}: {
  job: any;
}) {
const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {

    const savedUser = localStorage.getItem("user");

    if (savedUser) {

      const user = JSON.parse(savedUser);

      setRole(user.role || "");

    }

  }, []);


  return (
   <div className="mt-8 flex flex-wrap gap-3">

      {role !== "company" && (

        <Link
          href={`/jobs/${job.id}/apply`}
      className="
rounded-2xl
border
border-emerald-500/40
bg-emerald-950/70
px-8
py-3
font-bold
text-emerald-300
shadow-lg
shadow-emerald-500/20
transition-all
hover:scale-105
hover:bg-emerald-900/80
"
        >
          📩 ارسال درخواست استخدام
        </Link>

      )}


      <SaveButton
        jobId={job.id}
        title={job.title}
        company={job.company}
        city={job.city}
      />


    <button
  onClick={() => router.back()}
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
  ← بازگشت
</button>

    </div>
  );
}
