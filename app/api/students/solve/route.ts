import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentId, puzzleId, points = 10 } = body;

    if (!studentId || !puzzleId) {
      return NextResponse.json({ error: "studentId and puzzleId are required" }, { status: 400 });
    }

    // Check if the student has already solved this puzzle
    const existingSolve = await prisma.solvedPuzzle.findUnique({
      where: {
        studentId_puzzleId: {
          studentId,
          puzzleId,
        },
      },
    });

    if (existingSolve) {
      return NextResponse.json({ success: true, alreadySolved: true, message: "Puzzle already solved previously" });
    }

    // Start a transaction to record the solve and increment student rating/XP
    const [solveRecord, updatedStudent] = await prisma.$transaction([
      prisma.solvedPuzzle.create({
        data: {
          studentId,
          puzzleId,
          points,
        },
      }),
      prisma.student.update({
        where: { id: studentId },
        data: {
          rating: {
            increment: points,
          },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      alreadySolved: false,
      newRating: updatedStudent.rating,
      message: `Puzzle solved! Awarded +${points} points.`,
    });
  } catch (error: any) {
    console.error("POST /api/students/solve error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("studentId");
    if (!studentId) {
      return NextResponse.json({ error: "studentId is required" }, { status: 400 });
    }
    const solved = await prisma.solvedPuzzle.findMany({
      where: { studentId },
      select: { puzzleId: true },
    });
    return NextResponse.json(solved.map((s) => s.puzzleId));
  } catch (error: any) {
    console.error("GET /api/students/solve error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
