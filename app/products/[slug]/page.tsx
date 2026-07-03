import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetails from "@/components/ProductDetails/ProductDetails";
import { getProductBySlug, products } from "@/data/products";
import { createPageMetadata } from "@/lib/metadata";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return createPageMetadata({
    title: product.shortTitle,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    imageAlt: `${product.shortTitle} — пакувальні матеріали ЮНІВАК УКРАЇНА`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
