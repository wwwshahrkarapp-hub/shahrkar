import Link from 'next/link'
import { MapPin, Wallet, Clock, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Job } from '@/lib/data'

export function JobCard({ job }: { job: Job }) {
  return (
   <article
  className="
    group
    flex
    flex-col
    rounded-2xl
    border
    border-border
    bg-card
    p-3
    transition-all
    hover:border-gold/50
    hover:-translate-y-1
    hover:shadow-xl
    hover:shadow-gold/10
  "
>
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-gold">
          <Building2 className="size-5" />
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

   <div className="mt-2 flex flex-wrap gap-1">
       {(job.tags || []).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

    <dl className="mt-2 grid grid-cols-1 gap-1 text-xs text-muted-foreground">
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

    <div className="mt-3 flex items-center justify-between border-t border-border pt-2">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {job.postedAt}
        </span>

        <Link href={`/jobs/${job.id}`}>
       <Button
  size="sm"
  className="rounded-xl bg-yellow-500 px-3 font-bold text-black shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:bg-yellow-400 hover:shadow-yellow-500/50"
>
  مشاهده و ارسال
</Button>
        </Link>
      </div>
    </article>
  )
}
