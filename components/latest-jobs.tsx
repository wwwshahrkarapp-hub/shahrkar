import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { JobCard } from '@/components/job-card'
import { jobs } from '@/lib/data'

export function LatestJobs() {
  return (
    <section id="jobs" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
              جدیدترین فرصت‌های شغلی
            </h2>
            <p className="mt-2 text-muted-foreground">
              تازه‌ترین آگهی‌های استخدام از شرکت‌های برتر
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            render={
              <Link href="#jobs">
                مشاهده همه
                <ArrowLeft className="size-4" />
              </Link>
            }
          />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
