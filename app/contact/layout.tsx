import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Elephant Chess Academy – Online Chess Coaching",
  description:
    "Get in touch with Elephant Chess Academy. Book your free live demo session, contact our coaches on WhatsApp, and connect with our global online academy.",
  alternates: {
    canonical: "https://elephantchessacademy.com/contact",
  },
  openGraph: {
    title: "Contact Elephant Chess Academy – Global Online Coaching",
    description:
      "Connect with our certified chess coaching faculty for admissions, trial classes, and live virtual batches.",
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
