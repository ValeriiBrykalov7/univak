import Icon from "@/components/Icon/Icon";
import styles from "./About.module.css";

const facts = [
  "Працюємо з 2018 року",
  "B2B-постачання для виробників",
  "Молочна та м’ясна промисловість",
  "Логістика до дверей клієнта",
];

const focusAreas = [
  {
    title: "Що постачаємо",
    description:
      "Імпортуємо термозбіжні пакети для пакування та дозрівання сиру й м’ясної продукції. Також пропонуємо термозбіжні плівки, бар’єрні плівки FV, верхні плівки для термоформування, FLOW PACK, SKIN та інші рішення",
  },
  {
    title: "Як працюємо з клієнтами",
    description:
      "Надаємо професійні консультації, інформаційну підтримку 24/7 і допомагаємо знаходити технічні та технологічні рішення для ефективного використання пакувальних матеріалів",
  },
  {
    title: "Якість і стандарти",
    description:
      "Працюємо з перевіреними виробниками, які відповідають європейським стандартам якості та мають сертифікати BRC, HALAL, KASHRUT та інші підтвердження відповідності",
  },
  {
    title: "Логістика та сервіс",
    description:
      "Організовуємо оперативне, своєчасне й безперебійне постачання пакувальних матеріалів. Плануємо потреби клієнтів і доставляємо продукцію до дверей кожного партнера",
  },
];

const focusIcons = [
  "icon-package-layers",
  "icon-support",
  "icon-shield-check",
  "icon-truck-route",
];

const missionItems = [
  "професійно та чітко виконувати замовлення клієнтів",
  "пропонувати економічні рішення для раціонального використання пакувальних матеріалів",
  "підтримувати довіру клієнтів і розвивати стратегічне партнерство",
];

export default function About() {
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.container}`}>
        <div className={styles.intro}>
          <div className={styles.header}>
            <p className={styles.eyebrow}>Про компанію</p>
            <h2 className={styles.title}>
              Пакувальні матеріали для харчової промисловості
            </h2>
            <div className={styles.lead}>
              <p>
                ТОВ «ЮНІВАК УКРАЇНА» - надійний партнер українських виробників
                харчової продукції з 2018 року
              </p>
              <p>
                Ми постачаємо сучасні пакувальні рішення, які допомагають
                підприємствам забезпечувати високу якість продукції,
                ефективність виробництва та стабільність технологічних процесів
              </p>
              <p>
                Основний напрям нашої діяльності - імпорт і постачання
                високоякісних пакувальних матеріалів для підприємств молочної та
                м’ясної промисловості. Ми співпрацюємо з європейськими
                виробниками пакувальних матеріалів, пропонуючи продукцію, що
                відповідає сучасним вимогам законодавства на ринку харчової
                промисловості
              </p>
              <p>
                Для наших клієнтів ми більше, ніж постачальник. Ми - сервісний
                партнер, який консультує, допомагає підібрати оптимальні
                пакувальні рішення, супроводжує впровадження продукції у
                виробництво та забезпечує професійну підтримку на кожному етапі
                співпраці.
              </p>
            </div>
          </div>

          <div className={styles.sideColumn}>
            <aside className={styles.factsPanel} aria-label="Ключові факти">
              <span className={styles.factsYear} aria-hidden="true">
                2018
              </span>
              <p className={styles.factsTitle}>Ключові факти</p>
              <ul className={styles.factsList}>
                {facts.map((fact) => (
                  <li className={styles.fact} key={fact}>
                    {fact}
                  </li>
                ))}
              </ul>
            </aside>

            <aside
              className={styles.supportCard}
              aria-label="Підтримка клієнтів"
            >
              <span className={styles.supportIcon} aria-hidden="true">
                <Icon name="icon-support" size={26} />
              </span>
              <div>
                <p className={styles.supportTitle}>Підтримка 24/7</p>
                <p className={styles.supportText}>
                  Консультуємо щодо підбору матеріалів, умов використання та
                  планування постачання
                </p>
              </div>
            </aside>
          </div>
        </div>

        <div className={styles.focusGrid}>
          {focusAreas.map((area, index) => (
            <article className={styles.focusCard} key={area.title}>
              <span className={styles.focusIcon} aria-hidden="true">
                <Icon name={focusIcons[index]} size={28} />
              </span>
              <h3 className={styles.focusTitle}>{area.title}</h3>
              <p className={styles.focusText}>{area.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.standardNote}>
          <div className={styles.standardBadge} aria-hidden="true">
            <span>EU</span>
            <strong>2025/40</strong>
            <span>PPWR</span>
          </div>
          <p>
            Пакувальні матеріали відповідають вимогам Регламенту Європейського
            Парламенту та Ради (EU) 2025/40 (PPWR), який встановлює вимоги до
            екологічності, безпечності, хімічного складу та маркування упаковки
          </p>
        </div>

        <div className={styles.mission}>
          <div>
            <p className={styles.missionEyebrow}>Наша місія</p>
            <h3 className={styles.missionTitle}>
              Допомагати виробникам працювати стабільно, економно і впевнено
            </h3>
          </div>
          <ul className={styles.missionList}>
            {missionItems.map((item) => (
              <li className={styles.missionItem} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
