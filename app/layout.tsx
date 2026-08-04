import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'

const vazir = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazir',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'شهرکار | جستجوی هوشمند فرصت‌های شغلی',
  description:
    'شهرکار، پلتفرم حرفه‌ای کاریابی؛ هزاران فرصت شغلی از بهترین شرکت‌های ایران را جستجو کنید.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#080808',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-sans antialiased">
        {children}

        {process.env.NODE_ENV === 'production' && (
          <Analytics />
        )}

      </body>
    </html>
  )
}
