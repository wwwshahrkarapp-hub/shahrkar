"use client";

import { useEffect, useState } from "react";


export default function ApplicantProfilePage() {

  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  const [personalOpen, setPersonalOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");


  useEffect(() => {

    async function loadProfile() {

      try {

        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          setLoading(false);
          return;
        }


        const user = JSON.parse(savedUser);


        const res = await fetch("/api/profile/get", {
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
          body:JSON.stringify({
            uid:user.uid,
          }),
        });


        const data = await res.json();


        if(data.success && data.user){

          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setPhone(data.user.phone || "");
          setCity(data.user.city || "");

          setSkills(data.user.skills || []);

          setExperience(
            data.user.experience || ""
          );

          setAbout(
            data.user.about || ""
          );

        }


      } catch(error){

        console.log(
          "LOAD PROFILE ERROR",
          error
        );


      } finally {

        setLoading(false);

      }

    }


    loadProfile();


  }, []);



  async function saveProfile(){

    try{


      const savedUser =
        localStorage.getItem("user");


      if(!savedUser){

        alert("کاربر پیدا نشد");
        return;

      }


      const user = JSON.parse(savedUser);


      const res = await fetch(
        "/api/profile/save",
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json",
          },

          body:JSON.stringify({

            uid:user.uid,

            name,
            email,
            phone,
            city,
            skills,
            experience,
            about,

          }),

        }
      );


      const data = await res.json();


      console.log(
        "SAVE RESULT",
        data
      );


      setSaved(true);


    }catch(error){

      console.log(
        "SAVE ERROR",
        error
      );

      alert(
        "خطا در ذخیره اطلاعات"
      );

    }

  }



  if(loading){

    return(
      <div className="min-h-screen flex items-center justify-center">
        در حال بارگذاری...
      </div>
    );

  }


  return (

    <div className="
      min-h-screen
      bg-background
      px-3
      py-5
      text-foreground
    ">


    <div className="
  mx-auto
  max-w-2xl
  rounded-3xl
  border
  border-yellow-500/40
  bg-card
  p-5
  shadow-xl
  shadow-yellow-500/10
">


        <h1 className="
          text-right
          text-3xl
          font-bold
        ">
          پروفایل کارجو
        </h1>


        <p className="
          mt-2
          text-right
          text-sm
          text-muted-foreground
        ">
          اطلاعات شخصی و حرفه‌ای خود را تکمیل کنید.
        </p>
        {/* اطلاعات شخصی */}

        <section
          onClick={() =>
            setPersonalOpen(!personalOpen)
          }
        className="
  mt-5
  cursor-pointer
  rounded-2xl
  border
  border-yellow-500/20
  bg-black/40
  p-4
  transition-all
  hover:border-yellow-500/40
  hover:shadow-lg
  hover:shadow-yellow-500/10
"
        >

          <h2 className="
            mb-3
            text-right
            text-lg
            font-bold
          ">
            اطلاعات شخصی
          </h2>


          {!personalOpen ? (

            <div className="
              space-y-2
              text-sm
            ">

              <div className="flex justify-between">
                <span>{name || "-"}</span>
                <span className="text-muted-foreground">
                  نام
                </span>
              </div>


              <div className="flex justify-between">
                <span dir="ltr">
                  {email || "-"}
                </span>

                <span className="text-muted-foreground">
                  ایمیل
                </span>
              </div>


              <div className="flex justify-between">
                <span dir="ltr">
                  {phone || "-"}
                </span>

                <span className="text-muted-foreground">
                  تماس
                </span>
              </div>


              <div className="flex justify-between">
                <span>
                  {city || "-"}
                </span>

                <span className="text-muted-foreground">
                  شهر
                </span>
              </div>

            </div>


          ) : (

            <div
              onClick={(e)=>e.stopPropagation()}
              className="space-y-3"
            >

              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="نام"
                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-3
                  text-right
                "
              />


              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="ایمیل"
                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-3
                  text-right
                "
              />


              <input
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                placeholder="شماره تماس"
                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-3
                  text-right
                "
              />


              <input
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                placeholder="شهر"
                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-3
                  text-right
                "
              />

            </div>

          )}

        </section>




        {/* مهارت ها */}

        <section
          onClick={() =>
            setSkillsOpen(!skillsOpen)
          }

       className="
  mt-5
  cursor-pointer
  rounded-2xl
  border
  border-yellow-500/20
  bg-black/40
  p-4
  transition-all
  hover:border-yellow-500/40
  hover:shadow-lg
  hover:shadow-yellow-500/10
"
        >

          <h2 className="
            mb-3
            text-right
            text-lg
            font-bold
          ">
            مهارت‌ها
          </h2>


          <div className="
            flex
            flex-wrap
            justify-end
            gap-2
          ">

            {skills.map((skill)=>(
              <span
                key={skill}
                className="
                  rounded-full
                  bg-gold/20
                  px-3
                  py-1
                  text-xs
                  text-gold
                "
              >
                {skill}
              </span>
            ))}

          </div>



          {skillsOpen && (

            <div
              onClick={(e)=>e.stopPropagation()}
              className="
                mt-4
                space-y-3
              "
            >

              <input

                value={newSkill}

                onChange={(e)=>
                  setNewSkill(e.target.value)
                }

                placeholder="مهارت جدید"

                className="
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-3
                  text-right
                "

              />


              <button

                onClick={()=>{

                  if(newSkill.trim()){

                    setSkills([
                      ...skills,
                      newSkill.trim()
                    ]);

                    setNewSkill("");

                  }

                }}

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
"

              >

                افزودن مهارت

              </button>


            </div>

          )}

        </section>
        {/* سابقه کار */}

        <section
          onClick={() =>
            setWorkOpen(!workOpen)
          }

          className="
            mt-3
            cursor-pointer
            rounded-2xl
            border
            border-border
            bg-background
            p-4
          "
        >

          <h2 className="
            mb-3
            text-right
            text-lg
            font-bold
          ">
            سابقه کار
          </h2>


          {!workOpen ? (

            <p className="
              text-right
              text-sm
              text-muted-foreground
            ">
              {experience || "تجربه کاری ثبت نشده"}
            </p>


          ) : (

            <div
              onClick={(e)=>e.stopPropagation()}
            >

              <textarea

                value={experience}

                onChange={(e)=>
                  setExperience(e.target.value)
                }

                placeholder="تجربه کاری..."

                className="
                  h-32
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-3
                  text-right
                "

              />

            </div>

          )}

        </section>



        {/* درباره من */}

        <section

          onClick={() =>
            setAboutOpen(!aboutOpen)
          }

         className="
  mt-5
  cursor-pointer
  rounded-2xl
  border
  border-yellow-500/20
  bg-black/40
  p-4
  transition-all
  hover:border-yellow-500/40
  hover:shadow-lg
  hover:shadow-yellow-500/10
"

        >

          <h2 className="
            mb-3
            text-right
            text-lg
            font-bold
          ">
            درباره من
          </h2>



          {!aboutOpen ? (

            <p className="
              text-right
              text-sm
              text-muted-foreground
            ">
              {about || "توضیحی ثبت نشده"}
            </p>


          ) : (

            <div
              onClick={(e)=>e.stopPropagation()}
            >

              <textarea

                value={about}

                onChange={(e)=>
                  setAbout(e.target.value)
                }

                placeholder="درباره خودتان بنویسید..."

                className="
                  h-32
                  w-full
                  rounded-xl
                  border
                  border-border
                  bg-card
                  p-3
                  text-right
                "

              />

            </div>

          )}

        </section>



      {/* ذخیره */}

<div className="mt-8 flex justify-center">

<button

type="button"

onClick={saveProfile}

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

ذخیره پروفایل

</button>

</div>

        {saved && (

          <div

            className="
              mt-3
              rounded-xl
              bg-gold/20
              p-3
              text-center
              text-sm
              text-gold
            "

          >

            ✅ پروفایل با موفقیت ذخیره شد

          </div>

        )}


      </div>

    </div>

  );

}
