import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    if ((prisma as any).lead) {
      const where: any = {};
      if (status && status !== "ALL") {
        where.status = status;
      }
      if (search) {
        where.OR = [
          { name: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { notes: { contains: search, mode: "insensitive" } },
        ];
      }

      const leads = await (prisma as any).lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(leads);
    }

    // Fallback via Raw SQL
    let query = `SELECT * FROM "Lead"`;
    const conditions: string[] = [];
    if (status && status !== "ALL") {
      conditions.push(`"status" = '${status}'::"LeadStatus"`);
    }
    if (search) {
      conditions.push(`("name" ILIKE '%${search}%' OR "phone" ILIKE '%${search}%' OR "email" ILIKE '%${search}%' OR "notes" ILIKE '%${search}%')`);
    }
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }
    query += ` ORDER BY "createdAt" DESC`;

    const leads: any = await prisma.$queryRawUnsafe(query);
    return NextResponse.json(leads);
  } catch (error: any) {
    console.error("GET /api/leads error:", error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      age,
      phone,
      email,
      level = "Beginner",
      mode = "Online",
      status = "NEW",
      source = "Manual Entry",
      notes,
      demoDate,
      followUpDate,
    } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Student name and phone number are required." },
        { status: 400 }
      );
    }

    if ((prisma as any).lead) {
      const lead = await (prisma as any).lead.create({
        data: {
          name,
          age: age ? String(age) : null,
          phone,
          email: email || null,
          level: level || "Beginner",
          mode: mode || "Online",
          status: status || "NEW",
          source: source || "Manual Entry",
          notes: notes || null,
          demoDate: demoDate ? new Date(demoDate) : null,
          followUpDate: followUpDate ? new Date(followUpDate) : null,
        },
      });
      return NextResponse.json(lead, { status: 201 });
    }

    // Fallback Raw SQL insert
    const id = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date();
    const demo = demoDate ? `'${new Date(demoDate).toISOString()}'::timestamp` : "NULL";
    const follow = followUpDate ? `'${new Date(followUpDate).toISOString()}'::timestamp` : "NULL";

    const insertSql = `
      INSERT INTO "Lead" ("id", "name", "age", "phone", "email", "level", "mode", "status", "source", "notes", "demoDate", "followUpDate", "createdAt", "updatedAt")
      VALUES (
        '${id}',
        '${name.replace(/'/g, "''")}',
        ${age ? `'${String(age).replace(/'/g, "''")}'` : "NULL"},
        '${phone.replace(/'/g, "''")}',
        ${email ? `'${email.replace(/'/g, "''")}'` : "NULL"},
        '${(level || "Beginner").replace(/'/g, "''")}',
        '${(mode || "Online").replace(/'/g, "''")}',
        '${status || "NEW"}'::"LeadStatus",
        '${(source || "Manual Entry").replace(/'/g, "''")}',
        ${notes ? `'${notes.replace(/'/g, "''")}'` : "NULL"},
        ${demo},
        ${follow},
        '${now.toISOString()}'::timestamp,
        '${now.toISOString()}'::timestamp
      )
      RETURNING *;
    `;

    const result: any = await prisma.$queryRawUnsafe(insertSql);
    return NextResponse.json(result[0] || { id, name, phone, status }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/leads error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      age,
      phone,
      email,
      level,
      mode,
      status,
      source,
      notes,
      demoDate,
      followUpDate,
      convertToStudent,
      batch = "Beginner Morning",
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    }

    // Optional Convert to Student
    if (convertToStudent) {
      const parsedAge = parseInt(String(age)) || 10;
      await prisma.student.create({
        data: {
          name,
          age: parsedAge,
          email: email || null,
          phone: phone || null,
          batch: batch || "Beginner Morning",
          level: (level?.toUpperCase() === "ADVANCED" || level?.toUpperCase() === "INTERMEDIATE") ? level.toUpperCase() : "BEGINNER",
          rating: 1200,
          status: "Active",
        },
      });
    }

    if ((prisma as any).lead) {
      const updated = await (prisma as any).lead.update({
        where: { id },
        data: {
          name: name !== undefined ? name : undefined,
          age: age !== undefined ? (age ? String(age) : null) : undefined,
          phone: phone !== undefined ? phone : undefined,
          email: email !== undefined ? (email || null) : undefined,
          level: level !== undefined ? level : undefined,
          mode: mode !== undefined ? mode : undefined,
          status: convertToStudent ? "CONVERTED" : (status !== undefined ? status : undefined),
          source: source !== undefined ? source : undefined,
          notes: notes !== undefined ? (notes || null) : undefined,
          demoDate: demoDate !== undefined ? (demoDate ? new Date(demoDate) : null) : undefined,
          followUpDate: followUpDate !== undefined ? (followUpDate ? new Date(followUpDate) : null) : undefined,
        },
      });
      return NextResponse.json(updated);
    }

    // Fallback Raw SQL update
    const finalStatus = convertToStudent ? "CONVERTED" : (status || "NEW");
    const updateParts: string[] = [`"updatedAt" = NOW()`];
    if (name !== undefined) updateParts.push(`"name" = '${name.replace(/'/g, "''")}'`);
    if (age !== undefined) updateParts.push(`"age" = ${age ? `'${String(age).replace(/'/g, "''")}'` : "NULL"}`);
    if (phone !== undefined) updateParts.push(`"phone" = '${phone.replace(/'/g, "''")}'`);
    if (email !== undefined) updateParts.push(`"email" = ${email ? `'${email.replace(/'/g, "''")}'` : "NULL"}`);
    if (level !== undefined) updateParts.push(`"level" = '${level.replace(/'/g, "''")}'`);
    if (mode !== undefined) updateParts.push(`"mode" = '${mode.replace(/'/g, "''")}'`);
    if (finalStatus !== undefined) updateParts.push(`"status" = '${finalStatus}'::"LeadStatus"`);
    if (source !== undefined) updateParts.push(`"source" = '${source.replace(/'/g, "''")}'`);
    if (notes !== undefined) updateParts.push(`"notes" = ${notes ? `'${notes.replace(/'/g, "''")}'` : "NULL"}`);
    if (demoDate !== undefined) updateParts.push(`"demoDate" = ${demoDate ? `'${new Date(demoDate).toISOString()}'::timestamp` : "NULL"}`);
    if (followUpDate !== undefined) updateParts.push(`"followUpDate" = ${followUpDate ? `'${new Date(followUpDate).toISOString()}'::timestamp` : "NULL"}`);

    const updateSql = `
      UPDATE "Lead"
      SET ${updateParts.join(", ")}
      WHERE "id" = '${id}'
      RETURNING *;
    `;

    const updated: any = await prisma.$queryRawUnsafe(updateSql);
    return NextResponse.json(updated[0] || { id, status: finalStatus });
  } catch (error: any) {
    console.error("PUT /api/leads error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID required" }, { status: 400 });
    }

    if ((prisma as any).lead) {
      await (prisma as any).lead.delete({
        where: { id },
      });
    } else {
      await prisma.$executeRawUnsafe(`DELETE FROM "Lead" WHERE "id" = '${id}'`);
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("DELETE /api/leads error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
