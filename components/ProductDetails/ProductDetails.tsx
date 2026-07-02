import Image from "next/image";
import Link from "next/link";

import Icon from "@/components/Icon/Icon";
import PrintInfoExpandable from "@/components/PrintInfoExpandable/PrintInfoExpandable";
import type { Product } from "@/data/products";
import { getPrintOptionDetails } from "@/data/printOptions";

import styles from "./ProductDetails.module.css";

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  const printDetails = product.printOption
    ? getPrintOptionDetails(product.printOption.detailsKey)
    : null;

  return (
    <article className={styles.product}>
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <nav
            className={styles.breadcrumbs}
            aria-label="Навігаційний ланцюжок"
          >
            <Link href="/#products">Наші пропозиції</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{product.shortTitle}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Пакувальне рішення</p>
              <h1 className={styles.title}>{product.title}</h1>

              <ul className={styles.tags} aria-label="Категорії продукту">
                {product.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <p className={styles.description}>{product.description}</p>

              <Link
                className={`button orange ${styles.heroCta}`}
                href="/#contacts"
              >
                Отримати консультацію
              </Link>
            </div>

            <div className={styles.imageWrap}>
              <Image
                className={styles.image}
                src={product.image}
                alt={product.shortTitle}
                fill
                priority
                sizes="(min-width: 1440px) 540px, (min-width: 768px) 656px, calc(100vw - 32px)"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className={`container ${styles.sectionContainer}`}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Практична користь</p>
            <h2>Основні переваги</h2>
          </div>

          <ul className={styles.benefitsList}>
            {product.benefits.map((benefit) => (
              <li key={benefit}>
                <Icon
                  name="icon-shield-check"
                  size={22}
                  className={styles.benefitIcon}
                />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.specsSection}>
        <div className={`container ${styles.sectionContainer}`}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>Параметри продукту</p>
            <h2>Технічні характеристики</h2>
          </div>

          <dl className={styles.specsList}>
            {product.technicalSpecs.map((spec) => (
              <div className={styles.specRow} key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>
                  <ul>
                    {spec.values.map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {product.seamTypes ? (
        <section className={styles.seamsSection}>
          <div className={`container ${styles.sectionContainer}`}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionEyebrow}>Варіанти виготовлення</p>
              <h2>Доступні види швів</h2>
              <p className={styles.sectionDescription}>
                Конструкцію пакета можна підібрати відповідно до форми продукту
                та типу пакувального обладнання.
              </p>
            </div>

            <ul className={styles.seamsList}>
              {product.seamTypes.map((seam) => (
                <li className={styles.seamCard} key={seam.id}>
                  <div className={styles.seamImageWrap}>
                    <Image
                      src={seam.image}
                      alt=""
                      width={240}
                      height={220}
                      className={styles.seamImage}
                    />
                  </div>
                  <h3>{seam.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {printDetails ? <PrintInfoExpandable details={printDetails} /> : null}

      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaContainer}`}>
          <div>
            <p className={styles.ctaEyebrow}>Потрібна допомога з вибором?</p>
            <h2>Підберемо матеріал під ваше виробництво</h2>
            <p>
              Допоможемо визначити формат, товщину, бар’єрні властивості та
              варіант друку.
            </p>
          </div>
          <Link
            className={`button orange ${styles.ctaButton}`}
            href="/#contacts"
          >
            Зв’язатися з нами
          </Link>
        </div>
      </section>
    </article>
  );
}
