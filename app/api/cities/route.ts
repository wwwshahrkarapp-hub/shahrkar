import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function GET() {
  const snapshot = await adminDb
    .collection("jobs")
    .get();

  const cities = Array.from(
    new Set(
      snapshot.docs
        .map((doc) => doc.data().city)
        .filter(Boolean)
    )
  );

  return NextResponse.json(cities);
}
