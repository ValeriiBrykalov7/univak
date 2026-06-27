"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";
import Loader from "@/components/Loader/Loader";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation/contactFormSchema";

import styles from "./ContactForm.module.css";

const CONTACT_TOAST_ID = "contact-form-result";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: yupResolver(contactFormSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      reset();
      toast.success("Дякуємо! Вашу заявку надіслано.", {
        id: CONTACT_TOAST_ID,
        description: "Ми зв’яжемося з вами найближчим часом.",
      });
    } catch {
      toast.error("Не вдалося надіслати заявку.", {
        id: CONTACT_TOAST_ID,
        description: "Спробуйте ще раз або зателефонуйте нам.",
      });
    }
  });

  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      <div className={styles.header}>
        <p className={styles.eyebrow}>Зворотний зв’язок</p>
        <h2 className={styles.title}>Напишіть нам</h2>
      </div>

      <div className={styles.fields}>
        <label className={styles.field}>
          <span className={styles.label}>
            <Icon name="icon-user" size={16} />
            Ім’я
          </span>
          <input
            className={styles.input}
            type="text"
            placeholder="Ваше ім’я"
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name")}
          />
          {errors.name ? (
            <span className={styles.error} id="contact-name-error">
              {errors.name.message}
            </span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            <Icon name="icon-phone" size={16} />
            Телефон
          </span>
          <input
            className={styles.input}
            type="tel"
            placeholder="+38 050 000 00 00"
            autoComplete="tel"
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            {...register("phone")}
          />
          {errors.phone ? (
            <span className={styles.error} id="contact-phone-error">
              {errors.phone.message}
            </span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            <Icon name="icon-mail" size={16} />
            Email
          </span>
          <input
            className={styles.input}
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email")}
          />
          {errors.email ? (
            <span className={styles.error} id="contact-email-error">
              {errors.email.message}
            </span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            <Icon name="icon-message" size={16} />
            Повідомлення
            <span className={styles.optional}>(необов’язково)</span>
          </span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            placeholder="Коротко опишіть, які пакувальні матеріали вас цікавлять"
            rows={5}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            {...register("message")}
          />
          {errors.message ? (
            <span className={styles.error} id="contact-message-error">
              {errors.message.message}
            </span>
          ) : null}
        </label>
      </div>

      <Button
        className={`orange ${styles.submit}`}
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        <span className={styles.submitContent}>
          {isSubmitting ? <Loader /> : null}
          <span>{isSubmitting ? "Надсилаємо" : "Надіслати"}</span>
        </span>
      </Button>
    </form>
  );
}
