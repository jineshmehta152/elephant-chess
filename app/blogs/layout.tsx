import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chess Articles, Endgame Insights & Tournament Guides | Elephant Chess Academy",
  description:
    "Explore master-level chess tips, tactical puzzle explanations, opening repertoires, endgame strategies, and academy updates curated by FIDE coaches.",
  alternates: {
    canonical: "https://elephantchessacademy.com/blogs",
  },
  openGraph: {
    title: "Chess Articles & Tactical Guides | Elephant Chess Academy",
    description:
      "Master chess tactics, tournament psychology, and endgame technique with guides written by certified coaches.",
    url: "https://elephantchessacademy.com/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
