import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./lib/firebase";

async function test(){

  const user = await signInWithEmailAndPassword(
    auth,
    "test@test.com",
    "12345678"
  );

  console.log("LOGIN OK");
  console.log(user.user.uid);

}

test().catch(e=>{
  console.log("ERROR:");
  console.log(e.code);
  console.log(e.message);
});
