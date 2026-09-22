import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Achievements & Tournament Trophies | Elephant Chess Academy",
  description:
    "Celebrating our students' state championships, national medals, FIDE rating milestones, and international tournament triumphs.",
  alternates: {
    canonical: "https://elephantchessacademy.com/achievements",
  },
  openGraph: {
    title: "Tournament Victories & Student Accolades | Elephant Chess Academy",
    description:
      "Explore the trophies, state titles, and rating breakthroughs achieved by Elephant Chess Academy students.",
    url: "https://elephantchessacademy.com/achievements",
  },
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
