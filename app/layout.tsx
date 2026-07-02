import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import SmoothScrollProvider from "@/components/SmoothScrollProvider/SmoothScrollProvider";
import ToastProvider from "@/components/ToastProvider/ToastProvider";
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

export const metadata: Metadata = {
  title: "Юнівак Україна",
  description:
    "Виробник та постачальник пакувальних матеріалів для харчової промисловості.",
  icons: {
    icon: [{ url: "/icons.svg#logo", type: "image/svg+xml" }],
    shortcut: "/icons.svg#logo",
    apple: "/icons.svg#logo",
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
          <ToastProvider />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
