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
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "خطا در ثبت آگهی");
      return;
    }

    alert("آگهی با موفقیت ثبت شد.");

window.location.href = "/jobs";
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        ثبت آگهی جدید
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="عنوان شغل"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="company"
          placeholder="نام شرکت"
          value={form.company}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="city"
          placeholder="شهر"
          value={form.city}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="salary"
          placeholder="حقوق"
          value={form.salary}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          placeholder="توضیحات شغل"
          value={form.description}
          onChange={handleChange}
          rows={6}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
        >
          ثبت آگهی
        </button>
      </form>
    </main>
  );
}
