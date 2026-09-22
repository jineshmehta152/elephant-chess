import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    if (!studentId) {
      return NextResponse.json({ error: "studentId is required" }, { status: 400 });
    }

    const attempts = await prisma.puzzleAttempt.findMany({
      where: { studentId },
      select: { puzzleId: true, attempts: true },
    });

    const mapping = attempts.reduce((acc, curr) => {
      acc[curr.puzzleId] = curr.attempts;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json(mapping);
  } catch (error: any) {
    console.error("GET /api/students/attempts error:", error);
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, puzzleId, attempts } = body;

    if (!studentId || !puzzleId || attempts === undefined) {
      return NextResponse.json({ error: "studentId, puzzleId, and attempts are required" }, { status: 400 });
    }

    const record = await prisma.puzzleAttempt.upsert({
      where: {
        studentId_puzzleId: {
          studentId,
          puzzleId,
        },
      },
      update: {
        attempts,
      },
      create: {
        studentId,
        puzzleId,
        attempts,
      },
    });

    return NextResponse.json({ success: true, record });
  } catch (error: any) {
    console.error("POST /api/students/attempts error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
