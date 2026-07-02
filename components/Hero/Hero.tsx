import Link from "next/link";

import styles from "./Hero.module.css";

const badges = [
  "Для харчової промисловості",
  "8 категорій продукції",
  "Індивідуальні рішення",
];

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <p className={styles.eyebrow}>Пакувальні матеріали для B2B</p>
          <h1 className={styles.title}>
            Коли надійність пакування гарантує успіх виробництва
          </h1>
          <p className={styles.description}>
            Термозбіжні пакети, плівки та пакувальні рішення для харчової
            промисловості й автоматизованих виробничих ліній
          </p>

          <div className={styles.actions}>
            <Link
              href="/#products"
              className={`button orange ${styles.primaryLink}`}
            >
              Переглянути пропозиції
            </Link>
            <Link
              href="/#contacts"
              className={`button transparent ${styles.secondaryLink}`}
            >
              Зв’язатися
            </Link>
          </div>

          <ul className={styles.badges} aria-label="Ключові переваги">
            {badges.map((badge) => (
              <li key={badge} className={styles.badge}>
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
