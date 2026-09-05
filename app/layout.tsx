import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { SiteNav } from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"

export const metadata: Metadata = {
  title: {
    default: "ArmaTech Associates | Precision Measurement",
    template: "%s | ArmaTech Associates",
  },

  description:
    "Precision measurement and quality control solutions for modern manufacturing.",

  metadataBase: new URL("https://armatechassociates.com"),

  openGraph: {
    title: "ArmaTech Associates",
    description:
      "Precision measurement and quality control solutions for modern manufacturing.",
    type: "website",
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* GLOBAL NAVIGATION */}
        <SiteNav />

        {/* PAGE CONTENT */}
        {children}

        {/* GLOBAL FOOTER */}
        <SiteFooter />

        {/* VERCEL ANALYTICS */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}