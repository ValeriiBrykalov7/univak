"use client";

import Link from "next/link";
import { MouseEvent, useRef } from "react";
import styles from "./Header.module.css";

const navLinks = [
  { href: "#about", label: "Про компанію" },
  { href: "#products", label: "Наші пропозиції" },
  { href: "#contacts", label: "Контакти" },
];

export default function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  const closeMenuWithAnimation = () => {
    const menu = menuRef.current;

    if (!menu || !menu.open || menu.dataset.closing === "true") {
      return;
    }

    menu.dataset.closing = "true";

    window.setTimeout(() => {
      menu.open = false;
      delete menu.dataset.closing;
    }, 120);
  };

  const toggleMenu = (event: MouseEvent<HTMLElement>) => {
    const menu = menuRef.current;

    if (!menu) {
      return;
    }

    if (menu.open) {
      event.preventDefault();
      closeMenuWithAnimation();
    }
  };

  const closeMenu = () => {
    closeMenuWithAnimation();
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="UNIVAK - на головну">
          <span className={styles.logoMark} aria-hidden="true">
            <svg viewBox="0 0 48 48" role="img" className={styles.logoIcon}>
              <path
                d="M12 17.5 24 10l12 7.5v18L24 43 12 35.5v-18Z"
                className={styles.packageShape}
              />
              <path
                d="M12 17.5 24 25l12-7.5M24 25v18"
                className={styles.packageLine}
              />
              <path
                d="M27.5 14.5c6.5-5.5 12.5-4.5 14-3.5.5 5.5-4 12-11 12-2.5 0-4.3-.7-5.5-1.7"
                className={styles.leafShape}
              />
              <path d="M27 21c2.4-3.2 5.3-5 9-6" className={styles.leafLine} />
            </svg>
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoName}>UNIVAK</span>
            <span className={styles.logoCaption}>Food packaging</span>
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

          <details className={styles.menuDetails} ref={menuRef}>
            <summary
              className={styles.burger}
              aria-label="Відкрити або закрити меню"
              aria-controls="mobile-navigation"
              onClick={toggleMenu}
            >
              <span className={styles.burgerLine} />
            </summary>

            <div id="mobile-navigation" className={styles.mobilePanel}>
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
                      {link.label}
                    </Link>
                  ))}
                </div>
                <Link
                  href="#contacts"
                  className={`button orange ${styles.mobileCta}`}
                  onClick={closeMenu}
                >
                  Зв’язатися
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
