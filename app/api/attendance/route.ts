import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    const dateStr = searchParams.get("date");

    const where: any = {};
    if (studentId) where.studentId = studentId;
    if (dateStr) {
      const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
      const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);
      where.date = {
        gte: startOfDay,
        lte: endOfDay,
      };
    }

    const attendances = await prisma.attendance.findMany({
      where,
      include: {
        student: true,
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json(attendances);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, status, date, notes } = body;

    if (!studentId) {
      return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
    }

    const attendanceDate = date ? new Date(date) : new Date();

    const record = await prisma.attendance.upsert({
      where: {
        studentId_date: {
          studentId,
          date: attendanceDate,
        },
      },
      update: {
        status: status || "PRESENT",
        notes: notes || null,
      },
      create: {
        studentId,
        status: status || "PRESENT",
        date: attendanceDate,
        notes: notes || null,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
