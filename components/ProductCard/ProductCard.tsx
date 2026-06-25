import Image from "next/image";
import Link from "next/link";

import Icon from "@/components/Icon/Icon";
import type { Product } from "@/data/products";

import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const productNumber = product.id.toString().padStart(2, "0");

  return (
    <li className={styles.item}>
      <Link
        className={styles.card}
        href={`/products/${product.slug}`}
        aria-label={`Детальніше про ${product.shortTitle}`}
      >
        <span className={styles.number} aria-hidden="true">
          {productNumber}
        </span>

        <span className={styles.imageWrap}>
          <Image
            className={styles.image}
            src={product.image}
            alt={product.shortTitle}
            fill
            sizes="(min-width: 1440px) 285px, (min-width: 768px) 316px, 100vw"
          />
        </span>

        <span className={styles.content}>
          <span className={styles.text}>
            <span className={styles.title}>{product.shortTitle}</span>
            <span className={styles.description}>
              {product.shortDescription}
            </span>
          </span>

          <span className={styles.badges}>
            {product.tags.map((tag) => (
              <span className={styles.tagBadge} key={tag}>
                {tag}
              </span>
            ))}

            {product.seamTypes ? (
              <span className={styles.featureBadge}>Види швів</span>
            ) : null}

            {product.printOption ? (
              <span className={styles.featureBadge}>Друк до 10 кольорів</span>
            ) : null}
          </span>

          <span className={styles.action}>
            Детальніше
            <Icon name="icon-card-arrow" size={18} className={styles.arrow} />
          </span>
        </span>
      </Link>
    </li>
  );
}
