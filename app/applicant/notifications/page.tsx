'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCircle2, XCircle } from "lucide-react";
function formatDate(date:string){

  return new Date(date).toLocaleString("fa-IR",{
    dateStyle:"medium",
    timeStyle:"short",
  });

}

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState<any[]>([]);
const router = useRouter();

  useEffect(() => {

    async function loadNotifications(){

      const savedUser = localStorage.getItem("user");

      if(!savedUser) return;


      const user = JSON.parse(savedUser);


      const res = await fetch("/api/notifications",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          uid:user.uid
        })
      });


      const data = await res.json();


     if(data.success){

  setNotifications(data.notifications);


  data.notifications.forEach(async(item:any)=>{

    await fetch("/api/notifications/read",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        id:item.id,
      }),
    });

  });

}

    }


    loadNotifications();

  },[]);



  return (

 <div className="rounded-2xl border border-border bg-card p-5">

  <h1 className="text-xl font-bold mb-6 text-right">
    🔔 اعلان‌ها
  </h1>


  <div className="flex justify-between items-center mb-5 gap-3">

<button
  onClick={async()=>{

    const savedUser = localStorage.getItem("user");

    if(!savedUser) return;

    const user = JSON.parse(savedUser);

    const res = await fetch("/api/notifications/read-all",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        uid:user.uid,
      }),
    });

    const data = await res.json();

    if(data.success){

      setNotifications((prev)=>
        prev.map((item)=>({
          ...item,
          read:true
        }))
      );

    }

  }}
  className="rounded-xl bg-gold px-5 py-2 font-bold text-black"
>
  خواندن همه اعلان‌ها
</button>

    <button
      onClick={() => window.history.back()}
      className="bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold"
    >
      ➡ برگشت
    </button>


   <button
  onClick={async()=>{

    const savedUser = localStorage.getItem("user");

    if(!savedUser) return;

    const user = JSON.parse(savedUser);


    if(!confirm("همه اعلان‌ها حذف شوند؟")) return;


    const res = await fetch("/api/notifications/delete-all",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        uid:user.uid,
      }),
    });


    const data = await res.json();


    if(data.success){

      setNotifications([]);

    }else{

      alert(data.message || "حذف انجام نشد");

    }

  }}
  className="bg-red-600 text-white px-5 py-2 rounded-xl font-bold"
>
  🗑 حذف همه
</button>


  </div>


      {notifications.length === 0 ? (

        <p className="mt-4 text-muted-foreground">
          اعلان جدیدی ندارید
        </p>

      ) : (

        <div className="mt-5 space-y-3">
{notifications.map((item:any)=>(

  <div
    key={item.id}
className={`
      flex items-start justify-between gap-4 rounded-2xl p-4 border
      transition-all duration-300
      hover:scale-[1.02]
      hover:shadow-lg
      ${
        item.read
          ? "bg-secondary border-border"
          : "bg-gold/10 border-gold animate-pulse"
      }
    `}    
  >

    <div className="flex items-center gap-3">

      {
  item.message?.includes("تأیید")
  ?
  <CheckCircle2 className="size-6 text-green-500" />
  :
  item.message?.includes("رد")
  ?
  <XCircle className="size-6 text-red-500" />
  :
  <Bell className="size-6 text-gold" />
}


      <div>

        <p className="font-bold">
          {item.message}
        </p>


        <p className="mt-1 text-xs text-muted-foreground">
          {item.createdAt && formatDate(item.createdAt)}
        </p>

      </div>

    </div>


    <button
      onClick={async()=>{

        const res = await fetch("/api/notifications/delete",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            id:item.id,
          }),
        });


        const data = await res.json();


        if(data.success){

          setNotifications((prev)=>
            prev.filter((n)=>n.id !== item.id)
          );

        }

      }}
      className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white"
    >
      حذف
        </button>
   </div>

))}

        </div>

      )}

    </div>

  )
}
