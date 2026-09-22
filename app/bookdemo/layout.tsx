import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Free Chess Demo Class & Assessment | Elephant Chess Academy",
  description:
    "Schedule a complimentary 45-minute live chess evaluation and trial session with a FIDE certified master coach at Elephant Chess Academy.",
  alternates: {
    canonical: "https://elephantchessacademy.com/bookdemo",
  },
  openGraph: {
    title: "Book Free Chess Demo Class | Elephant Chess Academy",
    description:
      "Claim your free 45-minute chess skill assessment and trial lesson today.",
    url: "https://elephantchessacademy.com/bookdemo",
  },
};

export default function BookDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
