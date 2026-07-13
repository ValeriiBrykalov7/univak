import Link from "next/link";

import ContactForm from "@/components/ContactForm/ContactForm";
import Icon from "@/components/Icon/Icon";
import { navigationLinks } from "@/data/navigationLinks";
import { socialLinks } from "@/data/socialLinks";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.brand}>
              <Link
                className={styles.logoLink}
                href="/"
                aria-label="На головну"
              >
                <Icon name="logo" size={70} className={styles.logoIcon} />
                <span>
                  <span className={styles.logoName}>ЮНІВАК УКРАЇНА</span>
                  <span className={styles.logoCaption}>
                    Пакувальні матеріали для харчової промисловості
                  </span>
                </span>
              </Link>
            </div>

            <address className={styles.address}>
              <div className={styles.contactBlock}>
                <h2 className={styles.blockTitle}>Адреса</h2>
                <p>
                  Юридична та фактична адреса:
                  <br />
                  08343, Київська обл.,
                  <br />
                  Бориспільський р-н,
                  <br />
                  с. Мартусівка,
                  <br />
                  вул. Промислова, 72
                </p>
              </div>

              <div className={styles.contactBlock}>
                <h2 className={styles.blockTitle}>Директор</h2>
                <p>Брикалов Валерій</p>
                <a className={styles.contactLink} href="tel:+380504439213">
                  <Icon name="icon-phone" size={18} />
                  <span>+38 050 443 92 13</span>
                </a>
                <a
                  className={styles.contactLink}
                  href="mailto:univac.ua@gmail.com"
                >
                  <Icon name="icon-mail" size={18} />
                  <span>univac.ua@gmail.com</span>
                </a>
              </div>
            </address>

            <div className={styles.socialGroup}>
              <p className={styles.socialTitle}>Швидкий чат з директором</p>
              <ul className={styles.socialList}>
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      className={styles.socialLink}
                      href={link.href}
                      aria-label={link.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon name={link.icon} size={22} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className={styles.bottom}>
          <p>© 2026 ЮНІВАК УКРАЇНА. Усі права захищено.</p>
          <nav className={styles.footerNav} aria-label="Навігація футера">
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
