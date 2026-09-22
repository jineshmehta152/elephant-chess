import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { studentId, folderId } = await req.json();

    if (!studentId || !folderId) {
      return NextResponse.json({ error: "studentId and folderId are required" }, { status: 400 });
    }

    // 1. Get all puzzle IDs in the folder
    const puzzles = await prisma.puzzle.findMany({
      where: { folderId },
      select: { id: true },
    });

    const puzzleIds = puzzles.map((p) => p.id);

    if (puzzleIds.length > 0) {
      // 2. Delete solved records for these puzzles for this student
      await prisma.solvedPuzzle.deleteMany({
        where: {
          studentId,
          puzzleId: { in: puzzleIds },
        },
      });

      // 3. Delete attempt records for these puzzles for this student
      await prisma.puzzleAttempt.deleteMany({
        where: {
          studentId,
          puzzleId: { in: puzzleIds },
        },
      });
    }

    return NextResponse.json({ success: true, message: "Course progress reset successfully." });
  } catch (error: any) {
    console.error("POST /api/students/reset-course error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
