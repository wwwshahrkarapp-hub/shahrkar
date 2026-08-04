import { adminDb } from "./lib/firebase-admin";

async function test() {
  console.log("starting firestore test");

  const ref = adminDb.collection("_test").doc("hello");

  await ref.set({
    time: new Date().toISOString()
  });

  console.log("WRITE OK");

  const snap = await ref.get();

  console.log(snap.data());
}

test().catch(console.error);
