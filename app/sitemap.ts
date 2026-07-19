import type { MetadataRoute } from "next";

import { products } from "@/data/products";
import { SITE_URL } from "@/lib/metadata";

const staticRoutes = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/privacy-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: updatedAt,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...pages, ...productRoutes];
}
