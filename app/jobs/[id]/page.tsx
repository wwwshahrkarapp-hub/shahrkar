import { notFound } from "next/navigation";
import { adminDb } from "@/lib/firebase-admin";
import JobActions from "./JobActions";

type Job = {
  id: string;
  title: string;
  company: string;
  city: string;
  salary: string;
  type?: string;
  description: string;
  createdAt?: any;
  category?: string;
  skills?: string[];
  ownerUid?: string;
  status?: string;
};

async function getJob(id: string): Promise<Job | null> {
  try {
    const doc = await adminDb.collection("jobs").doc(id).get();

    if (doc.exists) {
      return {
        id: doc.id,
        ...(doc.data() as Omit<Job, "id">),
      };
    }

    const snapshot = await adminDb.collection("jobs").get();

    const found = snapshot.docs.find((item) => {
      const data = item.data();

      return (
        String(data.id ?? "") === String(id) ||
        String(data.jobId ?? "") === String(id)
      );
    });

    if (found) {
      return {
        id: found.id,
        ...(found.data() as Omit<Job, "id">),
      };
    }

    return null;
  } catch (error) {
    console.error("Failed to load job:", error);
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
