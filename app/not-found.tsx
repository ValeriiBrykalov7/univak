import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

import styles from "./not-found.module.css";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Сторінку не знайдено | ЮНІВАК УКРАЇНА",
    description: "Запитану сторінку не знайдено.",
    absoluteTitle: true,
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <section className={styles.section} aria-labelledby="not-found-title">
      <Image
        className={styles.backgroundImage}
        src="/images/packaging-hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
      />

      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <p className={styles.code} aria-hidden="true">
            404
          </p>
          <p className={styles.eyebrow}>Сторінку не знайдено</p>
          <h1 className={styles.title} id="not-found-title">
            Схоже, цієї сторінки більше немає
          </h1>
          <p className={styles.description}>
            Адреса могла змінитися або містити помилку. Поверніться на головну
            сторінку чи перегляньте наші пакувальні рішення.
          </p>

          <div className={styles.actions}>
            <Link className={`button orange ${styles.primaryLink}`} href="/">
              На головну
            </Link>
            <Link
              className={`button transparent ${styles.secondaryLink}`}
              href="/#products"
            >
              Наші пропозиції
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
