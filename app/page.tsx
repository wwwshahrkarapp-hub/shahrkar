import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HeroSearch } from '@/components/hero-search'
import { CategoriesSection } from '@/components/categories-section'
import { LatestJobs } from '@/components/latest-jobs'
import { CtaBanner } from '@/components/cta-banner'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSearch />
        <CategoriesSection />
        <LatestJobs />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  )
}
