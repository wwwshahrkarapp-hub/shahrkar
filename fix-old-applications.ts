import { adminDb } from "./lib/firebase-admin";

async function fix() {

  const apps = [
    "yVQBGDsm8Eew6KtdXrN7",
    "byXeII9h01CW9R3xJ7xO"
  ];


  for (const id of apps) {

    await adminDb
      .collection("applications")
      .doc(id)
      .update({
        ownerUid: "n1IoPg0cxbNGMgeRVPEDphRjPLz2"
      });


    console.log("fixed:", id);
  }


  process.exit();
}


fix();
