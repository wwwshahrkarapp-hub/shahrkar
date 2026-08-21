"use client";

import { useEffect, useState } from "react";

export default function SaveButton({
  jobId,
  title,
  company,
  city,
}: any) {

  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState("");
useEffect(() => {

  async function checkSaved() {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) return;

    const user = JSON.parse(savedUser);


    const res = await fetch(`/api/saved-jobs?uid=${user.uid}`);

    const jobs = await res.json();


    const found = jobs.find(
      (job:any) =>
        job.uid === user.uid &&
        job.jobId === jobId
    );


    if (found) {
      setSaved(true);
      setSavedId(found.id);
    }

  }


  checkSaved();

}, [jobId]);
  async function saveJob() {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      alert("کاربر وارد نشده");
      return;
    }

    const user = JSON.parse(savedUser);

    const res = await fetch("/api/saved-jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
        jobId,
        title,
        company,
        city,
      }),
    });

    const data = await res.json();

    if (data.success) {
  setSaved(true);
  setSavedId(data.id);

  window.location.href = "/applicant/saved-jobs";
}
  }


  async function deleteJob() {

    const res = await fetch("/api/saved-jobs/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: savedId,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setSaved(false);
      setSavedId("");
    }
  }


  return (
    <button
      type="button"
      onClick={() => {
        if (saved) {
          deleteJob();
        } else {
          saveJob();
        }
      }}
  className="
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-8
py-3
font-bold
text-yellow-300
shadow-lg
shadow-yellow-500/20
transition-all
hover:scale-105
hover:bg-yellow-900/80
"
    >
      {saved ? "⭐ ذخیره شد" : "☆ ذخیره شغل"}
    </button>
  );
}
