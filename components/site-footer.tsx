import Link from 'next/link'
import { Logo } from '@/components/logo'


const footerLinks: Record<string,string> = {
  "جستجوی شغل": "/jobs",
  "ساخت رزومه": "/applicant/profile",
  "ثبت آگهی شغلی": "/company/jobs/new",
  "پنل کارفرما": "/company",
  "درباره ما": "/about",
  "تماس با ما": "/contact",
  "قوانین و مقررات": "/rules",
};


const columns = [
  {
    title: 'کارجویان',
    links: [
      'جستجوی شغل',
      'ساخت رزومه',
    ],
  },
  {
    title: 'کارفرمایان',
    links: [
      'ثبت آگهی شغلی',
      'پنل کارفرما',
    ],
  },
  {
    title: 'شهرکار',
    links: [
      'درباره ما',
      'تماس با ما',
      'قوانین و مقررات',
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
           <p className="text-sm leading-relaxed text-yellow-400 font-bold">
  اتصال هوشمند کارجویان و کارفرمایان ایران
  <br />
  ☆ سریع، هوشمند و قابل اعتماد ☆
</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-bold text-foreground">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                   <Link
  href={footerLinks[link] || "#"}
  className="text-sm text-muted-foreground transition-colors hover:text-gold"
>
  {link}
</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© ۱۴۰۳ شهرکار. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-4">
            <Link href="#" className="transition-colors hover:text-gold">
              حریم خصوصی
            </Link>
            <Link href="#" className="transition-colors hover:text-gold">
              قوانین
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
