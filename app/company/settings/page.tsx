"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function CompanySettingsPage() {

  const router = useRouter();
const [unreadSupport, setUnreadSupport] = useState(0);


useEffect(() => {
  async function loadSupportNotifications() {

    const user = auth.currentUser;

    if (!user) return;


    const res = await fetch("/api/company/support/unread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
      }),
    });


    const data = await res.json();


    if (data.success) {
      setUnreadSupport(data.count);
    }

  }


  loadSupportNotifications();

}, []);



 function logout() {
  const confirmLogout = confirm("آیا مطمئن هستید می‌خواهید از حساب خارج شوید؟");

  if (!confirmLogout) return;

  localStorage.removeItem("user");
  router.push("/login");
}


  return (
   



<main className="min-h-screen bg-black p-6 text-white">

<div
className="
mb-5
flex
items-center
justify-between
rounded-2xl
border
border-yellow-500/30
bg-zinc-950/90
px-5
py-3
shadow-lg
shadow-yellow-500/10
"
>

<div className="flex items-center gap-3">

<div
className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
text-2xl
shadow-lg
shadow-yellow-500/20
"
>
⭐
</div>

<div>

<h2 className="text-lg font-extrabold text-yellow-300">
شهرکار
</h2>

<p className="text-xs text-gray-400">
پنل کارفرما
</p>

</div>

</div>

</div>




      <div className="max-w-2xl mx-auto">

       <h1 className="text-xl font-extrabold text-yellow-300 mb-5">
تنظیمات حساب کارفرما
</h1>


<Link href="/company/account">

  <div
    className="
    rounded-2xl
    border
    border-zinc-700
    bg-zinc-950/80
    px-6
    py-5
    font-bold
    text-gray-200
    shadow-lg
    shadow-yellow-500/10
    transition-all
    hover:scale-105
    hover:bg-zinc-900
    cursor-pointer
    "
  >

    👤 حساب کاربری

    <p className="mt-2 text-sm text-gray-400">
      مدیریت اطلاعات ورود و حساب مدیر
    </p>

  </div>

</Link>


  <div
    className="
    rounded-2xl
    border
    border-yellow-500/40
    bg-yellow-950/70
    px-8
    py-5
    font-bold
    text-yellow-300
    shadow-lg
    shadow-yellow-500/20
    transition-all
    hover:scale-105
    hover:bg-yellow-900/80
    "
  >
    💳 مالی و اشتراک

    <p className="mt-2 text-sm text-gray-400">
      مدیریت پرداخت‌ها و اشتراک
    </p>

  </div>



  <Link href="/company/settings/security">
    <div
      className="
      rounded-2xl
      border
      border-zinc-700
      bg-zinc-950/80
      px-6
      py-5
      font-bold
      text-gray-200
      shadow-lg
      shadow-yellow-500/10
      transition-all
      hover:scale-105
      hover:bg-zinc-900
      cursor-pointer
      "
    >
      🔐 امنیت

      <p className="mt-2 text-sm text-gray-400">
        رمز عبور و امنیت حساب
      </p>

    </div>
  </Link>



<Link href="/company/settings/support">
  <div
    className="
    rounded-2xl
    border
    border-zinc-700
    bg-zinc-950/80
    px-6
    py-5
    font-bold
    text-gray-200
    shadow-lg
    shadow-yellow-500/10
    transition-all
    hover:scale-105
    hover:bg-zinc-900
    cursor-pointer
    "
  >

<div className="flex items-center justify-between">

  <span>
    🆘 پشتیبانی
  </span>


  {unreadSupport > 0 && (
    <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
      {unreadSupport} پاسخ جدید
    </span>
  )}

</div>


    <p className="mt-2 text-sm text-gray-400">
      ارتباط با پشتیبانی شهرکار
    </p>

  </div>
</Link>



</div>       



        <div className="mt-8 flex justify-end">

<button
  onClick={logout}


          className="
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

    </main>
  );
}
