export function calculateJobRanking(
  matchScore:number,
  cityMatch:boolean,
  createdAt:any
){

  let score = matchScore;


  // شهر یک امتیاز مهم دارد
  if(cityMatch){
    score += 20;
  }


  // تازگی آگهی
  if(createdAt){

    const created =
      createdAt.seconds
        ? createdAt.seconds * 1000
        : new Date(createdAt).getTime();


    const days =
      (
        Date.now() - created
      ) /
      (1000 * 60 * 60 * 24);


    if(days < 7){

      score += 10;

    }

  }


  if(score > 100){

    score = 100;

  }


  return score;

}
