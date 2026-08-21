"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewJobPage() {
  const router = useRouter();

 const [form, setForm] = useState({
 title: "",
 company: "",
 city: "",
 salary: "",
 type: "",
 description: "",
 category: "",
});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
const savedUser = localStorage.getItem("user");

if (!savedUser) {
  alert("کاربر پیدا نشد");
  return;
}

const user = JSON.parse(savedUser);

console.log("FORM DATA:", form);
console.log("USER UID:", user.uid);

    const res = await fetch("/api/jobs", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  ...form,
  ownerUid: user.uid,
}),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "خطا در ثبت آگهی");
      return;
    }

    alert("آگهی با موفقیت ثبت شد.");

window.location.href = "/company/jobs";
  };

  return (
   
<main className="min-h-screen bg-black text-white p-6">

  <div className="max-w-3xl mx-auto">


<div
  className="
  h-14
  w-14
  rounded-full
  bg-yellow-500
  flex
  items-center
  justify-center
  text-black
  text-xl
  shadow-lg
  "
>
  🏠
</div>



    <div className="
      flex
      flex-col
      items-center
      justify-center
      mb-8
      gap-3
    ">

      <div className="
        text-4xl
        font-extrabold
        text-yellow-400
      ">
        شهرکار
      </div>

      <h1 className="text-3xl font-bold">
        ثبت آگهی جدید
      </h1>

      <p className="text-sm text-zinc-400">
        فرصت شغلی جدید خود را در شهرکار ثبت کنید
      </p>

    </div>

<form onSubmit={handleSubmit} className="space-y-4">

  <input
            name="title"
            placeholder="عنوان شغل"     

          value={form.title}
          onChange={handleChange}
         className="
w-full
rounded-xl
border
border-yellow-500/30
bg-zinc-950
p-3
text-white
outline-none
transition-all
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
        />

        <input
          name="company"
          placeholder="نام شرکت"
          value={form.company}
          onChange={handleChange}
         className="
w-full
rounded-xl
border
border-yellow-500/30
bg-zinc-950
p-3
text-white
outline-none
transition-all
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
        />

        <input
          name="city"
          placeholder="شهر"
          value={form.city}
          onChange={handleChange}
        className="
w-full
rounded-xl
border
border-yellow-500/30
bg-zinc-950
p-3
text-white
outline-none
transition-all
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
        />



<div
  className="
  rounded-2xl
  border
  border-emerald-500/30
  bg-emerald-950/40
  p-4
  shadow-lg
  shadow-emerald-500/10
  "
>

  <h3 className="
    font-bold
    text-emerald-300
    mb-2
  ">
    🤖 دسته‌بندی خودکار با هوش مصنوعی
  </h3>

  <p className="
    text-sm
    text-emerald-100/70
  ">
    شهرکار با تحلیل عنوان و توضیحات شغل،
    بهترین دسته‌بندی را برای آگهی شما پیشنهاد می‌دهد.
  </p>

</div>





        <textarea
          name="description"
          placeholder="توضیحات شغل"
          value={form.description}
          onChange={handleChange}
          rows={6}
         className="
w-full
rounded-xl
border
border-yellow-500/30
bg-zinc-950
p-3
text-white
outline-none
transition-all
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
        />

      <button
  type="submit"
  className="
  rounded-2xl
  border
  border-emerald-500/40
  bg-emerald-950/70
  px-8
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
  ثبت آگهی
</button>

              </form>

      </div>

    </main>
  );
}
