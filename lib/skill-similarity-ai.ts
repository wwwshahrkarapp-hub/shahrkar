export const similarSkills:{[key:string]:string[]} = {

  "مکانیک":[
    "تعمیرکار",
    "فنی",
    "تعمیر",
    "ماشین",
    "خودرو"
  ],


  "تاسیسات":[
    "لوله کشی",
    "فنی",
    "خدمات",
    "نصب",
    "تعمیر"
  ],


  "کارگر ساده":[
    "کارخانه",
    "انبار",
    "خدمات",
    "نیرو"
  ],


  "کامپیوتر":[
    "سیستم",
    "لپ تاپ",
    "شبکه",
    "تعمیرکار"
  ],


  "برنامه نویس":[
    "react",
    "javascript",
    "typescript",
    "نرم افزار",
    "وب"
  ]

};


export function isSimilarSkill(
  userSkill:string,
  jobSkill:string
){

  const skill =
    userSkill.toLowerCase();


  const target =
    jobSkill.toLowerCase();


  if(skill === target){
    return true;
  }


  const similar =
    similarSkills[userSkill];


  if(!similar){
    return false;
  }


  return similar.some(
    item =>
      target.includes(
        item.toLowerCase()
      )
  );

}
