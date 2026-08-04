import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../firebase-admin-key.json";

console.log("KEY PROJECT:", serviceAccount.project_id);

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as any),
        projectId: serviceAccount.project_id,
      })
    : getApps()[0];

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app, "default");
