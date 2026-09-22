import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FIDE Coaches & Grandmaster Faculty | Elephant Chess Academy",
  description:
    "Meet our team of FIDE certified trainers, international masters, and Grandmaster mentors dedicated to transforming students into competitive chess champions.",
  alternates: {
    canonical: "https://elephantchessacademy.com/coaches",
  },
  openGraph: {
    title: "Meet Our FIDE Certified Coaches & Grandmasters",
    description:
      "Expert coaching faculty with decades of national & international competitive experience.",
    url: "https://elephantchessacademy.com/coaches",
  },
};

export default function CoachesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
