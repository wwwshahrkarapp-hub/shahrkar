"use client";



import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/page-header";
export default function SettingsPage() {

  const router = useRouter();


  function logout() {
    localStorage.removeItem("user");
    router.push("/login");
  }


  return (
    <main className="min-h-screen bg-black text-white p-6">

  <PageHeader />

  <div className="max-w-2xl mx-auto">

      <h1 className="text-xl font-bold mb-6">
          تنظیمات حساب کارجو
        </h1>



<div className="space-y-4">


  <div
  className="
rounded-2xl
border
border-yellow-500/30
bg-zinc-950
p-5
shadow-[0_0_25px_rgba(234,179,8,0.15)]
"
  >

    <h2 className="text-xl font-bold">
      👤 ویرایش پروفایل
    </h2>

    <p className="mt-2 text-gray-400">
      مشاهده و ویرایش اطلاعات شخصی
    </p>


    <Link
      href="/applicant/profile"
      className="
      mt-4
      inline-block
      rounded-lg
      border
      border-blue-500/40
      bg-blue-950/70
      px-5
      py-2
      font-bold
      text-blue-300
      shadow-lg
      shadow-blue-500/20
      transition-all
      hover:scale-105
      hover:bg-blue-900/80
      "
    >
      ویرایش پروفایل
    </Link>


  </div>


          <div
            className="
          rounded-3xl
border
border-yellow-500/20
bg-zinc-950
p-4
shadow-lg
shadow-yellow-500/10
            "
          >
         <h2 className="text-xl font-bold">
  🔒 مدیریت ورود
</h2>

<p className="mt-2 text-gray-400">
  مدیریت شماره موبایل و ورود به حساب کاربری
</p>



<Link
href="/applicant/settings/login"
className="
inline-block
mt-4
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-5
py-2
font-bold
text-yellow-300
shadow-lg
shadow-yellow-500/20
transition-all
hover:scale-105
hover:bg-yellow-900/80
"
>
مدیریت ورود
</Link>



          </div>



          <button
            onClick={logout}
         className="
w-full
rounded-2xl
border
border-red-500/40
bg-red-950/70
px-8
py-3
font-bold
text-red-300
shadow-lg
shadow-red-500/20
transition-all
hover:scale-105
hover:bg-red-900/80
"
          >
            خروج از حساب
          </button>


        </div>

      </div>

    </main>
  );
}
