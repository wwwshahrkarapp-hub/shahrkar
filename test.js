const {initializeApp, cert} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

const key = require("./shahrkar-9a937-firebase-adminsdk-fbsvc-a140ad97e9.json");

initializeApp({
  credential: cert(key),
  projectId: "shahrkar-9a937"
});

const db = getFirestore();

db.collection("users")
.doc("check")
.set({
  hello:"world"
})
.then(()=>{
 console.log("SUCCESS");
})
.catch(err=>{
 console.log("CODE:",err.code);
 console.log(err.message);
});
