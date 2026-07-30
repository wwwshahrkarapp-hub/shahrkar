import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const { title, company, city, salary, description } = body;

  if (!title || !company || !city || !salary || !description) {
    return NextResponse.json(
      { error: "تمام فیلدها الزامی هستند." },
      { status: 400 }
    );
  }

  db.prepare(`
    INSERT INTO jobs
    (title, company, city, salary, description)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, company, city, salary, description);

  return NextResponse.json({
    success: true,
  });
}
