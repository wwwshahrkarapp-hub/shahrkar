const { cert, initializeApp, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../firebase-admin-key.json");


const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id,
      })
    : getApps()[0];


const db = getFirestore(app, "default");


async function deleteCollection(name) {

  const snap = await db.collection(name).get();

  console.log(name, ":", snap.size, "documents");


  const batch = db.batch();


  snap.docs.forEach((doc)=>{
    batch.delete(doc.ref);
  });


  await batch.commit();


  console.log(name, "deleted");
}


async function run(){

  const collections = [
    "jobs",
    "applications",
    "chats",
    "notifications",
    "savedJobs"
  ];


  for(const col of collections){
    await deleteCollection(col);
  }


  console.log("DONE ✅");

  process.exit();

}


run();
