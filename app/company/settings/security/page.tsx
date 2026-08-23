"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  signOut,
  User,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";



export default function CompanySecurityPage() {
  const [user, setUser] = useState<User | null>(null);
const [oldPassword, setOldPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [message, setMessage] = useState("");

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);



async function changePassword() {
  try {
    if (!user?.email) {
      setMessage("کاربر پیدا نشد.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      oldPassword
    );

    await reauthenticateWithCredential(user, credential);

    await updatePassword(user, newPassword);

    setMessage("رمز عبور با موفقیت تغییر کرد.");

    setOldPassword("");
    setNewPassword("");

  } catch (error: any) {
    setMessage(
      "خطا در تغییر رمز: " + error.message
    );
  }
}



  async function logout() {
    await signOut(auth);
    window.location.href = "/login";
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white">

      <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-zinc-950/90 px-5 py-4 shadow-lg shadow-yellow-500/10">

        <h1 className="text-xl font-extrabold text-yellow-300">
          🔐 امنیت حساب کارفرما
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          مدیریت امنیت و دسترسی حساب
        </p>

      </div>


      <div className="mx-auto max-w-2xl space-y-4">


        <div className="rounded-2xl border border-zinc-700 bg-zinc-950/80 p-5">

          <h2 className="font-bold text-yellow-300">
            👤 اطلاعات ورود
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            ایمیل:
          </p>

          <p className="mt-1 text-white">
            {user?.email || "در حال بارگذاری..."}
          </p>

        </div>


        <div className="rounded-2xl border border-zinc-700 bg-zinc-950/80 p-5">

          <h2 className="font-bold text-yellow-300">
            🔑 رمز عبور
          </h2>

         <input
  type="password"
  placeholder="رمز فعلی"
  value={oldPassword}
  onChange={(e) => setOldPassword(e.target.value)}
  className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
/>

<input
  type="password"
  placeholder="رمز جدید"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  className="mt-3 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white"
/>

<button
  onClick={changePassword}
  className="mt-4 w-full rounded-xl border border-yellow-500/40 bg-yellow-950/70 px-5 py-3 font-bold text-yellow-300 hover:bg-yellow-900/70"
>
  🔐 تغییر رمز عبور
</button>

{message && (
  <p className="mt-3 text-sm text-gray-300">
    {message}
  </p>
)}

        </div>


        <div className="rounded-2xl border border-zinc-700 bg-zinc-950/80 p-5">

          <h2 className="font-bold text-yellow-300">
            📱 ورودهای فعال
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            UID:
          </p>

          <p className="mt-1 break-all text-white">
            {user?.uid || "در حال بارگذاری..."}
          </p>

        </div>


        <button
          onClick={logout}
          className="w-full rounded-2xl border border-red-500/40 bg-red-950/70 px-6 py-4 font-bold text-red-300 hover:bg-red-900/70"
        >
          🚪 خروج امن از حساب
        </button>


        <Link href="/company/settings">

          <div className="mt-4 rounded-2xl border border-yellow-500/40 bg-yellow-950/70 px-6 py-4 text-center font-bold text-yellow-300 hover:bg-yellow-900/70">
            ← بازگشت به تنظیمات
          </div>

        </Link>


      </div>

    </main>
  );
}
