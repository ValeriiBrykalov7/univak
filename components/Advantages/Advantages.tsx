import styles from "./Advantages.module.css";

const advantages = [
  {
    number: "01",
    title: "Надійний захист продукту",
    description:
      "Пакувальні матеріали допомагають зберігати якість, свіжість і товарний вигляд продукції під час зберігання, транспортування та реалізації",
  },
  {
    number: "02",
    title: "Рішення для виробництва",
    description:
      "Продукція підходить для камерних машин і автоматизованих пакувальних ліній різного масштабу",
  },
  {
    number: "03",
    title: "Гнучкість під потреби бізнесу",
    description:
      "Доступні різні формати, товщини, бар’єрні властивості, кольори та можливість друку для брендування упаковки",
  },
];

export default function Advantages() {
  return (
    <section className={styles.section} id="advantages">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Переваги</p>
          <h2 className={styles.title}>Чому обирають нас?</h2>
        </div>

        <ul className={styles.list}>
          {advantages.map((advantage) => (
            <li className={styles.item} key={advantage.number}>
              <span className={styles.number} aria-hidden="true">
                {advantage.number}
              </span>
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{advantage.title}</h3>
                <p className={styles.description}>{advantage.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
