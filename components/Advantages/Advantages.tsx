import styles from "./Advantages.module.css";

const advantages = [
  {
    number: "01",
    title: "Надійний захист продукту",
    description:
      "Використовуємо пакувальні матеріали, які забезпечують якість, свіжість і бездоганний вигляд продукції на всіх етапах - від виробництва до реалізації",
  },
  {
    number: "02",
    title: "Рішення для виробництва",
    description:
      "Створюємо пакувальні рішення для виробництва будь-якого масштабу - від камерного обладнання до сучасних автоматизованих пакувальних ліній",
  },
  {
    number: "03",
    title: "Гнучкість під потреби бізнесу",
    description:
      "Пропонуємо широкий вибір форматів, товщин, бар’єрних властивостей і кольорів, з можливістю нанесення індивідуального друку, для створення унікальної упаковки вашого бренду",
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
