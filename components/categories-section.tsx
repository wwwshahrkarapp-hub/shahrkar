import { categories } from '@/lib/data'

export function CategoriesSection() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-extrabold text-foreground sm:text-3xl">
          جستجو بر اساس دسته‌بندی شغلی
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-muted-foreground">
          از میان صدها دسته‌بندی تخصصی، حوزه مورد علاقه خود را انتخاب کنید.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <a
              key={cat.slug}
              href="#jobs"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:border-gold/50 hover:bg-secondary"
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                <Icon className="size-6" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-foreground">
                  {cat.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {cat.count.toLocaleString('fa-IR')} فرصت شغلی
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
