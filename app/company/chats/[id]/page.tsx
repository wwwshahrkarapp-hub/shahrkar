
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompanyChatPage() {
  const { id } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
const [chatStatus,setChatStatus] = useState("open");
  const [loading, setLoading] = useState(true);

  // گرفتن پیام‌های قبلی
  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch(`/api/chats/${id}`);

        const data = await res.json();

if (data.success) {
  setMessages(data.messages || []);
  setChatStatus(data.status || "open");
}

      } catch (error) {
        console.error("LOAD CHAT ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadMessages();
    }
  }, [id]);

  // ارسال پیام
  async function sendMessage() {
    if (!message.trim()) return;

    const user = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    if (!user.uid) {
      alert("کاربر وارد نشده است");
      return;
    }

    const text = message.trim();

    const res = await fetch(`/api/chats/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        senderUid: user.uid,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert(data.message || "ارسال پیام انجام نشد");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        text,
        senderUid: user.uid,
        createdAt: new Date().toISOString(),
      },
    ]);

    setMessage("");
  }


async function deleteMessage(messageId:string){

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const res = await fetch(`/api/chats/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      messageId,
      senderUid:user.uid
    })
  });

  const data = await res.json();

  if(data.success){
    setMessages(prev =>
      prev.filter(msg => msg.id !== messageId)
    );
  }else{
    alert(data.message || "حذف انجام نشد");
  }

}



async function closeChat(){

  const res = await fetch(`/api/chats/${id}`,{
    method:"PATCH",
  });

  const data = await res.json();

  if(data.success){
    setChatStatus("closed");
    alert("چت بسته شد");
  }

}




return (
  <main className="min-h-screen bg-black text-white p-3">

    <div className="mx-auto w-full max-w-2xl">

      <div className="
      rounded-2xl
      border
      border-yellow-500/30
      bg-zinc-950
      shadow-[0_0_25px_rgba(234,179,8,0.15)]
      overflow-hidden
      ">

        <div className="
        flex
        items-center
        justify-between
        p-5
        border-b
        border-zinc-800
        ">

          <div>

            <h1 className="text-2xl font-bold">
              💬 گفتگو با کارجو
            </h1>

            <p className="text-sm text-zinc-400 mt-1">
              محیط امن گفتگو در شهرکار
            </p>

<div className="mt-3">
  {chatStatus === "closed" ? (
    <span
      className="
      rounded-full
      bg-red-950/70
      border
      border-red-500/40
      px-3
      py-1
      text-sm
      text-red-300
      "
    >
      🔴 بسته شده
    </span>
  ) : (
    <span
      className="
      rounded-full
      bg-emerald-950/70
      border
      border-emerald-500/40
      px-3
      py-1
      text-sm
      text-emerald-300
      "
    >
      🟢 فعال
    </span>
  )}
</div>




          </div>


          <button
            onClick={() => window.history.back()}
            className="
            rounded-xl
            bg-yellow-500
            px-5
            py-2
            font-bold
            text-black
            "
          >
            ← بازگشت
          </button>


        </div>



<div className="h-[420px] overflow-y-auto rounded-2xl bg-[#171717] border border-yellow-500/20 p-3 shadow-lg">

          {loading ? (
            <p className="text-gray-400">
              در حال دریافت پیام‌ها...
            </p>
          ) : messages.length === 0 ? (
            <p className="text-gray-400">
              هنوز پیامی ارسال نشده است.
            </p>
          ) : (

            messages.map((msg, index) => (

<div
  key={msg.id || index}
  className={`
    max-w-[55%]
    rounded-2xl
    px-3
    py-2
    mb-3
    shadow-lg
    text-white

    ${
      msg.senderUid === JSON.parse(localStorage.getItem("user") || "{}").uid
      ?
      "ml-auto rounded-br-none border border-yellow-500/40 bg-yellow-950/70 text-yellow-100 shadow-yellow-500/20"
      :
      "mr-auto rounded-bl-none border border-emerald-500/40 bg-emerald-950/70 text-emerald-100 shadow-emerald-500/20"
    }
  `}
>
  {msg.text}

  <div className="text-[10px] opacity-50 mt-1 text-right">
    {msg.createdAt
      ? new Date(msg.createdAt).toLocaleString("fa-IR")
      : "-"}
  </div>


{msg.senderUid === JSON.parse(localStorage.getItem("user") || "{}").uid && (
  <button
    onClick={() => deleteMessage(msg.id)}
    className="
    text-red-400
    text-xs
    mt-2
    hover:text-red-300
    transition
    "
  >
    🗑 حذف
  </button>
)}


</div>
            ))

          )}

        </div>

<div className="
p-3
border-t
border-zinc-800
bg-zinc-950
">

  <div className="flex items-center gap-3">

<input
  disabled={chatStatus === "closed"}
  value={message}

      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      }}
      placeholder={
  chatStatus === "closed"
  ? "این گفتگو بسته شده است"
  : "پیام خود را بنویسید..."
}

      className="
      flex-1
      rounded-xl
      border
      border-zinc-700
      bg-zinc-800
      px-3
      py-2
      text-sm
      text-white
      outline-none
      transition-all
      focus:border-yellow-500
      "
    />


<button
  disabled={chatStatus === "closed"}
  onClick={sendMessage}   

      className="
      rounded-2xl
      border
      border-emerald-500/40
      bg-emerald-950/70
      px-5
      py-2
      font-bold
      text-emerald-300
      shadow-lg
      shadow-emerald-500/20
      transition-all
      hover:scale-105
      hover:bg-emerald-900/80
      "
    >
      ارسال
    </button>


{chatStatus !== "closed" && (
<button
  onClick={closeChat}
  className="
  rounded-2xl
  border
  border-red-500/40
  bg-red-950/70
  px-5
  py-2
  font-bold
  text-red-300
  "
>
  🔴 مسدود
</button>
)}


     </div>

  </div>

   </div>

  </div>

 </main>
 );
 }
