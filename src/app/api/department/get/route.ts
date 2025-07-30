import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const departments = await prisma.departments.findMany({
      include: {
        employees_departments_inchargeidToemployees: true,
      },
    });
    const formatted = departments.map((dep) => ({
      id: dep.id,
      name: dep.name,
      inchargeName:
        dep.employees_departments_inchargeidToemployees?.name || "—",
    }));
    console.log("value of incharge name", formatted);

    return NextResponse.json({ departments : formatted });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch departments", error },
      { status: 500 }
    );
  }
}
