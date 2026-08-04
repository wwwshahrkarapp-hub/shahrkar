const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const key=require("./shahrkar-9a937-firebase-adminsdk-fbsvc-a140ad97e9.json");

initializeApp({
 credential: cert(key),
 projectId:"shahrkar-9a937"
});

const db=getFirestore();

db.settings({
 preferRest:true
});

db.collection("users").limit(1).get()
.then(s=>{
 console.log("OK",s.size);
})
.catch(e=>{
 console.log("ERR",e.code,e.message);
});
