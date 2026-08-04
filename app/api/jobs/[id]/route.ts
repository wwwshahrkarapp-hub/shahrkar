import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "jobs.json");

function getJobs() {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath, "utf8");
  return file ? JSON.parse(file) : [];
}

function saveJobs(jobs: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2), "utf8");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const jobs = getJobs();

  const job = jobs.find((j: any) => String(j.id) === id);

  if (!job) {
    return NextResponse.json(
      { error: "آگهی پیدا نشد." },
      { status: 404 }
    );
  }

  return NextResponse.json(job);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const jobs = getJobs();

  const filtered = jobs.filter((j: any) => String(j.id) !== id);

  saveJobs(filtered);

  return NextResponse.json({
    success: true,
    message: "آگهی حذف شد.",
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const jobs = getJobs();

  const index = jobs.findIndex((j: any) => String(j.id) === id);

  if (index === -1) {
    return NextResponse.json(
      { error: "آگهی پیدا نشد." },
      { status: 404 }
    );
  }

  jobs[index] = {
    ...jobs[index],
    ...body,
  };

  saveJobs(jobs);

  return NextResponse.json(jobs[index]);
}
