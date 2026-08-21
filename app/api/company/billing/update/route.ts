import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";


export async function POST(req:Request){

try{

const {
uid,
plan
}=await req.json();


if(!uid || !plan){

return NextResponse.json(
{
error:"اطلاعات ناقص است"
},
{
status:400
}
);

}



let data:any={};



if(plan==="pro"){

data={

plan:"pro",

maxJobs:10,

subscriptionStatus:"active",

updatedAt:new Date().toISOString()

};

}



if(plan==="business"){

data={

plan:"business",

maxJobs:50,

subscriptionStatus:"active",

updatedAt:new Date().toISOString()

};

}



await adminDb
.collection("companies")
.doc(uid)
.set(
data,
{
merge:true
}
);



return NextResponse.json({

success:true,

billing:data

});



}catch(error:any){


return NextResponse.json({

error:error.message

},
{
status:500
});


}

}
