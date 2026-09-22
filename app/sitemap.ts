import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { blogs as staticBlogs } from "@/lib/blogs-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elephantchessacademy.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/bookdemo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/coaches`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/achievements`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic blog articles
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const dbBlogs = await prisma.blog.findMany({
      select: { slug: true, createdAt: true },
    });

    const dbSlugs = new Set(dbBlogs.map((b) => b.slug));

    blogRoutes = dbBlogs.map((b) => ({
      url: `${SITE_URL}/blogs/${b.slug}`,
      lastModified: b.createdAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Add static fallback blogs if not already in DB
    staticBlogs.forEach((sb) => {
      if (!dbSlugs.has(sb.slug)) {
        blogRoutes.push({
          url: `${SITE_URL}/blogs/${sb.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        });
      }
    });
  } catch (e) {
    // Fallback to static blogs if database is unreachable during build
    blogRoutes = staticBlogs.map((sb) => ({
      url: `${SITE_URL}/blogs/${sb.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  }

  return [...staticRoutes, ...blogRoutes];
}
