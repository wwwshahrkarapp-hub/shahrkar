const { cert, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("./firebase-admin-key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

db.collection("test")
  .doc("hello")
  .set({
    ok: true,
    time: new Date().toISOString()
  })
  .then(() => {
    console.log("FIRESTORE OK");
    process.exit(0);
  })
  .catch((e) => {
    console.log("FIRESTORE ERROR:");
    console.log(e);
    process.exit(1);
  });
