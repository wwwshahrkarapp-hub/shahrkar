"use client";
import { useEffect, useState } from "react";
import fs from "fs/promises";
import path from "path";
import { adminDb } from "@/lib/firebase-admin";
import RequestActions from "./components/RequestActions";
type Application = {
  id: string;
  jobId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  createdAt?: {
  seconds: number;
};
};

function getApplications(
  setApplications: any,
  uid: string
) {
  fetch("/api/applications")
    .then((res) => res.json())
    .then((data) => {
     setApplications(
  data.filter(
    (app: any) =>
      app.ownerUid === uid &&
      app.status !== "لغو شده"
  )
);
    })
    .catch(() => {
      setApplications([]);
    });
}

export default function CompanyRequestsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) return;

    const user = JSON.parse(savedUser);

    getApplications(setApplications, user.uid);

    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);
const total = applications.length;
const approved = applications.filter(
  (a) => a.status === "تأیید شد"
).length;

const rejected = applications.filter(
  (a) => a.status === "رد شد"
).length;

const pending = applications.filter(
  (a) => a.status === "در حال بررسی"
).length;

  return (
   <main className="min-h-screen bg-black text-white p-4">
      <div className="mx-auto max-w-5xl">

<div className="mb-3 flex justify-center">
  <div className="
  w-12
  h-12
  rounded-full
  bg-yellow-500
  flex
  items-center
  justify-center
  text-black
  text-xl
  shadow-lg
  shadow-yellow-500/20
  ">
    🏠
  </div>
</div>

        <h1 className="mb-5 text-2xl font-bold">
        ☆  درخواست‌های استخدام ☆
        </h1>
     <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">

  <div className="rounded-xl bg-card
border border-yellow-500/20
rounded-2xl
shadow-lg shadow-yellow-500/5 p-3 text-center">
  <div className="text-2xl font-bold">{total}</div>
    <div className="mt-2 text-gray-400">📄 کل درخواست‌ها</div>
  </div>

  <div className="rounded-xl bg-green-900/40 p-3 text-center">
    <div className="text-3xl font-bold text-green-400">
      {approved}
    </div>
    <div className="mt-2 text-gray-300">✅ تأیید شده</div>
  </div>

  <div className="rounded-xl bg-red-900/40 p-3 text-center">
    <div className="text-3xl font-bold text-red-400">
      {rejected}
    </div>
    <div className="mt-2 text-gray-300">❌ رد شده</div>
  </div>

  <div className="rounded-xl bg-yellow-900/40 p-3 text-center">
    <div className="text-3xl font-bold text-yellow-400">
      {pending}
    </div>
    <div className="mt-2 text-gray-300">🟡 در انتظار</div>
  </div>

</div>
        {applications.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-4 text-center">
            هنوز هیچ درخواستی ثبت نشده است.
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
  const job = jobs.find((j) => String(j.id) === app.jobId);

  return (
              <div
                key={app.id}
               className="
rounded-2xl
border
border-yellow-500/20
bg-card
p-3
shadow-lg
shadow-yellow-500/5
"
              >
               <h2 className="text-lg font-bold">
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

                <p className="mt-2">
                 <span
className="
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-3
py-1
font-bold
text-yellow-300
shadow-lg
shadow-yellow-500/20
transition-all
hover:scale-105
hover:bg-yellow-900/80
"
>
                    {app.status}
                  </span>
                </p>

                <p className="mt-3 text-sm text-gray-400">
                  {app.createdAt?.seconds
  ? new Date(app.createdAt.seconds * 1000).toLocaleString("fa-IR")
  : "-"}
                </p>
                <RequestActions
  id={app.id}
status={app.status}
  onUpdate={(status:string) => {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === app.id
          ? { ...item, status }
          : item
      )
    );
  }}
  onDelete={() => {
    setApplications((prev) =>
      prev.filter((item) => item.id !== app.id)
    );
  }}
/>
              </div>
  );
})}
          </div>
        )}

      </div>
    </main>
  );
}
