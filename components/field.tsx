import { cn } from '@/lib/utils'

export function Field({
  label,
  id,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
    <label htmlFor={id} className="text-sm font-bold text-gray-200">
        {label}
      </label>
      <input
        id={id}
        className={cn(
         'h-12 w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 hover:border-yellow-500/40',
          className,
        )}
        {...props}
      />
    </div>
  )
}
