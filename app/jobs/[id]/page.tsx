import { notFound } from "next/navigation";
import fs from "fs/promises";
import JobActions from "./JobActions";
import path from "path";
import Link from "next/link";
import SaveButton from "./SaveButton";
type Job = {
  id: number;
  title: string;
  company: string;
  city: string;
  salary: string;
  type?: string;
  description: string;
  createdAt: string;
};

async function getJob(id: string): Promise<Job | null> {

  try {

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/api/jobs/${id}`,
      {
        cache: "no-store",
      }
    );


    if (!res.ok) {
      return null;
    }


    const data = await res.json();

    return data;


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
  <main className="min-h-screen bg-background text-foreground p-6">
    <div className="max-w-2xl mx-auto rounded-3xl border border-yellow-500/20 bg-card p-8 shadow-xl shadow-yellow-500/10">

      <h1 className="mb-6 text-3xl font-extrabold text-yellow-400">
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

       <JobActions job={job} />

      </div>
    </main>
  );
}
