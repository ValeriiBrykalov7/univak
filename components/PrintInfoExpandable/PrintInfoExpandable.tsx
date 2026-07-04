"use client";

import { useState } from "react";

import Icon from "@/components/Icon/Icon";
import type { PrintOptionDetails } from "@/data/printOptions";

import styles from "./PrintInfoExpandable.module.css";

type PrintInfoExpandableProps = {
  details: PrintOptionDetails;
};

export default function PrintInfoExpandable({
  details,
}: PrintInfoExpandableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `print-details-${details.key}`;
  const toggleId = `print-toggle-${details.key}`;

  return (
    <section
      className={styles.section}
      aria-labelledby={`${details.key}-title`}
    >
      <div className={`container ${styles.container}`}>
        <div className={styles.summaryRow}>
          <div className={styles.summaryContent}>
            <p className={styles.eyebrow}>Індивідуальне оформлення</p>
            <h2 className={styles.title} id={`${details.key}-title`}>
              {details.title}
            </h2>
            <p className={styles.summary}>{details.summary}</p>

            <ul className={styles.previewPalette} aria-label="Кольори палітри">
              {details.colors.slice(0, 10).map((color) => (
                <li
                  className={styles.previewColor}
                  key={color.code}
                  title={`${color.code} — ${color.name}`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </ul>
          </div>

          <button
            className={`button transparent ${styles.toggle}`}
            id={toggleId}
            type="button"
            aria-controls={contentId}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            <span className={styles.toggleText}>
              {isOpen ? "Згорнути інформацію" : "Палітра та деталі друку"}
            </span>
            <Icon
              name="icon-chevron-down"
              size={20}
              className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
            />
          </button>
        </div>

        <div
          className={`${styles.expandable} ${isOpen ? styles.expandableOpen : ""}`}
          id={contentId}
          role="region"
          aria-labelledby={toggleId}
          aria-hidden={!isOpen}
        >
          <div className={styles.expandableInner}>
            <div className={styles.details}>
              <p className={styles.introduction}>{details.introduction}</p>

              <ul className={styles.capabilities}>
                {details.capabilities.map((capability) => (
                  <li className={styles.capability} key={capability.title}>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </li>
                ))}
              </ul>

              <div className={styles.qualitySection}>
                <div>
                  <p className={styles.subheading}>Якість друку</p>
                  <dl className={styles.qualityList}>
                    {details.quality.map((item) => (
                      <div className={styles.qualityItem} key={item.label}>
                        <dt>
                          <span>{item.label}</span>
                        </dt>
                        <dd>{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className={styles.productionInfo}>
                  <p className={styles.subheading}>Сумісні матеріали</p>
                  <ul className={styles.materials}>
                    {details.materials.map((material) => (
                      <li key={material}>{material}</li>
                    ))}
                  </ul>
                  <p className={styles.productionCycle}>
                    {details.productionCycle}
                  </p>
                </div>
              </div>

              <div className={styles.paletteSection}>
                <div className={styles.paletteHeader}>
                  <div>
                    <p className={styles.subheading}>{details.paletteTitle}</p>
                    <p>{details.paletteDescription}</p>
                  </div>
                  <p className={styles.paletteNote}>{details.paletteNote}</p>
                </div>

                <div className={styles.tableWrap}>
                  <table className={styles.colorTable}>
                    <thead>
                      <tr>
                        <th scope="col">Зразок</th>
                        <th scope="col">Код</th>
                        <th scope="col">Назва кольору</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.colors.map((color) => (
                        <tr key={color.code}>
                          <td>
                            <span
                              className={styles.colorSwatch}
                              style={{ backgroundColor: color.hex }}
                              aria-hidden="true"
                            />
                          </td>
                          <td>
                            <strong>{color.code}</strong>
                          </td>
                          <td>{color.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <p className={styles.conclusion}>{details.conclusion}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
