import fs from "fs";
import path from "path";
import Link from "next/link";

const filePath = path.join(process.cwd(), "data", "jobs.json");

export default function JobsPage() {
  let jobs: any[] = [];

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, "utf8");
    jobs = file ? JSON.parse(file) : [];
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        آگهی‌های استخدام
      </h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-400">
          هنوز هیچ آگهی ثبت نشده است.
        </p>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="block rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow transition hover:border-yellow-500 hover:bg-zinc-800"
            >
              <h2 className="mb-3 text-2xl font-bold text-white">
                {job.title}
              </h2>

              <p className="mb-2 text-gray-300">
                <strong>شرکت:</strong> {job.company}
              </p>

              <p className="mb-2 text-gray-300">
                <strong>شهر:</strong> {job.city}
              </p>

              <p className="mb-4 text-gray-300">
                <strong>حقوق:</strong> {job.salary}
              </p>

              <p className="text-gray-400 line-clamp-3">
                {job.description}
              </p>

              <div className="mt-5 text-sm font-bold text-yellow-400">
                مشاهده جزئیات ←
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
