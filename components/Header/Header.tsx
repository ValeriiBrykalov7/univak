"use client";

import Link from "next/link";
import {
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import Icon from "@/components/Icon/Icon";
import { socialLinks } from "@/data/socialLinks";

import styles from "./Header.module.css";

const navLinks = [
  { href: "#about", label: "Про компанію" },
  { href: "#products", label: "Наші пропозиції" },
  { href: "#contacts", label: "Контакти" },
];

export default function Header() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 12);

      if (window.innerWidth >= 1440 && menuRef.current?.open) {
        menuRef.current.open = false;
        delete menuRef.current.dataset.closing;
      }

      const pageMarker = window.scrollY + window.innerHeight * 0.42;
      let nextActiveSection = "";

      navLinks.forEach(({ href }) => {
        const sectionId = href.slice(1);
        const section = document.getElementById(sectionId);

        if (section && section.offsetTop <= pageMarker) {
          nextActiveSection = sectionId;
        }
      });

      setActiveSection(nextActiveSection);
    };

    const requestHeaderUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(() => {
        updateHeaderState();
        animationFrame = null;
      });
    };

    updateHeaderState();
    window.addEventListener("scroll", requestHeaderUpdate, { passive: true });
    window.addEventListener("resize", requestHeaderUpdate);

    return () => {
      window.removeEventListener("scroll", requestHeaderUpdate);
      window.removeEventListener("resize", requestHeaderUpdate);
      document.documentElement.classList.remove("mobile-menu-open");

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const closeMenuWithAnimation = () => {
    const menu = menuRef.current;

    if (!menu || !menu.open || menu.dataset.closing === "true") {
      return;
    }

    menu.dataset.closing = "true";

    window.setTimeout(() => {
      menu.open = false;
      delete menu.dataset.closing;
    }, 260);
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

  const handleMenuToggle = () => {
    document.documentElement.classList.toggle(
      "mobile-menu-open",
      Boolean(menuRef.current?.open),
    );
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="ЮНІВАК — на головну">
          <Icon name="logo" size={55} className={styles.logoIcon} />

          <span className={styles.logoText}>
            <span className={styles.logoName}>ЮНІВАК</span>
            <span className={styles.logoName}>УКРАЇНА</span>
          </span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Основна навігація">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                aria-current={isActive ? "location" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <Link href="#contacts" className={`button orange ${styles.cta}`}>
            Зв’язатися
          </Link>

          <details
            className={styles.menuDetails}
            ref={menuRef}
            onToggle={handleMenuToggle}
          >
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
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.slice(1);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`${styles.mobileLink} ${isActive ? styles.activeMobileLink : ""}`}
                        aria-current={isActive ? "location" : undefined}
                        onClick={closeMenuWithAnimation}
                      >
                        <span>{link.label}</span>
                        <Icon
                          name="icon-card-arrow"
                          size={24}
                          className={styles.mobileArrow}
                        />
                      </Link>
                    );
                  })}
                </div>
                <div className={styles.mobileFooter}>
                  <div className={styles.mobileSocialRow}>
                    <p className={styles.mobileSocialTitle}>
                      Написати директору
                    </p>
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
                            onClick={closeMenuWithAnimation}
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
                    onClick={closeMenuWithAnimation}
                  >
                    Зв’язатися
                  </Link>
                </div>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
