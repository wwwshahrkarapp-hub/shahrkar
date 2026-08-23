"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { Logo } from "@/components/logo";



export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const [replyText, setReplyText] = useState("");
const [activeTicket, setActiveTicket] = useState("");



  useEffect(() => {
    async function loadTickets() {
      try {
        const user = auth.currentUser;

        if (!user) return;


        const token = await user.getIdToken();


        const res = await fetch("/api/support/my", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });


        const data = await res.json();


        if (data.success) {
          setTickets(data.tickets);
        }


      } catch (error) {
        console.error("TICKETS LOAD ERROR:", error);
      } finally {
        setLoading(false);
      }
    }


    loadTickets();

  }, []);



useEffect(() => {

  async function markSupportRead() {

    const savedUser = localStorage.getItem("user");

    if (!savedUser) return;


    const user = JSON.parse(savedUser);


    await fetch("/api/company/support/read", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: user.uid,
      }),
    });

  }


  markSupportRead();

}, []);




  return (
    <main className="min-h-screen bg-black p-6 text-white">


<div className="mb-6 flex items-center gap-3 rounded-2xl border border-yellow-500/30 bg-zinc-950/90 px-5 py-4 shadow-lg shadow-yellow-500/10">

<div className="flex items-center">
  <Logo />
</div>

 <div>
  <p className="text-xs text-gray-400">
    درخواست‌های پشتیبانی من
  </p>
</div>


</div>


      <div className="mx-auto max-w-2xl space-y-4">


        {loading && (
          <p className="text-gray-400">
            در حال دریافت درخواست‌ها...
          </p>
        )}



        {!loading && tickets.length === 0 && (
          <div className="rounded-2xl border border-zinc-700 bg-zinc-950/80 p-5 text-gray-400">
            هنوز درخواستی ثبت نکرده‌اید.
          </div>
        )}




        {tickets.map((ticket) => (

          <div
            key={ticket.id}

className="rounded-2xl border border-yellow-500/20 bg-zinc-950/90 p-5 shadow-lg shadow-yellow-500/10"

          >

            <h2 className="font-bold text-yellow-300">
              {ticket.subject}
            </h2>


<p className="mt-2 text-sm text-gray-400">
              {ticket.message}
            </p>


            <div className="mt-4 text-sm text-gray-400">
              وضعیت:
              <span className="mr-2 text-green-300">
                {ticket.status}
              </span>
            </div>


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
  className={`max-w-[85%] rounded-2xl p-4 shadow-lg transition-all ${
msg.sender === "admin"
  ? "mr-auto border border-yellow-500/30 bg-yellow-950/50 text-yellow-100 shadow-lg shadow-yellow-500/10"
  : "ml-auto border border-zinc-700 bg-zinc-900 text-gray-200 shadow-lg shadow-black/20"
}`}
>


        <div className="text-xs font-bold text-yellow-300">
          {msg.sender === "admin"
            ? "🧑‍💼 پشتیبانی شهرکار"
            : "👤 شما"}
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





<textarea
  value={activeTicket === ticket.id ? replyText : ""}
  onChange={(e) => {
    setActiveTicket(ticket.id);
    setReplyText(e.target.value);
  }}
  placeholder="پیام خود را بنویسید..."
  className="mt-4 w-full rounded-xl border border-zinc-700 bg-black p-3 text-white"
/>


<button
  onClick={async () => {

    const user = auth.currentUser;

    if (!user) return;

    const token = await user.getIdToken();


    await fetch("/api/company/support/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ticketId: ticket.id,
        message: replyText,
      }),
    });


setReplyText("");

const res = await fetch("/api/support/my", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

const data = await res.json();

if (data.success) {
  setTickets(data.tickets);
} 



  }}

className="
mt-3
rounded-2xl
border
border-green-500/40
bg-green-950/70
px-8
py-3
font-bold
text-green-300
shadow-lg
shadow-green-500/20
transition-all
hover:scale-105
hover:bg-green-900/80
"

>
  📩 ارسال پیام
</button>


<div className="mt-2 text-xs text-gray-500">

  شماره پیگیری: {ticket.id}

</div>
 
          </div>

        ))}



     <Link href="/company/settings/support">

  <div
    className="
    mt-6
    rounded-2xl
    border
    border-red-500/40
    bg-red-950/70
    px-8
    py-3
    text-center
    font-bold
    text-red-300
    shadow-lg
    shadow-red-500/20
    transition-all
    hover:scale-105
    hover:bg-red-900/80
    "
  >
    ← بازگشت به پشتیبانی
  </div>

</Link>


      </div>


    </main>
  );
}
