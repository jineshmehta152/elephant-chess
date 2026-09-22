import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folderId = searchParams.get("folderId");

    const puzzles = await prisma.puzzle.findMany({
      where: folderId ? { folderId } : {},
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
        const { title, pgn, fen, targetFen, level, assignedBatch, solutionHint, description, data, folderId } = item;
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
          },
        });
        createdPuzzles.push(puzzle);
      }
      return NextResponse.json(createdPuzzles, { status: 201 });
    }

    const { title, pgn, fen, targetFen, level, assignedBatch, solutionHint, description, data, folderId } = body;

    if (!pgn && !title) {
      return NextResponse.json({ error: "Title or PGN required" }, { status: 400 });
    }

    const puzzle = await prisma.puzzle.create({
      data: {
        title: title || `Tactical Puzzle (${level})`,
        pgn: pgn || "",
        fen: fen || null,
        targetFen: targetFen || null,
        level: level || "BEGINNER",
        assignedBatch: assignedBatch || "All Batches",
        solutionHint: solutionHint || null,
        description: description || null,
        data: data || null,
        folderId: folderId || null,
      },
    });

    return NextResponse.json(puzzle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, pgn, fen, targetFen, level, assignedBatch, solutionHint, description, data, folderId } = body;

    if (!id) {
      return NextResponse.json({ error: "Puzzle ID required" }, { status: 400 });
    }

    const puzzle = await prisma.puzzle.update({
      where: { id },
      data: {
        title: title || `Tactical Puzzle (${level})`,
        pgn: pgn || "",
        fen: fen || null,
        targetFen: targetFen || null,
        level: level || "BEGINNER",
        assignedBatch: assignedBatch || "All Batches",
        solutionHint: solutionHint || null,
        description: description || null,
        data: data || null,
        folderId: folderId || null,
      },
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
