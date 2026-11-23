import type { MetadataRoute } from "next"

import { products } from "@/lib/catalog"
import { SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/services", "/products", "/contact"]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const modelEntries: MetadataRoute.Sitemap = products.flatMap((product) =>
    product.variants.map((variant) => ({
      url: `${SITE_URL}/products/${product.slug}/${encodeURIComponent(variant.model)}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }))
  )

  return [...staticEntries, ...productEntries, ...modelEntries]
}
