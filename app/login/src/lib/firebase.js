import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMPVddqvw2PU7afa4Pi58j17GeoEEHmJg",
  authDomain: "shahrkar-9a937.firebaseapp.com",
  projectId: "shahrkar-9a937",
  storageBucket: "shahrkar-9a937.firebasestorage.app",
  messagingSenderId: "57765704520",
  appId: "1:57765704520:web:34cbc7cc6f8b4b3c48397d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
