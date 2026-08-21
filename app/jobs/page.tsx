import Link from "next/link";
import { JobCard } from "@/components/job-card";
import BackButton from "@/components/back-button";
import PageHeader from "@/components/page-header";
import JobAccessLink from "@/components/job-access-link";
import type { Job } from "@/lib/data";
import { categories } from "@/lib/data";
import JobFilters from "@/components/job-filters";

export default async function JobsPage({
  searchParams,
}: {
 searchParams: Promise<{
  search?: string;
  city?: string;
  category?: string;
type?: string;
}>;
}) {

 const res = await fetch(
  `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/jobs`,
  {
    cache: "no-store",
  }
);

let jobs: Job[] = await res.json();

 const { search, city, category, type } = await searchParams;
const selectedCategory = categories.find(
  (cat) => cat.slug === category
);

  if (search) {
    const words = search
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    jobs = jobs.filter((job) => {
      const text = `${job.title} ${job.company} ${job.city} ${job.description}`
        .toLowerCase();

      return words.every((word) => text.includes(word));
    });
  }

if (city) {
  jobs = jobs.filter(
    (job) =>
      String(job.city || "").toLowerCase() === city.toLowerCase()
  );
}

if (type) {
  jobs = jobs.filter(
    (job) =>
      String(job.type || "").toLowerCase() === type.toLowerCase()
  );
}


if (category) {

  if (category === "mixed") {

    jobs = jobs.filter(
      (job) => !job.category
    );

  } else {

    jobs = jobs.filter(
      (job) =>
        String(job.category || "").toLowerCase() === category.toLowerCase()
    );

  }

}

return (
    <main className="max-w-5xl mx-auto p-6">
<PageHeader />

<JobFilters />     

<h1 className="text-xl md:text-2xl font-bold mb-6 text-center">
  {selectedCategory
    ? selectedCategory.title
    : "آگهی‌های استخدام"}
</h1>

{selectedCategory && (
  <p className="text-center text-gray-400 mb-8">
    {jobs.length.toLocaleString("fa-IR")} آگهی فعال پیدا شد
  </p>
)}

      {jobs.length === 0 ? (
        <p className="text-center text-gray-400">
          آگهی مرتبطی پیدا نشد.
        </p>
      ) : (



<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

  {jobs.map((job) => (
    <JobCard
      key={job.id}
      job={{
        id: String(job.id),
        title: job.title,
        company: job.company,
        location: job.city,
        type: job.type || "قابل توافق",
        salary: job.salary,
        tags: [],
        postedAt: "",
        city: job.city || "",
        category: job.category || "",
        remote: false,
      }}
    />
  ))}

</div>

      )}

    </main>
  );
}
