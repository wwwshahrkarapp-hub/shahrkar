export function relatedSkill(
  userSkill:string,
  jobSkill:string
){

  const user = userSkill
    .toLowerCase()
    .trim();

  const job = jobSkill
    .toLowerCase()
    .trim();


  const relations:any = {

    "مکانیک":[
      "تعمیر",
      "تعمیرکار",
      "فنی"
    ],

    "تاسیسات":[
      "تعمیر",
      "سیستم",
      "فنی"
    ],

    "کارگر ساده":[
      "خدمات",
      "انبار",
      "کارخانه"
    ]

  };


  return (
    relations[userSkill]?.includes(jobSkill) ||
    relations[user]?.includes(job)
  );

}
