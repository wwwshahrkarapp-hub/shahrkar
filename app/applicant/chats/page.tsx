"use client";

import { useEffect, useState } from "react";

export default function ChatsPage(){

  const [chats,setChats] = useState<any[]>([]);


  useEffect(()=>{

    async function loadChats(){

      const savedUser = localStorage.getItem("user");

      if(!savedUser) return;


      const user = JSON.parse(savedUser);


      const res = await fetch("/api/chats",{
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
        setChats(data.chats);
      }

    }


    loadChats();

  },[]);



  return (

    <div className="rounded-2xl border border-border bg-card p-5">

      <h1 className="text-xl font-bold">
        💬 گفتگوها
      </h1>


      {
        chats.length === 0 ?

        <p className="mt-4 text-muted-foreground">
          هنوز گفتگویی ندارید
        </p>

        :

        <div className="mt-5 space-y-3">

          {
            chats.map((chat)=>(

              <div
                key={chat.id}
                className="rounded-xl bg-secondary p-4"
              >

                گفتگو با کارفرما

              </div>

            ))
          }

        </div>

      }


    </div>

  )

}
