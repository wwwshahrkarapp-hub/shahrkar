import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "applications.json");

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "فایل پیدا نشد." },
      { status: 404 }
    );
  }

  const body = await request.json();

  const applications = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const index = applications.findIndex(
    (item: any) => String(item.id) === id
  );

  if (index === -1) {
    return NextResponse.json(
      { error: "درخواست پیدا نشد." },
      { status: 404 }
    );
  }

  applications[index] = {
    ...applications[index],
    ...body,
  };

  fs.writeFileSync(
    filePath,
    JSON.stringify(applications, null, 2),
    "utf8"
  );

  return NextResponse.json(applications[index]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: "فایل پیدا نشد." },
      { status: 404 }
    );
  }

  const applications = JSON.parse(
    fs.readFileSync(filePath, "utf8")
  );

  const filtered = applications.filter(
    (item: any) => String(item.id) !== id
  );

  fs.writeFileSync(
    filePath,
    JSON.stringify(filtered, null, 2),
    "utf8"
  );

  return NextResponse.json({
    message: "درخواست حذف شد.",
  });
}
