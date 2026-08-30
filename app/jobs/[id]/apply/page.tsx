"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
const [job, setJob] = useState<any>(null);

useEffect(() => {
  async function loadJob() {
    const res = await fetch(`/api/jobs/${id}`);
    const data = await res.json();

    setJob(data);
  }

  if (id) {
    loadJob();
  }
}, [id]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 const savedUser = localStorage.getItem("user");

if (!savedUser) {
  alert("لطفاً ابتدا ثبت‌نام کنید");
  router.push("/register");
  return;
}

const user = JSON.parse(savedUser);

if (!user?.uid) {
  alert("لطفاً ابتدا ثبت‌نام کنید");
  localStorage.removeItem("user");
  router.push("/register");
  return;
}

    if (!name || !phone) {
      alert("نام و شماره موبایل الزامی است.");
      return;
    }

    const res = await fetch("/api/applications/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify({
  uid: user.uid,
  jobId: id,
  jobTitle: job?.title || "",
  company: job?.company || "",
  location: job?.city || "",
  name,
  phone,
  email,
  message,
}),
    });

    if (!res.ok) {
      alert("خطا در ثبت درخواست");
      return;
    }

    alert("درخواست شما با موفقیت ثبت شد.");

    router.push("/jobs");
    router.refresh();
  };

  return (
   <main className="min-h-screen bg-background text-foreground p-6">
<div className="mx-auto max-w-2xl rounded-3xl border border-yellow-500/40 bg-card p-8 shadow-xl shadow-yellow-500/20">
  <h1 className="mb-6 text-center text-3xl font-extrabold text-yellow-400">
    ارسال درخواست استخدام
  </h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
w-full
rounded-lg
border
border-yellow-500/20
bg-zinc-800
p-3
text-white
outline-none
transition
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/30
"
          />

          <input
            type="text"
            placeholder="شماره موبایل"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
           className="
w-full
rounded-lg
border
border-yellow-500/20
bg-zinc-800
p-3
text-white
outline-none
transition
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/30
"
          />

          <input
            type="email"
            placeholder="ایمیل (اختیاری)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           className="
w-full
rounded-lg
border
border-yellow-500/20
bg-zinc-800
p-3
text-white
outline-none
transition
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/30
"
          />

          <textarea
            rows={6}
            placeholder="توضیحات"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
         className="
w-full
rounded-lg
border
border-yellow-500/20
bg-zinc-800
p-3
text-white
outline-none
transition
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/30
"
          />

         <div className="flex gap-3">

  <button

    type="submit"
className="
flex-1
rounded-2xl
border
border-emerald-500/40
bg-emerald-950/70
py-3
font-bold
text-emerald-300
shadow-lg
shadow-emerald-500/20
transition-all
hover:scale-105
hover:bg-emerald-900/80
"

  >
    📩 ارسال درخواست
  </button>


  <button
    type="button"
    onClick={() => router.back()}
className="
flex-1
rounded-2xl
border
border-red-500/40
bg-red-950/70
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
    ← بازگشت
  </button>

</div>

        </form>

      </div>
    </main>
  );
}
