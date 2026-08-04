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
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((jobs) => {
        const job = jobs.find((j: any) => String(j.id) === String(id));

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
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        ویرایش آگهی
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="عنوان شغل"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="نام شرکت"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="شهر"
          className="w-full border rounded-lg p-3"
        />

        <input
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="حقوق"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={6}
          placeholder="توضیحات"
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
        >
          ذخیره تغییرات
        </button>

      </form>
    </main>
  );
}
