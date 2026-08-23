"use client";

import { useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { Logo } from "@/components/logo";

export default function CompanySupportPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  async function submitTicket() {
    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("لطفاً ابتدا وارد حساب شوید.");
        return;
      }


      const token = await user.getIdToken();


      const res = await fetch("/api/support/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject,
          message,
        }),
      });


      const data = await res.json();


      if (!res.ok || !data.success) {
        alert(data.error || "خطا در ثبت درخواست");
        return;
      }


      alert(
        `درخواست شما ثبت شد.\n\nشماره پیگیری: ${data.ticketId}`
      );


      setSubject("");
      setMessage("");


    } catch (error) {
      console.error("SUPPORT ERROR:", error);
      alert("خطا در ثبت درخواست");
    } finally {
      setLoading(false);
    }
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
  <Logo />

  <div>
    <p className="text-xs text-gray-400">
      پشتیبانی کارفرما
    </p>
  </div>
</div>

</div>


      <div className="mx-auto max-w-2xl space-y-4">

<div className="rounded-2xl border border-yellow-500/20 bg-zinc-950/90 p-5 shadow-lg shadow-yellow-500/10">

          <h2 className="mb-4 font-bold text-yellow-300">
            💬 ثبت درخواست جدید
          </h2>


          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}

className="mb-4 w-full rounded-xl border border-zinc-700 bg-black p-3 text-white shadow-lg shadow-yellow-500/5"

          >
            <option value="">انتخاب موضوع</option>
            <option>مشکل حساب کاربری</option>
            <option>مشکل پرداخت</option>
            <option>مشکل آگهی</option>
            <option>مشکل فنی</option>
          </select>


          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="توضیحات مشکل خود را بنویسید..."

className="h-32 w-full rounded-xl border border-zinc-700 bg-black p-3 text-white shadow-lg shadow-yellow-500/5"
          />


          <button
            onClick={submitTicket}
            disabled={loading}
className="
mt-4
w-full
rounded-2xl
border
border-green-500/40
bg-green-950/70
py-3
font-bold
text-green-300
shadow-lg
shadow-green-500/20
transition-all
hover:scale-105
hover:bg-green-900/80
disabled:opacity-50
"

          >
            {loading ? "در حال ارسال..." : "ارسال درخواست"}
          </button>

        </div>


<Link href="/company/settings/support/tickets">
  <div className="rounded-2xl border border-zinc-700 bg-zinc-950/80 p-5 shadow-lg shadow-yellow-500/10 transition-all hover:scale-105 hover:bg-zinc-900">

    <h2 className="font-bold text-yellow-300">
      📋 درخواست‌های من
    </h2>

    <p className="mt-2 text-sm text-gray-400">
      پیگیری وضعیت درخواست‌های ثبت شده
    </p>

  </div>
</Link>



    <Link href="/company/settings">

  <div
    className="
    mt-6
    rounded-2xl
    border
    border-red-500/40
    bg-red-950/70
    px-8
    py-3
    text-center
    font-bold
    text-red-300
    shadow-lg
    shadow-red-500/20
    transition-all
    hover:scale-105
    hover:bg-red-900/80
    "
  >
    ← بازگشت به تنظیمات
  </div>

</Link>


      </div>

    </main>
  );
}
