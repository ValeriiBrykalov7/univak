"use client";

import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";

import Icon from "@/components/Icon/Icon";

import styles from "./BackToTop.module.css";

const DEFAULT_HEADER_HEIGHT = 74;

function getHeaderHeight() {
  return (
    document.querySelector<HTMLElement>("header")?.offsetHeight ??
    DEFAULT_HEADER_HEIGHT
  );
}

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis((instance) => {
    setIsVisible(instance.scroll > getHeaderHeight());
  });

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(window.scrollY > getHeaderHeight());
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { force: true });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`${styles.backToTop} ${isVisible ? styles.visible : ""}`}
      type="button"
      aria-label="Повернутися на початок сторінки"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      title="Повернутися нагору"
      onClick={scrollToTop}
    >
      <Icon
        name="icon-chevron-down"
        size={22}
        className={styles.icon}
      />
    </button>
  );
}
