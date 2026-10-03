import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get("folderId");
    const coachId = searchParams.get("coachId");

    const where: any = {};
    if (folderId) where.folderId = folderId;
    if (coachId) where.coachId = coachId;

    const puzzles = await prisma.puzzle.findMany({
      where,
      include: {
        coach: {
          select: { id: true, name: true, email: true }
        },
        folder: {
          select: { id: true, name: true }
        }
      },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(puzzles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (Array.isArray(body)) {
      // Handle batch import of multiple puzzles
      const createdPuzzles = [];
      for (const item of body) {
        const { title, pgn, fen, targetFen, level, assignedBatch, solutionHint, description, data, folderId, coachId } = item;
        const puzzle = await prisma.puzzle.create({
          data: {
            title: title || `Tactical Puzzle (${level || "BEGINNER"})`,
            pgn: pgn || "",
            fen: fen || null,
            targetFen: targetFen || null,
            level: level || "BEGINNER",
            assignedBatch: assignedBatch || "All Batches",
            solutionHint: solutionHint || null,
            description: description || null,
            data: data || null,
            folderId: folderId || null,
            coachId: coachId || null,
          },
          include: {
            coach: {
              select: { id: true, name: true }
            }
          }
        });
        createdPuzzles.push(puzzle);
      }
      return NextResponse.json(createdPuzzles, { status: 201 });
    }

    const { title, pgn, fen, targetFen, level, assignedBatch, solutionHint, description, data, folderId, coachId } = body;

    if (!pgn && !title) {
      return NextResponse.json({ error: "Title or PGN required" }, { status: 400 });
    }

    const puzzle = await prisma.puzzle.create({
      data: {
        title: title || `Tactical Puzzle (${level || "BEGINNER"})`,
        pgn: pgn || "",
        fen: fen || null,
        targetFen: targetFen || null,
        level: level || "BEGINNER",
        assignedBatch: assignedBatch || "All Batches",
        solutionHint: solutionHint || null,
        description: description || null,
        data: data || null,
        folderId: folderId || null,
        coachId: coachId || null,
      },
      include: {
        coach: {
          select: { id: true, name: true }
        }
      }
    });

    return NextResponse.json(puzzle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, pgn, fen, targetFen, level, assignedBatch, solutionHint, description, data, folderId, coachId } = body;

    if (!id) {
      return NextResponse.json({ error: "Puzzle ID required" }, { status: 400 });
    }

    const puzzle = await prisma.puzzle.update({
      where: { id },
      data: {
        title: title || `Tactical Puzzle (${level || "BEGINNER"})`,
        pgn: pgn || "",
        fen: fen || null,
        targetFen: targetFen || null,
        level: level || "BEGINNER",
        assignedBatch: assignedBatch || "All Batches",
        solutionHint: solutionHint || null,
        description: description || null,
        data: data || null,
        folderId: folderId || null,
        coachId: coachId !== undefined ? coachId : undefined,
      },
      include: {
        coach: {
          select: { id: true, name: true }
        }
      }
    });

    return NextResponse.json(puzzle);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Puzzle ID required" }, { status: 400 });
    }

    try {
      await prisma.puzzle.delete({
        where: { id },
      });
    } catch (dbErr) {
      console.warn("DB Puzzle Delete warning:", dbErr);
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("DELETE /api/puzzles error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
