import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Elephant Chess Academy & FIDE Master Mentors",
  description:
    "Learn about Elephant Chess Academy's story, mission, FIDE certified coaching philosophy, state-of-the-art centers, and our passion for nurturing young grandmasters.",
  alternates: {
    canonical: "https://elephantchessacademy.com/about",
  },
  openGraph: {
    title: "About Elephant Chess Academy – Our Mission & Faculty",
    description:
      "Nurturing strategic foresight and championship mindset through certified FIDE coaching.",
    url: "https://elephantchessacademy.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
