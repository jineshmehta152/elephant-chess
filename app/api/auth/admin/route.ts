import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const u = (username || "").trim().toLowerCase();
    const p = (password || "").trim();

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@elephantchess.com").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if ((u === adminEmail || u === "admin") && p === adminPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    console.error("Admin validation API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
