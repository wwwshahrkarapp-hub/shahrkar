"use client";

export default function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    const ok = confirm("آیا از حذف این آگهی مطمئن هستید؟");

    if (!ok) return;

    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("حذف آگهی انجام نشد.");
      return;
    }

    alert("آگهی با موفقیت حذف شد.");

    // انتقال به لیست آگهی‌ها
    window.location.href = "/jobs";
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-5 py-2 font-bold text-white"
    >
      🗑 حذف
    </button>
  );
}
