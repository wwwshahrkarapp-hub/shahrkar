import { adminDb } from "@/lib/firebase-admin";

async function main(){

  const id = "qyBfYiUofZoReVk4fIb7";

  await adminDb
    .collection("jobs")
    .doc(id)
    .delete();

  console.log("deleted:", id);

}

main();
