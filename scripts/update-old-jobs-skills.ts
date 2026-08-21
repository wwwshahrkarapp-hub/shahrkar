import { adminDb } from "../lib/firebase-admin";
import { extractSkills } from "../lib/job-ai";

async function updateJobs(){

  const snap = await adminDb
    .collection("jobs")
    .get();

  for(const doc of snap.docs){

    const job:any = doc.data();

   if(job.skills && job.skills.length > 0){
  console.log("SKIP:", job.title);
  continue;
}

    const skills = extractSkills(
      job.title || "",
      job.description || ""
    );

    await doc.ref.update({
      skills
    });

    console.log(
      "UPDATED:",
      job.title,
      skills
    );
  }

  console.log("DONE");
}

updateJobs();
