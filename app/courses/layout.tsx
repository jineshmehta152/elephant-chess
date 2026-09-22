import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chess Courses & FIDE Curriculum | Beginner to Grandmaster",
  description:
    "Explore our structured 4-tier chess curriculum: Beginner Foundations, Intermediate Tactician, Advanced Tournament Specialist, and Grandmaster Masterclass.",
  alternates: {
    canonical: "https://elephantchessacademy.com/courses",
  },
  openGraph: {
    title: "Chess Courses & FIDE Curriculum | Elephant Chess Academy",
    description:
      "Structured chess coaching paths from foundational board mechanics to Grandmaster title preparation.",
    url: "https://elephantchessacademy.com/courses",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
