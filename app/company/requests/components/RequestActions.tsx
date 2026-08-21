"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function RequestActions({
  id,
  status,
  onUpdate,
  onDelete,
}: {
  id: string;
  status: string;
  onUpdate: (status:string)=>void;
  onDelete: ()=>void;
}) {

  const [loading,setLoading] = useState(false);


  async function updateStatus(status:string){

    setLoading(true);
const user = auth.currentUser;

if (!user) {
  alert("کاربر وارد نشده");
  setLoading(false);
  return;
}

const token = await user.getIdToken();

    const res = await fetch(`/api/applications/${id}`,{
      method:"PUT",
     headers:{
  "Content-Type":"application/json",
  "Authorization":`Bearer ${token}`,
},
      body:JSON.stringify({
        status
      })
    });


    if(!res.ok){

      alert("خطا در بروزرسانی");

      setLoading(false);

      return;
    }


    onUpdate(status);

    setLoading(false);

  }



  async function deleteRequest(){

    if(!confirm("این درخواست حذف شود؟")) return;


   const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const token = await auth.currentUser?.getIdToken();


const res = await fetch(`/api/applications/${id}`,{
  method:"DELETE",
  headers:{
    "Authorization": `Bearer ${token}`,
  },
});


    if(!res.ok){

      alert("حذف انجام نشد");

      return;
    }


    onDelete();

  }



  return(
  <div className="mt-3 flex flex-wrap items-center gap-3">


      <button
      disabled={loading}
      onClick={()=>updateStatus("تأیید شد")}
     className="
rounded-2xl
border
border-emerald-500/40
bg-emerald-950/70
px-8
py-3
font-bold
text-emerald-300
shadow-lg
shadow-emerald-500/20
transition-all
hover:scale-105
hover:bg-emerald-900/80
"
      >
        ✅ تأیید
      </button>


      <button
      disabled={loading}
      onClick={()=>updateStatus("رد شد")}
    className="
rounded-2xl
border
border-red-500/40
bg-red-950/70
px-8
py-3
font-bold
text-red-300
shadow-lg
shadow-red-500/20
transition-all
hover:scale-105
hover:bg-red-900/80
"
      >
        ❌ رد
      </button>


      <button
      onClick={deleteRequest}
     className="
rounded-2xl
border
border-zinc-500/40
bg-zinc-950/70
px-8
py-3
font-bold
text-zinc-300
shadow-lg
shadow-zinc-500/20
transition-all
hover:scale-105
hover:bg-zinc-900/80
"
      >
        🗑 حذف
      </button>
{status === "تأیید شد" && (
  <button
    onClick={async()=>{

      const res = await fetch(
        `/api/chats/by-application/${id}`
      );

      const data = await res.json();

      if(data.success){

        window.location.href =
        `/company/chats/${data.chatId}`

      } else {

        alert(data.message);

      }

    }}
  className="
rounded-2xl
border
border-blue-500/40
bg-blue-950/70
px-8
py-3
font-bold
text-blue-300
shadow-lg
shadow-blue-500/20
transition-all
hover:scale-105
hover:bg-blue-900/80
w-full
mt-3
"
  >
    💬 چت
  </button>
)}

    </div>
  );
}
