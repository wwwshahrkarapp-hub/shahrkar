"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ApplyPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("نام و شماره موبایل الزامی است.");
      return;
    }

    const res = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jobId: id,
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
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-zinc-900 p-6">

        <h1 className="mb-6 text-3xl font-bold">
          ارسال درخواست استخدام
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="نام و نام خانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />

          <input
            type="text"
            placeholder="شماره موبایل"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />

          <input
            type="email"
            placeholder="ایمیل (اختیاری)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />

          <textarea
            rows={6}
            placeholder="توضیحات"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-green-600 py-3 font-bold"
          >
            📩 ارسال درخواست
          </button>

        </form>

      </div>
    </main>
  );
}
