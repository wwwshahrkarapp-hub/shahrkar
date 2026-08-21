import { NextRequest, NextResponse } from "next/server";
import { adminDb, adminAuth } from "@/lib/firebase-admin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
const authHeader = request.headers.get("authorization");

if (!authHeader) {
  return NextResponse.json(
    { message: "دسترسی غیرمجاز" },
    { status: 401 }
  );
}

const token = authHeader.replace("Bearer ", "");

const decoded = await adminAuth.verifyIdToken(token);

const userUid = decoded.uid;
    const body = await request.json();

    const docRef = adminDb
  .collection("applications")
  .doc(id);


const oldDoc = await docRef.get();


if (!oldDoc.exists) {
  return NextResponse.json(
    {
      message: "درخواست پیدا نشد",
    },
    {
      status: 404,
    }
  );
}


const application = oldDoc.data();



const isCompany = application?.ownerUid === userUid;
const isApplicant = application?.uid === userUid;

if (!isCompany && !isApplicant) {
  return NextResponse.json(
    {
      message: "شما اجازه تغییر این درخواست را ندارید",
    },
    {
      status: 403,
    }
  );
}

// کارجو فقط اجازه لغو دارد
if (isApplicant && body.status !== "لغو شده") {
  return NextResponse.json(
    {
      message: "کارجو فقط می‌تواند درخواست را لغو کند",
    },
    {
      status: 403,
    }
  );
}



await docRef.update({
  status: body.status,
});

  const updated = await docRef.get();
const updatedApplication = updated.data();

if (
  updatedApplication?.uid &&
  (body.status === "تأیید شد" || body.status === "رد شد")
) {

  await adminDb
    .collection("notifications")
    .add({
      uid: updatedApplication.uid,
      message:
        body.status === "تأیید شد"
          ? "درخواست استخدام شما تأیید شد ✅"
          : "درخواست استخدام شما رد شد ❌",
      read: false,
      createdAt: new Date().toISOString(),
    });

if (body.status === "تأیید شد") {

  await adminDb
    .collection("chats")
    .add({
      applicantUid: updatedApplication.uid,
      companyUid: updatedApplication.ownerUid,
      applicationId: id,
      createdAt: new Date().toISOString(),
    });

}

}

   return NextResponse.json({
      id: updated.id,
      ...updated.data(),
    });

  } catch (error: any) {
    console.error("UPDATE APPLICATION ERROR:", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "دسترسی غیرمجاز" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = await adminAuth.verifyIdToken(token);

    const userUid = decoded.uid;


    const docRef = adminDb
      .collection("applications")
      .doc(id);


    const oldDoc = await docRef.get();


    if (!oldDoc.exists) {
      return NextResponse.json(
        { message: "درخواست پیدا نشد" },
        { status: 404 }
      );
    }


    const application = oldDoc.data();


    if (application?.ownerUid !== userUid) {
      return NextResponse.json(
        {
          message: "شما اجازه حذف این درخواست را ندارید",
        },
        {
          status: 403,
        }
      );
    }


    await docRef.delete();


    return NextResponse.json({
      message: "درخواست حذف شد",
    });


  } catch (error: any) {

    console.error("DELETE APPLICATION ERROR:", error);


    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
