export function extractSkills(
  title:string = "",
  description:string = ""
){

  const text = (
    title + " " + description
  )
  .toLowerCase()
  .replace(/ي/g,"ی")
  .replace(/ك/g,"ک");


  const skills = [
    "react",
    "next.js",
    "node",
    "node.js",
    "javascript",
    "typescript",
    "python",
    "java",
    "php",
    "laravel",
    "mysql",
    "mongodb",
    "firebase",
    "فتوشاپ",
    "طراحی",
    "فروش",
    "بازاریابی",
    "حسابداری",
    "اکسل",
    "رانندگی",
    "کامپیوتر",
    "تعمیر",
    "تعمیرکار",
    "لپ تاپ",
    "سیستم",
    "شبکه",
    "مکانیک",
    "ماشین سنگین",
    "تاسیسات",
    "کارگر ساده",
    "انبار",
    "کارخانه",
    "خدمات",
  ];


  const detected:string[] = [];


  for(const skill of skills){

    if(text.includes(skill)){
      detected.push(skill);
    }

  }


  return detected;

}
