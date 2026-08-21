"use client";

import { useEffect, useState } from "react";

export default function CompanyAccountPage(){



  const [user,setUser] = useState<any>(null);
const [edit,setEdit] = useState(false);

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [city,setCity] = useState("");




  useEffect(()=>{

    const savedUser = localStorage.getItem("user");

    if(savedUser){
      const data = JSON.parse(savedUser);
      setUser(data);

      fetch("/api/profile/get",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          uid:data.uid
        })
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.success){
          setUser(data.user);


setName(data.user.name || "");
setEmail(data.user.email || "");
setPhone(data.user.phone || "");
setCity(data.user.city || "");



        }
      });

    }

  },[]);




const saveAccount = async()=>{

  const res = await fetch("/api/profile/save",{

    method:"POST",

    headers:{
      "Content-Type":"application/json"
    },

    body:JSON.stringify({
      uid:user.uid,
      name,
      email,
      phone,
      city
    })

  });


  const data = await res.json();


  if(data.success){

    alert("اطلاعات حساب ذخیره شد");

    setEdit(false);

  }else{

    alert("ذخیره اطلاعات انجام نشد");

  }

};





  return (

    <main className="min-h-screen bg-black p-6 text-white">


      <div
      className="
      mb-6
      flex
      items-center
      rounded-3xl
      border
      border-yellow-500/30
      bg-zinc-950/90
      px-5
      py-4
      shadow-xl
      shadow-yellow-500/10
      "
      >

        <div
        className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-2xl
        border
        border-yellow-500/40
        bg-yellow-950/70
        text-2xl
        "
        >
          ⭐
        </div>


        <div className="mr-3">

          <h2 className="text-xl font-extrabold text-yellow-300">
            شهرکار
          </h2>

          <p className="text-xs text-gray-400">
            حساب کاربری کارفرما
          </p>

        </div>


      </div>



      <div
      className="
      mx-auto
      max-w-2xl
      rounded-3xl
      border
      border-yellow-500/20
      bg-zinc-950/90
      p-6
      shadow-xl
      shadow-yellow-500/10
      "
      >


        <h1 className="
        mb-5
        text-xl
        font-extrabold
        text-yellow-300
        ">
          👤 اطلاعات حساب
        </h1>


        <div className="space-y-4 text-gray-300">

          <p>
            نام:
            <span className="mr-2 text-white">
              {user?.name || "-"}
            </span>
          </p>


          <p>
            ایمیل:
            <span className="mr-2 text-white">
              {user?.email || "-"}
            </span>
          </p>


          <p>
            شماره تماس:
            <span className="mr-2 text-white">
              {user?.phone || "-"}
            </span>
          </p>


          <p>
            شهر:
            <span className="mr-2 text-white">
              {user?.city || "-"}
            </span>
          </p>

<button

onClick={()=>setEdit(!edit)}

className="
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
px-8
py-3
font-bold
text-yellow-300
shadow-lg
shadow-yellow-500/20
transition-all
hover:scale-105
hover:bg-yellow-900/80
w-full
"

>

✏️ ویرایش اطلاعات

</button>



{edit && (

<div
className="
mt-5
rounded-3xl
border
border-yellow-500/20
bg-zinc-950/90
p-6
shadow-xl
shadow-yellow-500/10
"
>


<div className="space-y-4">


<input

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="نام"

className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"

/>



<input

value={email}

onChange={(e)=>setEmail(e.target.value)}

placeholder="ایمیل"

className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"

/>



<input

value={phone}

onChange={(e)=>setPhone(e.target.value)}

placeholder="شماره تماس"

className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"

/>



<input

value={city}

onChange={(e)=>setCity(e.target.value)}

placeholder="شهر"

className="
w-full
rounded-2xl
border
border-zinc-700
bg-zinc-900
px-5
py-3
text-white
focus:border-yellow-500
focus:ring-2
focus:ring-yellow-500/20
"

/>



<button

onClick={saveAccount}

className="
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
w-full
"

>

💾 ذخیره اطلاعات حساب

</button>


</div>



</div>

)}


        </div>


      </div>


    </main>

  );

}
