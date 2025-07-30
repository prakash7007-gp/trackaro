import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, inchargeid } = await req.json();

    const department = await prisma.departments.create({
      data: {
        name,
        inchargeid: inchargeid || null,
      },
    });

    return NextResponse.json({ message: "Department created", department });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create department", error },
      { status: 500 }
    );
  }
}
