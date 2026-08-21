"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CompanyChatsPage(){

  const router = useRouter();
  const [chats,setChats] = useState<any[]>([]);

  useEffect(()=>{

    async function loadChats(){

      const savedUser = localStorage.getItem("user");
      if(!savedUser) return;

      const user = JSON.parse(savedUser);

      const res = await fetch("/api/chats",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          uid:user.uid
        })
      });

      const data = await res.json();

    if(data.success){

  const companyChats = data.chats.filter(
    (chat:any)=> chat.companyUid === user.uid
  );

  setChats(companyChats);

}
    }


    loadChats();

  },[]);



return (

  <main className="min-h-screen bg-black text-white p-3">

    <div className="mx-auto w-full max-w-2xl">

      <div className="
      rounded-2xl
      border
      border-yellow-500/30
      bg-zinc-950
      shadow-[0_0_25px_rgba(234,179,8,0.15)]
      p-5
      ">


        <h1 className="text-2xl font-bold">
          💬 گفتگوها با کارجو
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          محیط امن گفتگو در شهرکار
        </p>


        {
          chats.length===0 ?

          <p className="mt-5 text-zinc-400">
            هنوز گفتگویی ندارید
          </p>


          :


          <div className="mt-5 space-y-3">

          {
            chats.map((chat)=>(

              <div
              key={chat.id}
              onClick={()=>router.push(`/company/chats/${chat.id}`)}

              className="
              cursor-pointer
              rounded-2xl
              border
              border-yellow-500/20
              bg-zinc-900
              p-4
              shadow-lg
              shadow-yellow-500/5
              transition-all
              hover:scale-[1.02]
              hover:bg-zinc-800
              "
              >

                <div className="font-bold">
                  💬 گفتگو با کارجو
                </div>


                <div className="mt-1 text-sm text-zinc-400">
                  ورود به گفتگو
                </div>


              </div>

            ))
          }

          </div>

        }


      </div>

    </div>

    </main>

  );

}
