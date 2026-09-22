import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const revalidate = 600; // Cache for 10 minutes

export async function GET() {
  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(achievements);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, category, description, imageUrl, year, studentName } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: "Title and Image URL are required" }, { status: 400 });
    }

    const achievement = await prisma.achievement.create({
      data: {
        title,
        category: category || "Tournament",
        description: description || "",
        imageUrl,
        year: year || new Date().getFullYear().toString(),
        studentName: studentName || null,
      },
    });

    return NextResponse.json(achievement, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, category, description, imageUrl, year, studentName } = body;

    if (!id) {
      return NextResponse.json({ error: "Achievement ID required" }, { status: 400 });
    }

    const achievement = await prisma.achievement.update({
      where: { id },
      data: {
        title,
        category: category || "Tournament",
        description: description || "",
        imageUrl,
        year: year || new Date().getFullYear().toString(),
        studentName: studentName || null,
      },
    });

    return NextResponse.json(achievement);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Achievement ID required" }, { status: 400 });
    }

    await prisma.achievement.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
