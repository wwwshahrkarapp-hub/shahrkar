'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function JobDetailsPage() {
  const { id } = useParams()

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">
        جزئیات آگهی
      </h1>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-4">
        <div>
          <p className="text-gray-400">شناسه آگهی</p>
          <p className="text-xl font-bold text-white">{id}</p>
        </div>

        <div>
          <p className="text-gray-400">عنوان</p>
          <p className="text-white">برنامه‌نویس فرانت‌اند</p>
        </div>

        <div>
          <p className="text-gray-400">وضعیت</p>
          <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-yellow-400">
            فعال
          </span>
        </div>

        <div>
          <p className="text-gray-400">تعداد درخواست‌ها</p>
          <p className="text-white">42</p>
        </div>

        <Link
          href="/company/jobs"
          className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black"
        >
          بازگشت
        </Link>
      </div>
    </div>
  )
}
