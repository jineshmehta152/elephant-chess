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

export const metadata: Metadata = {
  title: "Elephant Chess Academy – FIDE Certified Master Training & Student Portal",
  description:
    "Elephant Chess Academy offers FIDE certified chess coaching, grandmaster masterclasses, tournament preparation, interactive student PGN puzzle arena, and physical training centers.",
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
}

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
        <script type="application/ld+json">
          {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Elephant Chess Academy",
          "url": "https://elephantchessacademy.com",
          "sameAs": [
            "https://elephantchessacademy.com"
          ]
        }
        `}
        </script>
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
