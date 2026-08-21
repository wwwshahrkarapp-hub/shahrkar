import { relatedSkill } from "./skill-relation-ai";



export function explainJobMatch(
  userSkills:string[],
  jobSkills:string[],
  userCity:string,
  jobCity:string
){

  const reasons:string[] = [];


  const user = userSkills.map(
    s => s.toLowerCase()
  );

  const job = jobSkills.map(
    s => s.toLowerCase()
  );


  
const matchedSkills:string[] = [];


for(const userSkill of userSkills){

  for(const jobSkill of jobSkills){

    if(
      userSkill.toLowerCase() === jobSkill.toLowerCase()
      ||
      relatedSkill(userSkill, jobSkill)
    ){

      matchedSkills.push(jobSkill);

    }

  }

}



 const commonSkills = [
  ...new Set(
    matchedSkills.map(
      s => s.toLowerCase()
    )
  )
];


if(commonSkills.length > 0){

  reasons.push(
    `✅ مهارت مشترک: ${commonSkills.join("، ")}`
  );

}


  if(userCity && jobCity){

    if(userCity === jobCity){

      reasons.push(
        "📍 شهر شما با محل کار یکسان است"
      );

    }else{

      reasons.push(
        "📍 شهر محل کار با شهر شما متفاوت است"
      );

    }

  }


  if(reasons.length === 0){

    reasons.push(
      "🔎 تطابق بر اساس دسته شغلی و اطلاعات آگهی"
    );

  }


  return reasons;

}
