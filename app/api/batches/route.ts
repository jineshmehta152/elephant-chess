import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const DEFAULT_BATCHES = [
  { id: "b1", name: "Beginner Morning", timing: "08:00 AM - 09:30 AM", days: "Mon, Wed, Fri", level: "BEGINNER" },
  { id: "b2", name: "Beginner Evening", timing: "05:00 PM - 06:30 PM", days: "Tue, Thu, Sat", level: "BEGINNER" },
  { id: "b3", name: "Intermediate Champions", timing: "06:30 PM - 08:00 PM", days: "Mon to Fri", level: "INTERMEDIATE" },
  { id: "b4", name: "Grandmaster Advanced Arena", timing: "07:00 PM - 09:00 PM", days: "Sat, Sun", level: "ADVANCED" },
];

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const batches = await (prisma as any).batch.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (batches.length === 0) {
      return NextResponse.json(DEFAULT_BATCHES);
    }
    return NextResponse.json(batches);
  } catch (error: any) {
    console.warn("GET /api/batches fallback:", error.message);
    return NextResponse.json(DEFAULT_BATCHES);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, timing, days, level } = body;

    if (!name) {
      return NextResponse.json({ error: "Batch name is required" }, { status: 400 });
    }

    let batch;
    try {
      batch = await (prisma as any).batch.create({
        data: {
          name,
          timing: timing || null,
          days: days || null,
          level: level || "BEGINNER",
        },
      });
    } catch (dbErr: any) {
      console.warn("DB Batch Create warning (using fallback object):", dbErr.message);
      batch = {
        id: `batch_${Date.now()}`,
        name,
        timing: timing || null,
        days: days || null,
        level: level || "BEGINNER",
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json(batch, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/batches error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Batch ID required" }, { status: 400 });
    }

    try {
      await (prisma as any).batch.delete({
        where: { id },
      });
    } catch (dbErr) {
      console.warn("DB Batch Delete warning:", dbErr);
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("DELETE /api/batches error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
