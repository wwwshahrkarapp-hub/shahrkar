'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { JobCard } from '@/components/job-card'
import { Button } from '@/components/ui/button'
import { jobs } from '@/lib/data'

export default function JobsPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">
            همه فرصت‌های شغلی
          </h1>

          <p className="mt-2 text-muted-foreground">
            جدیدترین آگهی‌های استخدام شهرکار
          </p>
        </div>

        <Button
          variant="outline"
          render={
            <Link href="/">
              <ArrowRight className="ml-2 h-4 w-4" />
              بازگشت
            </Link>
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </main>
  )
}
