import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, starttime, endtime } = await req.json();

    // Check if already exists
    const existing = await prisma.shifts.findFirst({
      where: {
        name,
        starttime,
        endtime,
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Shift already exists with same name and timings" },
        { status: 400 }
      );
    }

    const newShift = await prisma.shifts.create({
      data: {
        name,
        starttime,
        endtime,
      },
    });

    return NextResponse.json({ shift: newShift }, { status: 201 });
  } catch (error) {
    console.error("Shift Creation Error:", error);
    return NextResponse.json(
      { message: "Error creating shift", error },
      { status: 500 }
    );
  }
}
