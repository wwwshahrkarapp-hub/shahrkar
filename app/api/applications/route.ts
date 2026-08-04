import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "applications.json");

export async function GET() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf8");
  }

  const body = await request.json();

  const applications = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const newApplication = {
    id: Date.now(),
    ...body,
    status: "در انتظار",
    createdAt: new Date().toISOString(),
  };

  applications.push(newApplication);

  fs.writeFileSync(
    filePath,
    JSON.stringify(applications, null, 2),
    "utf8"
  );

  return NextResponse.json(newApplication);
}
