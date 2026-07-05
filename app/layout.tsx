import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import BackToTop from "@/components/BackToTop/BackToTop";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SmoothScrollProvider from "@/components/SmoothScrollProvider/SmoothScrollProvider";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
import {
  createPageMetadata,
  SITE_NAME,
  SITE_URL,
} from "@/lib/metadata";
import "lenis/dist/lenis.css";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
});
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
});

const defaultMetadata = createPageMetadata({
  title: SITE_NAME,
  description:
    "Пакувальні матеріали та професійні рішення для підприємств харчової промисловості України.",
  path: "/",
  absoluteTitle: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...defaultMetadata,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <ToastProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
