import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Locations | Elephant Chess Academy",
  description:
    "Get in touch with Elephant Chess Academy. Find our academy branches, phone numbers, WhatsApp contact, and email for admissions and inquiries.",
  alternates: {
    canonical: "https://elephantchessacademy.com/contact",
  },
  openGraph: {
    title: "Contact Elephant Chess Academy & Find Centers",
    description:
      "Locate our physical training branches or connect directly for admission and demo enquiries.",
    url: "https://elephantchessacademy.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
