"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    company: "",
    city: "",
    salary: "",
    description: "",
  });

  useEffect(() => {

  const savedUser = localStorage.getItem("user");

  if (!savedUser) return;

  const user = JSON.parse(savedUser);


  fetch("/api/jobs")
    .then((res) => res.json())
    .then((jobs) => {

      const job = jobs.find(
        (j: any) =>
          String(j.id) === String(id) &&
          j.ownerUid === user.uid
      );


      if (job) {
        setForm(job);
      }

    });

}, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const res = await fetch(`/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("آگهی با موفقیت ویرایش شد.");
      router.push("/company/jobs");
    } else {
      alert("خطا در ویرایش آگهی");
    }
  };

  return (
   <main className="min-h-screen bg-black p-4 text-white">



<div
className="
mb-6
flex
items-center
justify-between
rounded-3xl
border
border-yellow-500/30
bg-zinc-950/90
px-5
py-3
shadow-2xl
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

<h2
className="
text-xl
font-extrabold
text-yellow-300
"
>
شهرکار
</h2>


<p
className="
text-xs
text-gray-400
"
>
پنل کارفرما
</p>


</div>


</div>


</div>



    <h1
className="
mb-5
text-xl
font-extrabold
text-yellow-300
"
>
ویرایش آگهی
</h1>

    

<div
className="
rounded-3xl
border
border-yellow-500/20
bg-zinc-950/90
p-5
space-y-4
shadow-2xl
shadow-yellow-500/10
"
>

<form 
onSubmit={handleSubmit}
className="space-y-4"
>



        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="عنوان شغل"
         className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
transition-all
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="نام شرکت"
         className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
transition-all
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="شهر"






          className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
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
border-blue-500/40
bg-blue-950/70
px-8
py-3
font-bold
text-blue-300
shadow-lg
shadow-blue-500/20
transition-all
hover:scale-105
hover:bg-blue-900/80
"
>

<h3 className="text-lg font-extrabold mb-2">
🤖 دسته‌بندی خودکار با هوش مصنوعی
</h3>


<p className="text-sm text-blue-200 leading-6">
شهرکار با تحلیل عنوان و توضیحات شغل، بهترین دسته‌بندی را برای آگهی شما پیشنهاد می‌دهد.
</p>


</div>





        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="حقوق"
         className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
transition-all
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={6}
          placeholder="توضیحات"
          className="
w-full
h-32
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-4
text-white
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
border-green-500/40
bg-green-950/70
px-8
py-3
font-bold
text-green-300
shadow-lg
shadow-green-500/20
transition-all
hover:scale-105
hover:bg-green-900/80
"
        >
             
        ذخیره تغییرات
      </button>

    </form>

</div>
    </main>
  );
}
