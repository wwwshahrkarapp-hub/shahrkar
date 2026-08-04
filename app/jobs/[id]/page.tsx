import { notFound } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import Link from "next/link";

type Job = {
  id: number;
  title: string;
  company: string;
  city: string;
  salary: string;
  description: string;
  createdAt: string;
};

async function getJob(id: string): Promise<Job | null> {
  const filePath = path.join(process.cwd(), "data", "jobs.json");

  try {
    const file = await fs.readFile(filePath, "utf8");
    const jobs: Job[] = JSON.parse(file);

    return jobs.find((job) => String(job.id) === id) || null;
  } catch {
    return null;
  }
}

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const job = await getJob(id);

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="max-w-2xl mx-auto rounded-2xl bg-zinc-900 p-6">

        <h1 className="mb-4 text-3xl font-bold">
          {job.title}
        </h1>

        <p className="mb-2">
          <strong>شرکت:</strong> {job.company}
        </p>

        <p className="mb-2">
          <strong>شهر:</strong> {job.city}
        </p>

        <p className="mb-4">
          <strong>حقوق:</strong> {job.salary}
        </p>

        <hr className="my-4 border-zinc-700" />

        <h2 className="mb-2 text-xl font-bold">
          توضیحات
        </h2>

        <p className="whitespace-pre-wrap leading-8">
          {job.description}
        </p>

        <div className="mt-8 flex gap-4">

          <Link
            href={`/jobs/${job.id}/apply`}
            className="rounded-lg bg-green-600 px-6 py-3 font-bold text-white"
          >
            📩 ارسال درخواست استخدام
          </Link>

          <Link
            href="/jobs"
            className="rounded-lg bg-zinc-700 px-6 py-3 font-bold"
          >
            ← بازگشت
          </Link>

        </div>

      </div>
    </main>
  );
}
