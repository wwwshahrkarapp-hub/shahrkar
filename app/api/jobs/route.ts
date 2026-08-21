import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { detectJobCategory } from "@/lib/job-category-ai";
import { extractSkills } from "@/lib/job-ai";


// گرفتن همه آگهی‌ها
export async function GET() {
  try {

    const snapshot = await adminDb
  .collection("jobs")
  .orderBy("createdAt", "desc")
  .limit(20)
  .get();


    const jobs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));


console.log(
  jobs.map((j:any)=>({
    title:j.title,
    category:j.category
  }))
);

    return NextResponse.json(jobs);


  } catch (error:any) {

    console.log("JOBS GET ERROR:", error);

    return NextResponse.json(
      {
        error: error.message
      },
      {
        status:500
      }
    );

  }
}



// ثبت آگهی
export async function POST(req: Request) {

  try {

    const body = await req.json();
console.log("BODY RECEIVED:", body);

    const {
      title,
      company,
      city,
      salary,
      description,
      ownerUid,
        category,
  type,
    } = body;




// بررسی محدودیت اشتراک کارفرما

const companyDoc = await adminDb
  .collection("companies")
  .doc(ownerUid)
  .get();


let maxJobs = 1;


if(companyDoc.exists){

  const companyData:any = companyDoc.data();

  maxJobs = companyData.maxJobs || 1;

}


// شمارش آگهی‌های فعلی کارفرما

const jobsSnapshot = await adminDb
  .collection("jobs")
  .where("ownerUid","==",ownerUid)
  .get();



if(jobsSnapshot.size >= maxJobs){

  return NextResponse.json(
    {
      error:
      "تعداد آگهی‌های پلن شما تمام شده است. لطفاً اشتراک خود را ارتقا دهید."
    },
    {
      status:403
    }
  );

}





let finalCategory = category;

if(!finalCategory){

  finalCategory = detectJobCategory(
    title || "",
    description || ""
  ).category;

}


const skills = extractSkills(
  title || "",
  description || ""
);


const allowedCategories = [
  "simple-worker",
  "it",
  "marketing",
  "design",
  "mixed",
];

if (!allowedCategories.includes(finalCategory)) {
  return NextResponse.json(
    {
      error:"دسته‌بندی نامعتبر است."
    },
    {
      status:400
    }
  );
}



console.log("CHECK FIELDS:", {
  title,
  company,
  city,
  description,
  finalCategory,
  type,
  ownerUid
});



    if (
      !title ||
      !company ||
      !city ||
     !description ||
!finalCategory ||
!ownerUid
      
    ) {

      return NextResponse.json(
        {
          error:"تمام فیلدها الزامی هستند."
        },
        {
          status:400
        }
      );

    }



    const jobRef = await adminDb
    
.collection("jobs")
.add({
  title,
  company,
  city,
  salary,
  description,

  category: finalCategory,

  skills,

  type,
  ownerUid,

  status:"active",

  createdAt: FieldValue.serverTimestamp(),
});



    return NextResponse.json({

      success:true,

      id:jobRef.id

    });



  } catch(error:any) {


    console.log("JOBS POST ERROR:", error);


    return NextResponse.json(
      {
        error:error.message
      },
      {
        status:500
      }
    );


  }

}
