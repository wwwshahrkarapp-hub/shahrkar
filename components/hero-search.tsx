'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSearch() {
  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          جستجوی هوشمند شغل
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          بهترین فرصت‌های شغلی را بر اساس مهارت، شهر و علاقه خود پیدا کنید.
        </p>

        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg">
          <Search className="h-5 w-5 text-muted-foreground" />

          <input
            type="text"
            placeholder="عنوان شغل، شرکت یا شهر..."
            className="flex-1 bg-transparent text-right outline-none"
          />

          <Button className="bg-gold text-gold-foreground hover:bg-gold/90">
            جستجو
          </Button>
        </div>
      </div>
    </section>
  )
}
