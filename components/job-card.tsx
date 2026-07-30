import Link from 'next/link'
import { MapPin, Wallet, Clock, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Job } from '@/lib/data'

export function JobCard({ job }: { job: Job }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5">
      <div className="flex items-start gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-secondary text-gold">
          <Building2 className="size-6" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-bold text-foreground transition-colors group-hover:text-gold">
            {job.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{job.company}</p>
        </div>

        {job.remote && (
          <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold">
            دورکاری
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <dl className="mt-4 grid grid-cols-1 gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-gold/70" />
          <span>
            {job.location} · {job.type}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Wallet className="size-4 text-gold/70" />
          <span>{job.salary}</span>
        </div>
      </dl>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {job.postedAt}
        </span>

        <Link href={`/jobs/${job.id}`}>
          <Button
            size="sm"
            className="bg-gold text-gold-foreground hover:bg-gold/90"
          >
            مشاهده و ارسال
          </Button>
        </Link>
      </div>
    </article>
  )
}
