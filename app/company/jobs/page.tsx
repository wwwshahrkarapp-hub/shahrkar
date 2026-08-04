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
    fetch('/api/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))

    fetch('/api/applications')
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch(() => setApplications([]))
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
    <div className="p-8">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            آگهی‌های من
          </h1>

          <p className="mt-2 text-gray-400">
            مدیریت آگهی‌های ثبت‌شده
          </p>
        </div>

        <Link
          href="/company/jobs/new"
          className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black"
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
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
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

                    <div className="rounded-lg bg-zinc-800 px-4 py-2 text-sm">
                      <Users
                        size={16}
                        className="inline ml-2"
                      />
                      {requests} درخواست
                    </div>

                    <div className="rounded-lg bg-green-700 px-4 py-2 text-sm">
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
                    className="rounded-lg bg-zinc-800 p-3"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/company/jobs/edit/${job.id}`}
                    className="rounded-lg bg-blue-600 p-3"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => deleteJob(job.id)}
                    className="rounded-lg bg-red-600 p-3"
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
