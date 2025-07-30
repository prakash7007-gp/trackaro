import DepartmentList from "@/app/admin/departmentlist/page";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const employees = await prisma.employees.findMany({
      orderBy: { id: "asc" },
      include: {
        departments_employees_departmentidTodepartments: true,
      },
    });
    const formatted = employees.map((emp) => ({
      ...emp,
      departmentName:
        emp.departments_employees_departmentidTodepartments?.name || "—",
    }));

    return NextResponse.json({ employees: formatted });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching employees", error },
      { status: 500 }
    );
  }
}
