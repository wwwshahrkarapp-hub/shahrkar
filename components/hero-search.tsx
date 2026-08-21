'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function HeroSearch() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  function handleSearch() {
    router.push(`/jobs?search=${encodeURIComponent(search)}`)
  }

  return (
    <section className="relative overflow-hidden bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          جستجوی هوشمند شغل
        </h1>

 <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base leading-8 text-muted-foreground">
  شهرکار پلی است میان استعدادها و بهترین فرصت‌های شغلی ایران
  <br />
  <span className="text-yellow-400">
    ☆ سریع، هوشمند و قابل اعتماد ☆
  </span>
</p>

        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg">

          <Search className="h-5 w-5 text-muted-foreground" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="عنوان شغل، شرکت یا شهر..."
            className="flex-1 bg-transparent text-right outline-none"
          />

          <Button
            onClick={handleSearch}
           className="rounded-xl bg-yellow-500 px-6 font-bold text-black shadow-lg shadow-yellow-500/30 transition-all hover:scale-105 hover:bg-yellow-400 hover:shadow-yellow-500/50"
          >
            جستجو
          </Button>

        </div>

      </div>
    </section>
  )
}
