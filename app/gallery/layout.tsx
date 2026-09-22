import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academy Gallery & Events | Elephant Chess Academy",
  description:
    "Photo gallery showcasing our vibrant training sessions, inter-academy tournaments, summer camps, and medal award ceremonies.",
  alternates: {
    canonical: "https://elephantchessacademy.com/gallery",
  },
  openGraph: {
    title: "Academy Photo Gallery & Events | Elephant Chess Academy",
    description:
      "Take a look inside Elephant Chess Academy's classrooms, tournament halls, and master workshops.",
    url: "https://elephantchessacademy.com/gallery",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
