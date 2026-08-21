"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserChatPage() {

  const { id } = useParams();
  const router = useRouter();

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState<any[]>([]);
const [chatStatus,setChatStatus] = useState("open");
const [companyName,setCompanyName] = useState("کارفرما");

  async function loadMessages(){

    const res = await fetch(`/api/chats/${id}`);
    const data = await res.json();

   if(data.success){
  setMessages(data.messages);
  setChatStatus(data.status || "open");
  setCompanyName(data.companyName || "کارفرما");
}

  }


  useEffect(()=>{
    loadMessages();
  },[]);



 async function sendMessage(){


  if(!message.trim()) return;


  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  console.log("USER:", user);
  console.log("CHAT ID:", id);
  console.log("TEXT:", message);


  const res = await fetch(`/api/chats/${id}`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      text:message,
      senderUid:user.uid
    })
  });


  const data = await res.json();

  console.log("API RESPONSE:", data);


  if(!res.ok || !data.success){

    alert(data.message || "خطا در ارسال");

    return;
  }



  setMessage("");
  loadMessages();

  }



async function closeChat(){

  const res = await fetch(`/api/chats/${id}`,{
    method:"PATCH",
  });

  const data = await res.json();

  if(data.success){
    setChatStatus("closed");
    alert("چت بسته شد");
  }else{
    alert(data.message || "خطا در بستن چت");
  }

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
      prev.filter(
        msg => msg.id !== messageId
      )
    );

  }else{

    alert(data.message || "حذف انجام نشد");

  }

}



return (

<main className="min-h-screen bg-black text-white p-3">

 <div className="mx-auto w-full max-w-2xl">

<div className="rounded-2xl border border-yellow-500/30 bg-zinc-950 shadow-[0_0_25px_rgba(234,179,8,0.15)] overflow-hidden">

      {/* header */}

      <div className="flex items-center justify-between p-5 border-b border-zinc-800">

     <div>
  <h1 className="text-2xl font-bold">
    💬 گفتگو با {companyName}
  </h1>

  <p className="text-sm text-zinc-400 mt-1">
    محیط امن گفتگو در شهرکار
  </p>

  <div className="mt-3 flex items-center gap-2">
    {chatStatus === "closed" ? (
      <span className="
        rounded-full
        bg-red-950/70
        border
        border-red-500/40
        px-3
        py-1
        text-sm
        text-red-300
      ">
        🔴 بسته شده
      </span>
    ) : (
      <span className="
        rounded-full
        bg-emerald-950/70
        border
        border-emerald-500/40
        px-3
        py-1
        text-sm
        text-emerald-300
      ">
        🟢 فعال
      </span>
    )}
  </div>

</div> 


        <button
          onClick={()=>router.back()}
          className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold"
        >
          بازگشت
        </button>

      </div>



      {/* messages */}

<div className="h-[420px] overflow-y-auto rounded-2xl bg-[#171717] border border-yellow-500/20 p-3 shadow-lg">
      {messages.length===0 ? (

        <p className="text-center text-zinc-400">
          هنوز پیامی ارسال نشده است.
        </p>

      ):(


messages.map((msg)=>(
 
<div
key={msg.id}
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

"ml-auto rounded-br-none border border-yellow-500/40 bg-yellow-950/70 text-yellow-100 shadow-lg shadow-yellow-500/20"

:

"mr-auto rounded-bl-none border border-emerald-500/40 bg-emerald-950/70 text-emerald-100 shadow-lg shadow-emerald-500/20"

}

`}
>

{msg.text}

<div className="text-[10px] opacity-50 mt-1 text-right">
{new Date(msg.createdAt).toLocaleString("fa-IR")}
</div>

{msg.senderUid === JSON.parse(localStorage.getItem("user") || "{}").uid && (

<button
onClick={()=>deleteMessage(msg.id)}
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


      {/* input */}

     <div className="p-3 border-t border-zinc-800 bg-zinc-950">


    <div className="flex items-center justify-between gap-4">


       <input
disabled={chatStatus === "closed"}

        value={message}

        onChange={(e)=>setMessage(e.target.value)}

placeholder={
 chatStatus === "closed"
 ? "این گفتگو بسته شده است"
 : "پیام خود را بنویسید..."
}       


 className={`
w-full
rounded-xl
border
px-3
py-2
text-xs
outline-none
transition-all

${
chatStatus === "closed"

?

"bg-zinc-900 border-red-500/30 text-zinc-500 cursor-not-allowed"

:

"bg-zinc-800 border-zinc-700 text-white focus:border-yellow-500"

}
`}

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
disabled:opacity-40
disabled:cursor-not-allowed
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
    shadow-lg
    shadow-red-500/20
    transition-all
    hover:scale-105
    hover:bg-red-900/80
    "
  >
    مسدود
  </button>
)}

        </div>


      </div>


    </div>


  </div>


</main>

  );

}

