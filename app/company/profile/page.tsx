"use client";

import { useEffect, useState } from "react";

export default function CompanyProfilePage() {

  const [uid, setUid] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [about, setAbout] = useState("");
const [saving, setSaving] = useState(false);
const [message, setMessage] = useState("");


  useEffect(() => {

    async function loadCompany() {

      const savedUser = localStorage.getItem("user");

      if (!savedUser) return;


      const user = JSON.parse(savedUser);

      setUid(user.uid);


      const res = await fetch(
        "/api/company/profile/get",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            uid:user.uid
          })
        }
      );


      const data = await res.json();


      if(data.success){

        const company = data.company;

        setName(company.name || "");
        setEmail(company.email || "");
        setPhone(company.phone || "");
        setCity(company.city || "");
        setAbout(company.about || "");

      }

    }


    loadCompany();

  }, []);


async function saveProfile(){

  try{

    setSaving(true);
    setMessage("");

    const res = await fetch(
      "/api/company/profile/save",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          uid,
          name,
          email,
          phone,
          city,
          about
        })
      }
    );


    const data = await res.json();


    if(data.success){

      setMessage("✅ اطلاعات شرکت با موفقیت ذخیره شد");

    }else{

      setMessage("❌ ذخیره اطلاعات انجام نشد");

    }


  }catch(error){

    setMessage("❌ خطا در ارتباط با سرور");

  }finally{

    setSaving(false);

  }

}  


return (
<main className="min-h-screen bg-black p-4 text-white">

  <div
    className="
    mb-5
    flex
    items-center
    justify-between
    rounded-3xl
    border
    border-yellow-500/30
    bg-zinc-950/90
    px-4
    py-3
    shadow-xl
    shadow-yellow-500/10
    "
  >

    <div className="flex items-center gap-3">

      <div
        className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        border
        border-yellow-500/40
        bg-yellow-950/70
        text-xl
        shadow-lg
        shadow-yellow-500/20
        "
      >
        ⭐
      </div>


      <div>

        <h2 className="text-lg font-extrabold text-yellow-300">
          شهرکار
        </h2>

        <p className="text-xs text-gray-400">
          پنل کارفرما
        </p>

      </div>

    </div>

  </div>


  <div className="mx-auto max-w-xl">


    <h1
      className="
      mb-4
      text-lg
      font-extrabold
      text-yellow-300
      "
    >
      ویرایش پروفایل شرکت
    </h1>



    <div
      className="
      rounded-3xl
      border
      border-yellow-500/20
      bg-zinc-950/90
      p-4
      space-y-4
      shadow-xl
      shadow-yellow-500/10
      "
    >


      {[
        ["نام شرکت", name, setName],
        ["ایمیل", email, setEmail],
        ["شماره تماس", phone, setPhone],
        ["شهر", city, setCity],
      ].map(([label,value,setter]:any)=>(

        <div key={label}>

          <label
            className="
            mb-1.5
            block
            text-xs
            font-bold
            text-yellow-300
            "
          >
            {label}
          </label>


          <input

            value={value}

            onChange={(e)=>setter(e.target.value)}

            className="
            w-full
            rounded-xl
            border
            border-zinc-700
            bg-zinc-900
            px-4
            py-3
            text-sm
            text-white
            shadow-inner
            transition-all
            focus:border-yellow-500
            focus:ring-2
            focus:ring-yellow-500/20
            "

          />

        </div>

      ))}



      <div>

        <label
        className="
        mb-1.5
        block
        text-xs
        font-bold
        text-yellow-300
        "
        >
          درباره شرکت
        </label>


        <textarea

        value={about}

        onChange={(e)=>setAbout(e.target.value)}

        className="
        h-28
        w-full
        rounded-xl
        border
        border-zinc-700
        bg-zinc-900
        px-4
        py-3
        text-sm
        text-white
        transition-all
        focus:border-yellow-500
        focus:ring-2
        focus:ring-yellow-500/20
        "

        />

      </div>



      <button

      onClick={saveProfile}

      className="
      rounded-2xl
      border
      border-green-500/40
      bg-green-950/70
      px-6
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

      {saving ? "در حال ذخیره..." : "ذخیره اطلاعات"}

      </button>



    </div>


  </div>


</main>
);
}
