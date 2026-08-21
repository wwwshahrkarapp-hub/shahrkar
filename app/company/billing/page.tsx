"use client";


import { useEffect, useState } from "react";
export default function CompanyBillingPage(){

const upgradePlan = async (plan:string)=>{

const user = JSON.parse(
localStorage.getItem("user") || "{}"
);


const res = await fetch(
"/api/company/billing/update",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
uid:user.uid,
plan
})

}
);


const data = await res.json();


if(data.success){

setBilling(data.billing);

alert("اشتراک با موفقیت تغییر کرد");

}

};



const [billing,setBilling] = useState<any>(null);


useEffect(()=>{

const savedUser = localStorage.getItem("user");

if(!savedUser) return;


const user = JSON.parse(savedUser);




const upgradePlan = async(plan:string)=>{


const user = JSON.parse(
localStorage.getItem("user") || "{}"
);



const res = await fetch(
"/api/company/billing/update",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

uid:user.uid,

plan

})

}

);



const data = await res.json();


if(data.success){

setBilling(data.billing);

alert("اشتراک با موفقیت تغییر کرد");

}


};





fetch("/api/company/billing/get",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
uid:user.uid
})

})

.then(res=>res.json())

.then(data=>{

if(data.success){

setBilling(data.billing);

}

});


},[]);



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
shadow-lg
shadow-yellow-500/20
"
>
⭐
</div>


<div className="mr-3">

<h2 className="text-xl font-extrabold text-yellow-300">
شهرکار
</h2>

<p className="text-xs text-gray-400">
مالی و اشتراک کارفرما
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


<h1
className="
mb-5
text-xl
font-extrabold
text-yellow-300
"
>
💳 اشتراک شما
</h1>



<div
className="
rounded-2xl
border
border-yellow-500/40
bg-yellow-950/70
p-5
shadow-lg
shadow-yellow-500/20
"
>


<p className="font-bold text-yellow-300">
پلن فعلی
</p>


<p className="mt-2 text-white">
{billing?.plan || "رایگان"}
</p>


</div>



<div className="mt-4 grid gap-4">


<div
className="
rounded-2xl
border
border-zinc-700
bg-zinc-900
p-5
"
>

<p className="text-gray-400">
تعداد آگهی مجاز
</p>

<p className="mt-2 text-xl font-bold">
{billing?.maxJobs || 1} آگهی
</p>

</div>



<div
className="
rounded-2xl
border
border-zinc-700
bg-zinc-900
p-5
"
>

<p className="text-gray-400">
وضعیت اشتراک
</p>

<p className="mt-2 text-green-300 font-bold">
{billing?.subscriptionStatus || "فعال"}
</p>

</div>


</div>



<button

className="
mt-6
w-full
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


<div className="mt-6 grid gap-3">


<button

onClick={()=>upgradePlan("pro")}

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
"

>

⭐ پلن حرفه‌ای - ۱۰ آگهی

</button>



<button

onClick={()=>upgradePlan("business")}

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

🏢 پلن سازمانی - ۵۰ آگهی

</button>


</div>



</button>



</div>


</main>

);

}
