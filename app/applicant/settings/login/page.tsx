"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/page-header";


export default function LoginSettingsPage(){

  const router = useRouter();

  const [uid,setUid] = useState("");
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");

  const [loading,setLoading] = useState(false);


  useEffect(()=>{

    async function loadUser(){

      const savedUser = localStorage.getItem("user");

      if(!savedUser) return;


      const user = JSON.parse(savedUser);

      setUid(user.uid);


      const res = await fetch("/api/profile/get",{
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

        setPhone(data.user.phone || "");
        setEmail(data.user.email || "");

      }

    }


    loadUser();

  },[]);



  async function saveLogin(){

    setLoading(true);


    const res = await fetch(
      "/api/account/update-login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          uid,
          phone,
          email

        })
      }
    );


    const data = await res.json();


    setLoading(false);


    if(data.success){

      alert("اطلاعات ورود ذخیره شد ✅");

    }else{

      alert(data.message || "خطا");

    }

  }



return (

<main className="min-h-screen bg-black text-white p-6">
<PageHeader />

<div className="max-w-lg mx-auto">

<h1 className="text-xl font-bold mb-6">
🔐 مدیریت ورود
</h1>



<div className="
rounded-2xl
border
border-zinc-800
bg-zinc-900/80
p-5
shadow-lg
shadow-black/30
">


<label className="block mb-2 text-zinc-300">
شماره موبایل
</label>


<input

value={phone}

onChange={(e)=>setPhone(e.target.value)}

className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-4
py-3
text-white
outline-none
focus:border-yellow-500
"

/>



<label className="block mb-2 text-zinc-300">
ایمیل
</label>


<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-950/70
px-4
py-3
text-white
outline-none
focus:border-yellow-500
"

/>



<button

onClick={saveLogin}

disabled={loading}

className="
mt-5
w-full
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

{loading ? "در حال ذخیره..." : "ذخیره تغییرات"}

</button>



<button

onClick={()=>router.back()}

className="
mt-3
w-full
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

بازگشت

</button>


</div>


</div>


</main>

);

}
