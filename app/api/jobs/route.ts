import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "jobs.json");

// گرفتن همه آگهی‌ها
export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }

    const file = fs.readFileSync(filePath, "utf8");
    const jobs = file ? JSON.parse(file) : [];

    return NextResponse.json(jobs);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

// ثبت آگهی
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, company, city, salary, description } = body;

    if (!title || !company || !city || !salary || !description) {
      return NextResponse.json(
        { error: "تمام فیلدها الزامی هستند." },
        { status: 400 }
      );
    }

    let jobs: any[] = [];

    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath, "utf8");
      jobs = file ? JSON.parse(file) : [];
    }

    const newJob = {
      id: Date.now(),
      title,
      company,
      city,
      salary,
      description,
      createdAt: new Date().toISOString(),
    };

    jobs.push(newJob);

    fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));

    return NextResponse.json(newJob);
  } catch {
    return NextResponse.json(
      { error: "خطای سرور" },
      { status: 500 }
    );
  }
}
