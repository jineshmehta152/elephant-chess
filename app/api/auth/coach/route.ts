import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();
    const loginIdentifier = (email || username || "").toLowerCase().trim();
    const loginPassword = (password || "").trim();

    if (!loginIdentifier || !loginPassword) {
      return NextResponse.json(
        { success: false, error: "Email/username and password are required" },
        { status: 400 }
      );
    }

    // Find coach by email or name
    let coach = await prisma.coach.findFirst({
      where: {
        OR: [
          { email: loginIdentifier },
          { name: { equals: loginIdentifier, mode: "insensitive" } },
        ],
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

    // If no coaches exist at all in DB, auto-seed default coach
    if (!coach) {
      const coachCount = await prisma.coach.count();
      if (coachCount === 0 && (loginIdentifier === "coach@elephantchess.com" || loginIdentifier === "coach")) {
        coach = await prisma.coach.create({
          data: {
            name: "Coach Arjun Verma",
            email: "coach@elephantchess.com",
            password: "coach@elephant.com",
            phone: "+91 98765 43210",
            title: "Senior FIDE Coach",
            bio: "Dedicated master chess coach.",
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
      }
    }

    if (!coach) {
      return NextResponse.json(
        { success: false, error: "Coach account not found." },
        { status: 401 }
      );
    }

    if (coach.password !== loginPassword) {
      return NextResponse.json(
        { success: false, error: "Incorrect password." },
        { status: 401 }
      );
    }

    if (coach.status === "Inactive") {
      return NextResponse.json(
        { success: false, error: "Coach account is inactive. Please contact administration." },
        { status: 403 }
      );
    }

    // Strip password from returned payload
    const { password: _, ...coachSafe } = coach;

    return NextResponse.json({
      success: true,
      coach: coachSafe,
    });
  } catch (error: any) {
    console.error("Coach login error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
