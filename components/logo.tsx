import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="grid size-9 place-items-center rounded-xl bg-gold text-gold-foreground shadow-lg shadow-gold/20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          aria-hidden="true"
        >
          <path
            d="M4 20V9l8-5 8 5v11h-5v-6H9v6H4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-foreground">
          شهر<span className="text-gold">کار</span>
        </span>
        <span className="text-[10px] text-muted-foreground">جستجوی هوشمند شغل</span>
      </span>
    </span>
  )
}
