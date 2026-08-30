import { adminDb } from "@/lib/firebase-admin"
import { FieldValue } from "firebase-admin/firestore"

const collection = "otpCodes"

export async function saveOtp(
  phone: string,
  code: string
) {
  await adminDb.collection(collection).doc(phone).set({
    code,
    createdAt: FieldValue.serverTimestamp(),
  })
}

export async function getOtp(
  phone: string
) {
  const snap = await adminDb
    .collection(collection)
    .doc(phone)
    .get()

  if (!snap.exists) {
    return null
  }

  return snap.data()?.code || null
}

export async function removeOtp(
  phone: string
) {
  await adminDb
    .collection(collection)
    .doc(phone)
    .delete()
}
