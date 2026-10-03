import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const email = searchParams.get("email");

    if (id) {
      const coach = await prisma.coach.findUnique({
        where: { id },
        include: {
          students: {
            include: {
              attendances: {
                orderBy: { date: "desc" },
                take: 10,
              },
              solvedPuzzles: {
                select: { id: true, points: true, puzzleId: true, solvedAt: true },
              },
              puzzleAttempts: true,
            },
          },
          puzzles: true,
        },
      });
      return NextResponse.json(coach);
    }

    if (email) {
      const coach = await prisma.coach.findUnique({
        where: { email: email.toLowerCase() },
        include: {
          students: {
            include: {
              attendances: {
                orderBy: { date: "desc" },
                take: 10,
              },
              solvedPuzzles: {
                select: { id: true, points: true, puzzleId: true, solvedAt: true },
              },
              puzzleAttempts: true,
            },
          },
          puzzles: true,
        },
      });
      return NextResponse.json(coach);
    }

    let coaches = await prisma.coach.findMany({
      include: {
        _count: {
          select: {
            students: true,
            puzzles: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // If no coach exists yet, create default demo coach
    if (coaches.length === 0) {
      try {
        const defaultCoach = await prisma.coach.create({
          data: {
            name: "Coach Arjun Verma",
            email: "coach@elephantchess.com",
            password: "coach@elephant.com",
            phone: "+91 98765 43210",
            title: "Senior FIDE Coach",
            bio: "Experienced chess master specializing in tactical calculation, endgame mastery, and tournament preparation for juniors.",
            avatarUrl: "",
            status: "Active",
          },
          include: {
            _count: {
              select: {
                students: true,
                puzzles: true,
              },
            },
          },
        });
        coaches = [defaultCoach];
      } catch (seedErr) {
        console.warn("Could not seed default coach:", seedErr);
      }
    }

    return NextResponse.json(coaches);
  } catch (error: any) {
    console.error("GET /api/coaches error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, title, bio, avatarUrl, status } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const existing = await prisma.coach.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json({ error: "A coach with this email already exists" }, { status: 400 });
    }

    const coach = await prisma.coach.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        password,
        phone: phone || null,
        title: title || "Chess Coach",
        bio: bio || null,
        avatarUrl: avatarUrl || null,
        status: status || "Active",
      },
      include: {
        _count: {
          select: {
            students: true,
            puzzles: true,
          },
        },
      },
    });

    return NextResponse.json(coach, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/coaches error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, password, phone, title, bio, avatarUrl, status } = body;

    if (!id) {
      return NextResponse.json({ error: "Coach ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase().trim();
    if (password) updateData.password = password;
    if (phone !== undefined) updateData.phone = phone;
    if (title !== undefined) updateData.title = title;
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (status !== undefined) updateData.status = status;

    const coach = await prisma.coach.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: {
            students: true,
            puzzles: true,
          },
        },
      },
    });

    return NextResponse.json(coach);
  } catch (error: any) {
    console.error("PUT /api/coaches error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Coach ID is required" }, { status: 400 });
    }

    // Unassign students first
    await prisma.student.updateMany({
      where: { coachId: id },
      data: { coachId: null },
    });

    await prisma.coach.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("DELETE /api/coaches error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
