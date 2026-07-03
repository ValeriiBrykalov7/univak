import type { Metadata } from "next";

import About from "@/components/About/About";
import Advantages from "@/components/Advantages/Advantages";
import Hero from "@/components/Hero/Hero";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "ЮНІВАК УКРАЇНА — пакувальні матеріали",
  description:
    "Термозбіжні пакети, бар’єрні плівки та пакувальні рішення для виробників харчової продукції.",
  path: "/",
  imageAlt:
    "Пакувальні матеріали ЮНІВАК УКРАЇНА для харчової промисловості",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <Hero />
      <Advantages />
      <About />
      <ProductsSection />
    </>
  );
}
