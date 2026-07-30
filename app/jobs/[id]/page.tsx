'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Building2, MapPin, Wallet, Clock } from 'lucide-react'
import { jobs } from '@/lib/data'
import { Button } from '@/components/ui/button'

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const job = jobs.find((j) => String(j.id) === id)

  if (!job) {
    notFound()
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/jobs"
        className="mb-6 inline-flex items-center gap-2 text-gold hover:underline"
      >
        <ArrowRight className="size-4" />
        بازگشت به فرصت‌های شغلی
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-start gap-4">
          <div className="grid size-14 place-items-center rounded-xl bg-secondary text-gold">
            <Building2 />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold">{job.title}</h1>

            <p className="mt-1 text-muted-foreground">
              {job.company}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">

          <div className="flex items-center gap-2">
            <MapPin className="size-4 text-gold" />
            {job.location}
          </div>

          <div className="flex items-center gap-2">
            <Wallet className="size-4 text-gold" />
            {job.salary}
          </div>

          <div className="flex items-center gap-2">
            <Clock className="size-4 text-gold" />
            {job.postedAt}
          </div>

        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold">
            توضیحات شغل
          </h2>

          <p className="leading-8 text-muted-foreground">
            {job.description ?? 'توضیحات این فرصت شغلی توسط کارفرما ثبت خواهد شد.'}
          </p>
        </div>

        <div className="mt-8 flex gap-3">

          <Button
            className="bg-gold text-gold-foreground hover:bg-gold/90"
            render={
              <Link href={`/register?role=applicant&job=${job.id}`}>
                ارسال درخواست
              </Link>
            }
          />

          <Button
            variant="outline"
            render={<Link href="/jobs">بازگشت</Link>}
          />

        </div>

      </div>
    </main>
  )
}
