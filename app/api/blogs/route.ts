import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { blogs as staticBlogs } from "@/lib/blogs-data";

export const revalidate = 3600; // Cache for 1 hour

export async function GET(req: NextRequest) {
  try {
    const dbBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (dbBlogs.length === 0) {
      // Return static blogs as fallback so website is not empty initially
      return NextResponse.json(staticBlogs);
    }

    return NextResponse.json(dbBlogs);
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, category, author, authorRole, image, summary, content } = body;

    if (!title || !category || !author || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate unique slug
    let slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const dateStr = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const words = content.trim().split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

    const newBlog = await prisma.blog.create({
      data: {
        slug,
        title,
        category,
        author,
        authorRole: authorRole || "Staff Coach",
        date: dateStr,
        readTime,
        image: image || "/blog1.jpg",
        summary: summary || content.substring(0, 150) + "...",
        content,
      },
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    console.error("POST blog error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
