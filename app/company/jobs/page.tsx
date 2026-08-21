'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, Eye, Pencil, Trash2, Briefcase, Users } from 'lucide-react'

type Job = {
  id: number
  title: string
  company: string
  city: string
  salary: string
  description: string
}

type Application = {
  id: number
  jobId: string
}

export default function CompanyJobsPage() {
  const router = useRouter()

  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])

   useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if (!savedUser) return;

  const user = JSON.parse(savedUser);


  fetch('/api/jobs')
    .then((res) => res.json())
    .then((data) => {

      const myJobs = data.filter(
        (job: any) => job.ownerUid === user.uid
      );

      setJobs(myJobs);

    });


  fetch('/api/applications')
    .then((res) => res.json())
    .then((data) => setApplications(data))
    .catch(() => setApplications([]));


}, [])

  const deleteJob = async (id: number) => {
    const ok = confirm('آگهی حذف شود؟')

    if (!ok) return

    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      alert('حذف انجام نشد')
      return
    }

    setJobs((prev) => prev.filter((job) => job.id !== id))
    router.refresh()
  }

  return (
   <div className="min-h-screen bg-black p-6 text-white">


<div
  className="
  mb-8
  flex
  items-center
  justify-between
  rounded-2xl
  border
  border-yellow-500/30
  bg-zinc-950/80
  px-5
  py-4
  shadow-lg
  shadow-yellow-500/10
  "
>


<div className="flex items-center gap-3">

  <div
    className="
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-2xl
    border
    border-yellow-500/40
    bg-yellow-950/70
    text-2xl
    shadow-lg
    shadow-yellow-500/20
    "
  >
    ⭐
  </div>


  <div>

    <h2 className="text-xl font-extrabold text-yellow-300">
      شهرکار
    </h2>

    <p className="text-xs text-gray-400">
      پنل مدیریت کارفرما
    </p>

  </div>

</div>



<div
 className="
 text-sm
 font-bold
 text-gray-300
 "
>

</div>


</div>




      <div className="mb-8 flex items-center justify-between">
        <div>
       <h1 className="text-2xl font-bold text-white">
            آگهی‌های من 
          </h1>

          <p className="mt-2 text-gray-400">
            مدیریت آگهی‌های ثبت‌شده
          </p>
        </div>

        <Link
          href="/company/jobs/new"

className="
flex
items-center
gap-2
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-6
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
          <Plus size={18} />
          ثبت آگهی جدید
        </Link>
      </div>

      <div className="space-y-4">

        {jobs.map((job) => {

          const requests = applications.filter(
            (item) => item.jobId === String(job.id)
          ).length

          return (

            <div
              key={job.id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold text-white">
                    {job.title}
                  </h2>

                  <p className="mt-2 text-gray-400">
                    {job.company} • {job.city}
                  </p>

                  <p className="mt-2 text-yellow-400">
                    {job.salary}
                  </p>


<div className="mt-4 flex flex-wrap gap-3">

  <div
    className="
    rounded-xl
    border
    border-zinc-700
    bg-zinc-900
    px-3
    py-2
    text-sm
    "
  >
    <Users
      size={16}
      className="inline ml-2"
    />
    {requests} درخواست
  </div>


  <div
    className="
    rounded-2xl
    border
    border-green-500/40
    bg-green-950/70
    px-3
    py-2
    text-sm
    font-bold
    text-green-300
    shadow-lg
    shadow-green-500/20
    transition-all
    hover:scale-105
    hover:bg-green-900/80
    "
  >
    <Briefcase
      size={16}
      className="inline ml-2"
    />
    فعال
  </div>

</div>


</div>


<div className="flex gap-3">


  <Link
    href={`/jobs/${job.id}`}
    className="
    rounded-2xl
    border
    border-blue-500/40
    bg-blue-950/70
    p-3
    font-bold
    text-blue-300
    shadow-lg
    shadow-blue-500/20
    transition-all
    hover:scale-105
    hover:bg-blue-900/80
    "
  >
    <Eye size={18} />
  </Link>


  <Link
    href={`/company/jobs/edit/${job.id}`}
    className="
    rounded-2xl
    border
    border-yellow-500/40
    bg-yellow-950/70
    p-3
    font-bold
    text-yellow-300
    shadow-lg
    shadow-yellow-500/20
    transition-all
    hover:scale-105
    hover:bg-yellow-900/80
    "
  >
    <Pencil size={18} />
  </Link>


  <button
    type="button"
    onClick={() => deleteJob(job.id)}
    className="
    rounded-2xl
    border
    border-red-500/40
    bg-red-950/70
    p-3
    font-bold
    text-red-300
    shadow-lg
    shadow-red-500/20
    transition-all
    hover:scale-105
    hover:bg-red-900/80
    "
  >
    <Trash2 size={18} />
  </button>


</div>


              </div>

            </div>

          )
        })}

        {jobs.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-700 p-8 text-center text-gray-400">
            هنوز هیچ آگهی ثبت نشده است.
          </div>
        )}

      </div>

    </div>
  )
}

