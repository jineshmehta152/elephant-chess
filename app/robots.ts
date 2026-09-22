import { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elephantchessacademy.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/student",
          "/student/*",
          "/api/*",
          "/_next/*",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "CCBot",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: [
          "/",
          "/about",
          "/courses",
          "/coaches",
          "/achievements",
          "/gallery",
          "/blogs",
          "/blogs/*",
          "/bookdemo",
          "/contact",
          "/llms.txt",
          "/llms-full.txt",
        ],
        disallow: [
          "/admin/*",
          "/student/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
