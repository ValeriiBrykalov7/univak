"use client";

import Link from "next/link";
import { MouseEvent, useRef } from "react";
import styles from "./Header.module.css";
import Icon from "../Icon/Icon";

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
          <Icon name="logo" size={55} className={styles.logoIcon} />

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
