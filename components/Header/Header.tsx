"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Icon from "@/components/Icon/Icon";
import { socialLinks } from "@/data/socialLinks";

import styles from "./Header.module.css";

const navLinks = [
  { href: "#about", label: "Про компанію" },
  { href: "#products", label: "Наші пропозиції" },
  { href: "#contacts", label: "Контакти" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-menu-open", isMenuOpen);
    return () => {
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPastHero(
          !entry.isIntersecting && entry.boundingClientRect.bottom <= 0,
        );
      },
      { threshold: 0 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = document.getElementById("contacts");

    if (!footer) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.01 },
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      className={`${styles.header} ${isPastHero ? styles.pastHero : ""} ${isMenuOpen ? styles.menuOpen : ""} ${isFooterVisible ? styles.hidden : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="ЮНІВАК — на головну">
          <Icon name="logo" size={36} className={styles.logoIcon} />

          <span className={styles.logoText}>
            <span className={styles.logoName}>ЮНІВАК</span>
            <span className={styles.logoName}>УКРАЇНА</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Основна навігація">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="#contacts" className={`button orange ${styles.cta}`}>
            Зв’язатися
          </Link>

          <button
            className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
            type="button"
            aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className={styles.burgerLine} />
          </button>

          <div
            id="mobile-navigation"
            className={`${styles.mobilePanel} ${isMenuOpen ? styles.mobilePanelOpen : ""}`}
            aria-hidden={!isMenuOpen}
            data-lenis-prevent
          >
            <nav
              className={`container ${styles.mobileNav}`}
              aria-label="Мобільна навігація"
            >
              <div className={styles.mobileLinks}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.mobileLink}
                    onClick={closeMenu}
                  >
                    <span>{link.label}</span>
                    <Icon
                      name="icon-card-arrow"
                      size={24}
                      className={styles.mobileArrow}
                    />
                  </Link>
                ))}
              </div>

              <div className={styles.mobileFooter}>
                <div className={styles.mobileSocialRow}>
                  <p className={styles.mobileSocialTitle}>Написати директору</p>
                  <ul
                    className={styles.mobileSocialList}
                    aria-label="Соціальні мережі"
                  >
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          className={styles.mobileSocialLink}
                          href={link.href}
                          aria-label={link.label}
                          target="_blank"
                          rel="noreferrer"
                          onClick={closeMenu}
                        >
                          <Icon name={link.icon} size={21} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="#contacts"
                  className={`button orange ${styles.mobileCta}`}
                  onClick={closeMenu}
                >
                  Зв’язатися
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
