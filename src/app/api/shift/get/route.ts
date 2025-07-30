import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const shifts = await prisma.shifts.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ shifts });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching shifts", error },
      { status: 500 }
    );
  }
}
