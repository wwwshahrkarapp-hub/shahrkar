'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditJobPage() {
  const params = useParams()
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [salary, setSalary] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetch(`/api/jobs`)
      .then((res) => res.json())
      .then((jobs) => {
        const job = jobs.find(
          (j: any) => String(j.id) === String(params.id)
        )

        if (!job) return

        setTitle(job.title || '')
        setCompany(job.company || '')
        setCity(job.city || '')
        setSalary(job.salary || '')
        setDescription(job.description || '')
      })
  }, [params.id])

  const handleSave = async () => {
    const res = await fetch(`/api/jobs/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        company,
        city,
        salary,
        description,
      }),
    })

    if (!res.ok) {
      alert('ویرایش انجام نشد')
      return
    }

    alert('آگهی با موفقیت ویرایش شد')
    router.push('/company/jobs')
    router.refresh()
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        ویرایش آگهی
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="عنوان شغل"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
        />

        <input
          type="text"
          placeholder="نام شرکت"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
        />

        <input
          type="text"
          placeholder="شهر"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
        />

        <input
          type="text"
          placeholder="حقوق"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
        />

        <textarea
          placeholder="توضیحات"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="h-40 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
        />

        <button
          type="button"
          onClick={handleSave}
          className="rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
        >
          ذخیره تغییرات
        </button>
      </div>
    </div>
  )
}
