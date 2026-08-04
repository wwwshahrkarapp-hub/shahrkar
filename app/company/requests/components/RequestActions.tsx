"use client";

import { useRouter } from "next/navigation";

export default function RequestActions({
  id,
}: {
  id: number;
}) {
  const router = useRouter();

  async function updateStatus(status: string) {
    const res = await fetch(`/api/applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      alert("خطا در بروزرسانی");
      return;
    }

    router.refresh();
  }

  async function deleteRequest() {
    if (!confirm("این درخواست حذف شود؟")) return;

    const res = await fetch(`/api/applications/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("حذف انجام نشد");
      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-6 flex flex-wrap gap-2">

      <button
        onClick={() => updateStatus("تأیید شد")}
        className="rounded-lg bg-green-600 px-4 py-2 font-bold"
      >
        ✅ تأیید
      </button>

      <button
        onClick={() => updateStatus("رد شد")}
        className="rounded-lg bg-red-600 px-4 py-2 font-bold"
      >
        ❌ رد
      </button>

      <button
        onClick={deleteRequest}
        className="rounded-lg bg-zinc-700 px-4 py-2 font-bold"
      >
        🗑 حذف
      </button>

    </div>
  );
}
