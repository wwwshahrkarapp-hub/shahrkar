import { relatedSkill } from "./skill-relation-ai";

export function calculateJobMatch(
  userSkills:string[],
  jobSkills:string[],
  userCity:string,
  jobCity:string
){

  let score = 0;


  // مهارت‌ها
  for(const skill of userSkills){

    for(const jobSkill of jobSkills){

      const user = skill.toLowerCase();
      const job = jobSkill.toLowerCase();


      // تطبیق مستقیم
      if(user === job){
        score += 20;
      }


      // تطبیق نزدیک
      else if(
        relatedSkill(skill, jobSkill)
      ){
        score += 10;
      }

    }

  }



  // شهر
  if(userCity && jobCity){

    if(
      userCity === jobCity
    ){
      score += 30;
    }

  }



  // سقف امتیاز
  if(score > 100){
    score = 100;
  }


  return score;

}
