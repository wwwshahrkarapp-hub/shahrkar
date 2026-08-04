import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import key from "./firebase-admin-key.json";

const app = initializeApp({
  credential: cert(key as any),
});

const firestore = getFirestore(app);

async function run() {
  const dbs = await firestore.listCollections();
  console.log("Collections:");
  console.log(dbs.map(x => x.id));
}

run();
