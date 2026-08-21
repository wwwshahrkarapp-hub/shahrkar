"use client";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="
      rounded-xl
      bg-yellow-500
      px-5
      py-2
      font-bold
      text-black
      transition
      hover:bg-yellow-400
      "
    >
      ← برگشت
    </button>
  );
}
