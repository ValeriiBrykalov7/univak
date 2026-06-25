import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/data/products";

import styles from "./ProductsSection.module.css";

export default function ProductsSection() {
  return (
    <section className={styles.section} id="products">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>Наші пропозиції</p>
          <h2 className={styles.title}>
            Пакувальні рішення для харчового виробництва
          </h2>
          <p className={styles.description}>
            Підібрали основні матеріали, з якими працюють виробники молочної,
            м&apos;ясної та готової харчової продукції.
          </p>
        </div>

        <ul className={styles.list}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
