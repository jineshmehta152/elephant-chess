import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Providers from "@/components/providers"
import "./globals.css"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elephantchessacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elephant Chess Academy – FIDE Certified Chess Coaching & Masterclasses",
    template: "%s | Elephant Chess Academy",
  },
  description:
    "Join Elephant Chess Academy for FIDE-certified chess coaching, Grandmaster masterclasses, tournament preparation, tactical PGN puzzle training, and physical academy centers for kids and champions.",
  keywords: [
    "chess academy",
    "chess classes online",
    "FIDE chess coach",
    "chess coaching for kids",
    "grandmaster chess classes",
    "chess training center",
    "chess tournament coaching",
    "learn chess online",
    "chess tactics puzzle arena",
    "best chess academy India",
    "Elephant Chess Academy",
  ],
  authors: [{ name: "Elephant Chess Academy", url: SITE_URL }],
  creator: "Elephant Chess Academy",
  publisher: "Elephant Chess Academy",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Elephant Chess Academy – FIDE Certified Master Training",
    description:
      "FIDE certified chess coaching, Grandmaster masterclasses, tournament preparation, interactive PGN puzzle arenas, and dedicated offline academies.",
    url: SITE_URL,
    siteName: "Elephant Chess Academy",
    images: [
      {
        url: "/elephant-logo.png",
        width: 1200,
        height: 630,
        alt: "Elephant Chess Academy – Master Training & Student Portal",
      },
      {
        url: "/hero-chess.png",
        width: 800,
        height: 600,
        alt: "Elephant Chess Academy Training Arena",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elephant Chess Academy – FIDE Certified Chess Coaching",
    description:
      "Premier chess coaching academy with FIDE certified masters, GM masterclasses, interactive puzzle arenas, and tournament training.",
    images: ["/elephant-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Elephant Chess Academy",
      "url": SITE_URL,
      "logo": `${SITE_URL}/elephant-logo.png`,
      "description":
        "FIDE certified chess coaching academy offering beginner to grandmaster training, interactive tactical puzzle platform, and physical learning centers.",
      "sameAs": [
        "https://elephantchessacademy.com",
        "https://www.instagram.com/elephantchessacademy",
        "https://www.facebook.com/elephantchessacademy",
        "https://www.youtube.com/@elephantchessacademy"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9772187400",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "Elephant Chess Academy",
      "publisher": {
        "@id": `${SITE_URL}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/blogs?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "SportsActivityLocation",
      "@id": `${SITE_URL}/#localbusiness`,
      "name": "Elephant Chess Academy Centers",
      "url": SITE_URL,
      "image": `${SITE_URL}/elephant-logo.png`,
      "telephone": "+91-9772187400",
      "priceRange": "₹₹",
      "openingHours": "Mo-Su 09:00-20:00"
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased selection:bg-[#29A3DD] selection:text-white`}>
        <Providers>
          <Header />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
