import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"

import "./globals.css"

import { SiteNav } from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import WhatsAppButton from "@/components/WhatsAppButton"

import { ScrollToTop } from "@/components/scroll-to-top"
import { CONTACT, PARENT_SITE_URL, SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    default: "ArmaTech Associates | CRYSTAL Video Measuring Machines",
    template: "%s | ArmaTech Associates",
  },

  description:
    "CRYSTAL video measuring machines, metrology equipment and quality control solutions from ArmaTech Associates, Bhosari MIDC, Pune.",

  metadataBase: new URL(SITE_URL),

  applicationName: "ArmaTech Associates",

  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },

  keywords: [
    "video measuring machine",
    "VMM",
    "vision measuring machine",
    "metrology equipment",
    "Pune",
    "Bhosari MIDC",
    "Crystal VMM",
  ],

  openGraph: {
    title: "ArmaTech Associates | CRYSTAL Video Measuring Machines",
    description:
      "Precision video measuring machines and measurement solutions for modern manufacturing, supplied from Pune, India.",
    url: SITE_URL,
    siteName: "ArmaTech Associates",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/Image/automatic.png",
        alt: "CRYSTAL Fully Automatic Video Measuring Machine",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ArmaTech Associates | CRYSTAL Video Measuring Machines",
    description:
      "Precision video measuring machines and measurement solutions for modern manufacturing.",
    images: ["/Image/automatic.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#c8102e",
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ArmaTech Associates",
  url: SITE_URL,
  sameAs: [PARENT_SITE_URL],
  image: `${SITE_URL}/Image/automatic.png`,
  logo: `${SITE_URL}/logo.png`,
  email: CONTACT.email,
  telephone: CONTACT.landlines[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: "W-174 A, 'S' Block, M.I.D.C., Bhosari Industrial Estate",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411026",
    addressCountry: "IN",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />

        <ScrollToTop />
        {/* GLOBAL NAVIGATION */}
        <SiteNav />

        {/* PAGE CONTENT */}
        {children}

        {/* GLOBAL FOOTER */}
        <SiteFooter />
        <WhatsAppButton />

        {/* VERCEL ANALYTICS */}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}