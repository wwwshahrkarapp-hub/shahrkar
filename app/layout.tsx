import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'شهرکار',
  description:
    'شهرکار، پلتفرم حرفه‌ای کاریابی؛ هزاران فرصت شغلی از بهترین شرکت‌های ایران را پیدا کنید.',
  generator: 'v0.app',

}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#241d10',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="bg-background"
    >
      <body className="font-sans antialiased">
        {children}

        {process.env.NODE_ENV === 'production' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}
