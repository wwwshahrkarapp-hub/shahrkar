import fs from "fs/promises";
import path from "path";
import RequestActions from "./components/RequestActions";
type Application = {
  id: number;
  jobId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

async function getApplications(): Promise<Application[]> {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "applications.json"
    );

    const file = await fs.readFile(filePath, "utf8");

    return JSON.parse(file);
  } catch {
    return [];
  }
}

export default async function CompanyRequestsPage() {
  const applications = await getApplications();
const total = applications.length;
const approved = applications.filter(
  (a) => a.status === "تأیید شد"
).length;

const rejected = applications.filter(
  (a) => a.status === "رد شد"
).length;

const pending = applications.filter(
  (a) => a.status === "در انتظار"
).length;
 const jobsPath = path.join(process.cwd(), "data", "jobs.json");

let jobs: {
  id: number;
  title: string;
}[] = [];

try {
  jobs = JSON.parse(await fs.readFile(jobsPath, "utf8"));
} catch (error) {
  console.log("Failed to load jobs:", error);
}
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold">
          درخواست‌های استخدام
        </h1>
     <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">

  <div className="rounded-xl bg-zinc-900 p-5 text-center">
    <div className="text-3xl font-bold">{total}</div>
    <div className="mt-2 text-gray-400">📄 کل درخواست‌ها</div>
  </div>

  <div className="rounded-xl bg-green-900/40 p-5 text-center">
    <div className="text-3xl font-bold text-green-400">
      {approved}
    </div>
    <div className="mt-2 text-gray-300">✅ تأیید شده</div>
  </div>

  <div className="rounded-xl bg-red-900/40 p-5 text-center">
    <div className="text-3xl font-bold text-red-400">
      {rejected}
    </div>
    <div className="mt-2 text-gray-300">❌ رد شده</div>
  </div>

  <div className="rounded-xl bg-yellow-900/40 p-5 text-center">
    <div className="text-3xl font-bold text-yellow-400">
      {pending}
    </div>
    <div className="mt-2 text-gray-300">🟡 در انتظار</div>
  </div>

</div>
        {applications.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-6 text-center">
            هنوز هیچ درخواستی ثبت نشده است.
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => {
  const job = jobs.find((j) => String(j.id) === app.jobId);

  return (
              <div
                key={app.id}
                className="rounded-xl bg-zinc-900 p-6"
              >
                <h2 className="text-xl font-bold">
                  {app.name}
                </h2>

                <p className="mt-2">
                  📱 {app.phone}
                </p>

                <p className="mt-2">
                  📧 {app.email || "-"}
                </p>

                <p className="mt-2">
  💼 آگهی: {job?.title ?? "آگهی حذف شده"}
</p>

                <p className="mt-2">
                  📝 {app.message}
                </p>

                <p className="mt-4">
                  <span className="rounded bg-yellow-600 px-3 py-1">
                    {app.status}
                  </span>
                </p>

                <p className="mt-3 text-sm text-gray-400">
                  {new Date(app.createdAt).toLocaleString("fa-IR")}
                </p>
                <RequestActions id={app.id} />
              </div>
  );
})}
          </div>
        )}

      </div>
    </main>
  );
}
