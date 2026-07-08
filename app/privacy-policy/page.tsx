import type { Metadata } from "next";
import Link from "next/link";

import { createPageMetadata } from "@/lib/metadata";

import styles from "./privacy-policy.module.css";

export const metadata: Metadata = createPageMetadata({
  title: "Політика конфіденційності",
  description:
    "Інформація про обробку персональних даних користувачів сайту ТОВ «ЮНІВАК УКРАЇНА».",
  path: "/privacy-policy",
});

const privacySections = [
  {
    title: "1. Які дані ми збираємо",
    paragraphs: [
      "Коли ви надсилаєте форму зворотного зв’язку на сайті, ми можемо отримувати ваше ім’я, номер телефону, email та текст повідомлення, якщо ви його залишили.",
      "Ми збираємо лише ті дані, які ви добровільно передаєте через форму на сайті.",
    ],
  },
  {
    title: "2. Для чого ми використовуємо дані",
    paragraphs: [
      "Отримані дані використовуються для того, щоб зв’язатися з вами щодо вашого запиту, надати консультацію щодо пакувальних матеріалів, уточнити потреби вашого бізнесу або підготувати відповідь чи комерційну пропозицію.",
      "Ми не використовуємо ці дані для масових рекламних розсилок без вашої окремої згоди.",
    ],
  },
  {
    title: "3. Передача даних третім сторонам",
    paragraphs: [
      "Ми не продаємо і не передаємо ваші персональні дані третім особам для рекламних цілей.",
      "Для надсилання повідомлень із форми ми використовуємо сервіс електронної пошти Brevo. У такому випадку дані передаються лише в обсязі, необхідному для доставки вашого запиту на пошту компанії.",
    ],
  },
  {
    title: "4. Зберігання даних",
    paragraphs: [
      "Дані з форми зберігаються лише стільки, скільки потрібно для обробки вашого звернення, комунікації з вами та виконання можливих договірних або юридичних зобов’язань.",
    ],
  },
  {
    title: "5. Захист даних",
    paragraphs: [
      "Ми застосовуємо розумні технічні та організаційні заходи для захисту персональних даних від несанкціонованого доступу, втрати, зміни або розголошення.",
    ],
  },
  {
    title: "6. Ваші права",
    paragraphs: [
      "Ви можете звернутися до нас, щоб дізнатися, які ваші персональні дані ми обробляємо, попросити виправити неточні дані, видалити дані за відсутності законних підстав для їх подальшого зберігання або відкликати згоду на обробку.",
    ],
  },
  {
    title: "7. Зміни до політики",
    paragraphs: [
      "Ми можемо оновлювати цю Політику конфіденційності. Актуальна версія завжди доступна на цій сторінці.",
    ],
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <section className={styles.section} aria-labelledby="privacy-title">
      <div className={`container ${styles.container}`}>
        <nav className={styles.breadcrumbs} aria-label="Навігаційний ланцюжок">
          <Link href="/">Головна</Link>
          <span aria-hidden="true">/</span>
          <span>Політика конфіденційності</span>
        </nav>

        <header className={styles.header}>
          <p className={styles.eyebrow}>Персональні дані</p>
          <h1 className={styles.title} id="privacy-title">
            Політика конфіденційності
          </h1>
          <p className={styles.lead}>
            ТОВ «ЮНІВАК УКРАЇНА» поважає вашу конфіденційність і відповідально
            ставиться до захисту персональних даних користувачів сайту.
          </p>
        </header>

        <div className={styles.content}>
          {privacySections.map((section) => (
            <section className={styles.card} key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}

          <section className={`${styles.card} ${styles.contactsCard}`}>
            <h2>8. Контакти</h2>
            <p>
              З питань обробки персональних даних ви можете звернутися до нас:
            </p>
            <address className={styles.contacts}>
              <strong>ТОВ «ЮНІВАК УКРАЇНА»</strong>
              <a href="mailto:univac.ua@gmail.com">univac.ua@gmail.com</a>
              <a href="tel:+380504439213">+38 050 443 92 13</a>
              <span>
                08343, Київська обл., Бориспільський р-н, с. Мартусівка, вул.
                Промислова, 72
              </span>
            </address>
          </section>
        </div>
      </div>
    </section>
  );
}
