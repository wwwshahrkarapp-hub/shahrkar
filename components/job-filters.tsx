"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function JobFilters() {
const [cities, setCities] = useState<string[]>([]);

useEffect(() => {
  fetch("/api/cities")
    .then((res) => res.json())
    .then((data) => setCities(data));
}, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/jobs?${params.toString()}`);
  };

  return (
<div className="mb-8 grid gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-yellow-500/20 md:grid-cols-3">
      <select
        className="rounded-lg border border-zinc-700 bg-black p-3 text-white"
        onChange={(e)=>applyFilter("type", e.target.value)}
      >
        <option value="">نوع همکاری</option>
        <option value="تمام‌وقت">تمام‌وقت</option>
        <option value="پاره‌وقت">پاره‌وقت</option>
        <option value="دورکاری">دورکاری</option>
      </select>

   <select
  className="rounded-lg border border-zinc-700 bg-black p-3 text-white"
  onChange={(e)=>applyFilter("city", e.target.value)}
>
  <option value="">همه شهرها</option>

  {cities.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}

</select>

    </div>
  );
}
