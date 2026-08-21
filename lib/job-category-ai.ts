export function detectJobCategory(
  title:string = "",
  description:string = ""
){

const text = (
 title + " " + description
)
.toLowerCase()
.replace(/ي/g,"ی")
.replace(/ك/g,"ک")
.replace(/\s+/g," "); 


  const normalizedText = text
    .replace(/ي/g,"ی")
    .replace(/ك/g,"ک")
    .replace(/\u200c/g," ");


  const rules = {


  it:[
 "برنامه نویس",
 "برنامه‌نویس",
 "کامپیوتر",
 "لپ تاپ",
 "لپ‌تاپ",
 "لپتاپ",
 "لب تاپ",
 "لبتاپ",
 "شبکه",
 "نرم افزار",
 "نرم‌افزار",
 "سایت",
 "وب",
 "react",
 "تکنولوژی",
 "تعمیر",
 "سیستم",
 "موبایل"
],


    marketing:[
      "فروش",
      "بازاریاب",
      "ویزیتور",
      "فروشنده",
      "تبلیغات"
    ],


    design:[
      "طراح",
      "گرافیک",
      "فتوشاپ",
      "تصویر",
      "هنر"
    ],


    "simple-worker":[
      "کارگر",
      "ساده",
      "نیرو",
      "کارخانه",
      "انبار",
      "خدمات"
    ]

  };


  let bestCategory = "mixed";
  let score = 0;


  for(const category in rules){

    let count = 0;

    for(const word of rules[category as keyof typeof rules]){

      if(normalizedText.includes(word)){
        count++;
      }

    }


    if(count > score){
      score = count;
      bestCategory = category;
    }

  }


  return {
    category:bestCategory,
    confidence:score
  };

}
