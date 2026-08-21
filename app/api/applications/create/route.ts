import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
  uid,
  jobId,
  jobTitle,
  company,
  location,
  name,
  phone,
  email,
  message,
} = body;

    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          message: "uid الزامی است",
        },
        { status: 400 }
      );
    }

    if (!jobId) {
      return NextResponse.json(
        {
          success: false,
          message: "jobId الزامی است",
        },
        { status: 400 }
      );
    }

const jobDoc = await adminDb
  .collection("jobs")
  .doc(jobId)
  .get();

const job = jobDoc.exists
  ? jobDoc.data()
  : null;

const ownerUid = job?.ownerUid || "";

    const application = {
  uid,
  jobId,
  ownerUid,
  jobTitle: jobTitle || "",
  company: company || "",
  location: location || "",

  name: name || "",
  phone: phone || "",
  email: email || "",
  message: message || "",

  status: "در حال بررسی",
  createdAt: FieldValue.serverTimestamp(),
};

   const docRef = await adminDb
  .collection("applications")
  .add(application);

if(ownerUid){

  await adminDb
    .collection("notifications")
    .add({
      uid: ownerUid,
      message: `یک درخواست جدید برای شغل "${jobTitle}" دریافت کردید`,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
      type: "application",
    });

}

    return NextResponse.json({
      success: true,
      message: "درخواست استخدام با موفقیت ثبت شد",
      applicationId: docRef.id,
    });
  } catch (error: any) {
    console.error("APPLICATION CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message || "خطا در ثبت درخواست استخدام",
      },
      { status: 500 }
    );
  }
}
