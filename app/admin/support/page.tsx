"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";


function getStatusLabel(status: string) {
  switch (status) {
    case "open":
      return "🟢 باز";

    case "checking":
      return "🟡 در حال بررسی";

    case "answered":
      return "🔵 پاسخ داده شد";

    case "closed":
      return "⚫ بسته شد";

    default:
      return status;
  }
}


function getStatusStyle(status: string) {
  switch (status) {

case "open":
  return "border border-green-500/30 bg-green-500/10 text-green-300";

case "checking":
  return "border border-yellow-500/30 bg-yellow-500/10 text-yellow-300";

case "answered":
  return "border border-blue-500/30 bg-blue-500/10 text-blue-300";

case "closed":
  return "border border-zinc-500/30 bg-zinc-500/10 text-zinc-300";

    default:
      return "";
  }
}


export default function AdminSupportPage() {


  const [tickets, setTickets] = useState<any[]>([]);
const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
const [replyText, setReplyText] = useState("");
const [activeTicket, setActiveTicket] = useState("");


  useEffect(() => {
    async function loadTickets() {
      try {
        const user = auth.currentUser;

        if (!user) return;


        const token = await user.getIdToken();


        const res = await fetch("/api/admin/support/list", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await res.json();


        if (data.success) {
          setTickets(data.tickets);
        }


      } catch (error) {
        console.error("ADMIN TICKETS ERROR:", error);
      } finally {
        setLoading(false);
      }
    }


    loadTickets();

}, [refresh]);



  return (
    <main className="min-h-screen bg-black p-6 text-white">

      <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-zinc-950/90 px-5 py-4 shadow-lg shadow-yellow-500/10">

        <h1 className="text-xl font-extrabold text-yellow-300">
          🆘 مدیریت پشتیبانی شهرکار
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          مشاهده درخواست‌های کاربران
        </p>

      </div>



      <div className="mx-auto max-w-3xl space-y-4">


        {loading && (
          <p className="text-gray-400">
            در حال دریافت تیکت‌ها...
          </p>
        )}



        {!loading && tickets.length === 0 && (
          <div className="rounded-2xl border border-zinc-700 bg-zinc-950/80 p-5 text-gray-400">
            هیچ درخواست پشتیبانی وجود ندارد.
          </div>
        )}



        {tickets.map((ticket) => (

          <div
            key={ticket.id}

className="rounded-2xl border border-yellow-500/20 bg-zinc-950/90 p-5 shadow-xl shadow-yellow-500/5 transition-all hover:border-yellow-500/40"

          >

            <h2 className="font-bold text-yellow-300">
              #{ticket.id}
            </h2>


            <p className="mt-2 text-gray-300">
              موضوع: {ticket.subject}
            </p>


           <p className="mt-2 text-gray-400">
              {ticket.message}
            </p>


{(ticket.messages?.length > 0 || ticket.message) && (
  <div className="mt-5 space-y-3">

    {(ticket.messages?.length
      ? ticket.messages
      : [
          {
            text: ticket.message,
            sender: "company",
            createdAt: ticket.createdAt,
          },
        ]
    ).map((msg:any, index:number) => (

      <div
        key={index}
        className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
          msg.sender === "admin"
            ? "ml-auto border border-yellow-500/30 bg-yellow-950/40"
            : "mr-auto border border-zinc-700 bg-zinc-900"
        }`}
      >

        <div className="text-xs font-bold text-yellow-300">
          {msg.sender === "admin"
            ? "🧑‍💼 مدیر شهرکار"
            : "👤 کاربر"}
        </div>

        <p className="mt-2 text-sm text-gray-200">
          {msg.text}
        </p>

        <div className="mt-2 text-[11px] text-gray-500">
          {msg.createdAt
            ? new Date(msg.createdAt).toLocaleString("fa-IR")
            : ""}
        </div>

      </div>

    ))}

  </div>
)}



<div className="mt-3 flex items-center gap-2">

  <span className="text-sm text-gray-300">
    وضعیت:
  </span>


<span
  className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(ticket.status)}`}
>
  {getStatusLabel(ticket.status)}
</span>

</div>


<div className="mt-3 text-xs text-gray-400">
  🕒 آخرین بروزرسانی:
  {ticket.updatedAt
    ? new Date(ticket.updatedAt).toLocaleString("fa-IR")
    : "ثبت نشده"}
</div>


<select
  value={ticket.status}


  onChange={async (e) => {

    const user = auth.currentUser;

    if (!user) return;


    const token = await user.getIdToken();


    await fetch("/api/admin/support/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticketId: ticket.id,
        status: e.target.value,
      }),
    });


   setRefresh((prev) => prev + 1);

  }}
  className="mt-4 rounded-xl border border-zinc-700 bg-black p-3 text-white"
>
  <option value="open">
    🟢 باز
  </option>

  <option value="checking">
    🟡 در حال بررسی
  </option>

  <option value="answered">
    🔵 پاسخ داده شد
  </option>

  <option value="closed">
    ⚫ بسته شد
  </option>

</select>




<textarea
  value={activeTicket === ticket.id ? replyText : ""}
  onChange={(e) => {
    setActiveTicket(ticket.id);
    setReplyText(e.target.value);
  }}
  placeholder="پاسخ مدیر..."
className="mt-4 w-full rounded-2xl border border-yellow-500/20 bg-zinc-900 p-4 text-white shadow-lg shadow-yellow-500/5 placeholder:text-gray-500 focus:border-yellow-500/50 focus:outline-none"

/>


<button
  onClick={async () => {

    const user = auth.currentUser;

    if (!user) return;


    const token = await user.getIdToken();


    await fetch("/api/admin/support/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticketId: ticket.id,
        reply: replyText,
      }),
    });


   setRefresh((prev) => prev + 1);
setReplyText("");
alert("پاسخ ارسال شد");

  }}

className="mt-3 rounded-2xl border border-yellow-500/40 bg-yellow-500 px-6 py-3 font-bold text-black shadow-lg shadow-yellow-500/20 transition-all hover:scale-105 hover:bg-yellow-400"
>
  📩 ارسال پاسخ
</button>



          </div>

        ))}


      </div>

    </main>
  );
}
