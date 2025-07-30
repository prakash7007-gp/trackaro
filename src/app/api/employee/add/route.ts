import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role, departmentid } = await req.json();

    const existingUser = await prisma.employees.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.employees.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        joindate: new Date(),
        departmentid: parseInt(departmentid),
      },
    });

    return NextResponse.json({ message: "Employee registered successfully" });
  } catch (error) {
     console.error("🔥 Prisma Error:", error);
    return NextResponse.json(
      { message: "Error adding employee", error },
      { status: 500 }
    );
  }
}
