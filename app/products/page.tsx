import type { Metadata } from "next"

import ProductsBrowser from "./products-browser"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "VMM Product Catalogue | Manual, Semi-Auto & Automatic",
  description:
    "Compare the complete CRYSTAL Video Measuring Machine range: manual VMM, semi-automatic VMM, fully automatic VMM, cabinet-integrated systems and VMS models.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "CRYSTAL VMM Product Catalogue | ArmaTech Associates",
    description:
      "Five machine families and sixteen configurations of video measuring systems.",
    url: `${SITE_URL}/products`,
    type: "website",
  },
}

export default function ProductsPage() {
  return <ProductsBrowser />
}
