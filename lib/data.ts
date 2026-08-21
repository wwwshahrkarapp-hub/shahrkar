import {
  Code2,
  Megaphone,
  PenTool,
  BarChart3,
  Headset,
  Briefcase,
  Stethoscope,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export type Category = {
  slug: string
  title: string
  count: number
  icon: LucideIcon
}

export const categories: Category[] = [
  { slug: 'simple-worker', title: 'کارگر ساده', count: 980, icon: Briefcase },

  { slug: 'it', title: 'فناوری اطلاعات و نرم‌افزار', count: 1240, icon: Code2 },
  { slug: 'marketing', title: 'بازاریابی و فروش', count: 860, icon: Megaphone },
  { slug: 'design', title: 'طراحی و هنر', count: 520, icon: PenTool },
{
  slug: 'mixed',
  title: 'مختلط',
  count: 0,
  icon: Briefcase
},
]

export type Job = {
  id: string
  title: string
  company: string
  city?: string
  location?: string
  type?: string
  salary: string
  description?: string
  tags?: string[]
  postedAt?: string
  remote?: boolean
  category: string
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'برنامه‌نویس ارشد فرانت‌اند (React)',
    company: 'دیجی‌پی',
    location: 'تهران',
    type: 'تمام‌وقت',
    salary: '۴۵ تا ۶۵ میلیون تومان',
    tags: ['React', 'TypeScript', 'Next.js'],
    postedAt: 'امروز',
    remote: true,
    category: 'it',
  },
  {
    id: '2',
    title: 'کارشناس دیجیتال مارکتینگ',
    company: 'اسنپ',
    location: 'تهران',
    type: 'تمام‌وقت',
    salary: '۲۵ تا ۳۵ میلیون تومان',
    tags: ['SEO', 'گوگل ادز', 'محتوا'],
    postedAt: 'دیروز',
    remote: false,
    category: 'marketing',
  },
  {
    id: '3',
    title: 'طراح تجربه کاربری (UX/UI)',
    company: 'تپسی',
    location: 'اصفهان',
    type: 'تمام‌وقت',
    salary: '۳۰ تا ۴۵ میلیون تومان',
    tags: ['Figma', 'Design System', 'پژوهش'],
    postedAt: '۲ روز پیش',
    remote: true,
    category: 'design',
  },
  {
    id: '4',
    title: 'حسابدار ارشد',
    company: 'بانک آینده',
    location: 'مشهد',
    type: 'تمام‌وقت',
    salary: '۲۸ تا ۳۸ میلیون تومان',
    tags: ['هلو', 'اکسل', 'مالیات'],
    postedAt: '۳ روز پیش',
    remote: false,
    category: 'finance',
  },
  {
    id: '5',
    title: 'مهندس داده (Data Engineer)',
    company: 'کافه‌بازار',
    location: 'تهران',
    type: 'تمام‌وقت',
    salary: '۵۰ تا ۷۰ میلیون تومان',
    tags: ['Python', 'Spark', 'SQL'],
    postedAt: '۴ روز پیش',
    remote: true,
    category: 'data',
  },
  {
    id: '6',
    title: 'کارشناس پشتیبانی مشتریان',
    company: 'علی‌بابا',
    location: 'شیراز',
    type: 'پاره‌وقت',
    salary: '۱۲ تا ۱۸ میلیون تومان',
    tags: ['ارتباطات', 'CRM', 'تلفنی'],
    postedAt: '۵ روز پیش',
    remote: false,
    category: 'support',
  },
  {
    id: '7',
    title: 'مدیر محصول (Product Manager)',
    company: 'دیوار',
    location: 'تهران',
    type: 'تمام‌وقت',
    salary: '۶۰ تا ۹۰ میلیون تومان',
    tags: ['Agile', 'استراتژی', 'تحلیل'],
    postedAt: '۶ روز پیش',
    remote: true,
    category: 'management',
  },
  {
    id: '8',
    title: 'برنامه‌نویس بک‌اند (Node.js)',
    company: 'فیلیمو',
    location: 'کرج',
    type: 'تمام‌وقت',
    salary: '۴۰ تا ۶۰ میلیون تومان',
    tags: ['Node.js', 'PostgreSQL', 'Docker'],
    postedAt: '۱ هفته پیش',
    remote: true,
    category: 'it',
  },
]

export const cities = [
  'همه شهرها',
  'تهران',
  'اصفهان',
  'مشهد',
  'شیراز',
  'تبریز',
  'کرج',
  'دورکاری',
]

export const stats = [
  { value: '۱۲٬۴۰۰+', label: 'فرصت شغلی فعال' },
  { value: '۳٬۸۰۰+', label: 'شرکت معتبر' },
  { value: '۹۵۰٬۰۰۰+', label: 'کارجوی ثبت‌نام‌شده' },
  { value: '۹۸٪', label: 'رضایت کاربران' },
]
