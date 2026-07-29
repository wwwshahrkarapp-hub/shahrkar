import { cn } from '@/lib/utils'

export function Field({
  label,
  id,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          'h-11 w-full rounded-xl border border-input bg-secondary px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30',
          className,
        )}
        {...props}
      />
    </div>
  )
}
