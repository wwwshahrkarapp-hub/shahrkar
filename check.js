const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const key = require("./shahrkar-9a937-firebase-adminsdk-fbsvc-a140ad97e9.json");

initializeApp({
  credential: cert(key),
  projectId: "shahrkar-9a937"
});

const db = getFirestore();

async function test(){

  try {

    const snap = await db.collection("users").limit(1).get();

    console.log("SUCCESS");
    console.log("COUNT:", snap.size);

    snap.forEach(doc=>{
      console.log(doc.id, doc.data());
    });

  } catch(e){

    console.log("CODE:", e.code);
    console.log("MESSAGE:", e.message);
  }

}

test();
