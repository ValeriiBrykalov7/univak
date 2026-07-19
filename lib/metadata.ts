import type { Metadata } from "next";

export const SITE_NAME = "ЮНІВАК УКРАЇНА";
export const DEFAULT_SITE_URL = "https://univak.com.ua";
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");
export const DEFAULT_OG_IMAGE = "/images/og-univak.jpg";
export const DEFAULT_OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

type CreatePageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  imageAlt = `${SITE_NAME} — пакувальні матеріали для харчової промисловості`,
  absoluteTitle = false,
}: CreatePageMetadataOptions): Metadata {
  const pageTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          ...DEFAULT_OG_IMAGE_SIZE,
          alt: imageAlt,
        },
      ],
      locale: "uk_UA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
