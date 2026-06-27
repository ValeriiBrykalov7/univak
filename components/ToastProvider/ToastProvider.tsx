"use client";

import { Toaster } from "sonner";

import styles from "./ToastProvider.module.css";

export default function ToastProvider() {
  return (
    <Toaster
      className={styles.toaster}
      position="top-right"
      offset={20}
      mobileOffset={16}
      visibleToasts={1}
      duration={4500}
      richColors
      closeButton
      containerAriaLabel="Сповіщення"
      toastOptions={{
        classNames: {
          toast: styles.toast,
          title: styles.title,
          description: styles.description,
          success: styles.success,
          error: styles.error,
          closeButton: styles.closeButton,
        },
      }}
    />
  );
}
