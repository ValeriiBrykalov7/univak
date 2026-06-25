"use client";

import { useState } from "react";
import type { FieldErrors, Resolver } from "react-hook-form";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "@/components/Button/Button";
import Icon from "@/components/Icon/Icon";

import styles from "./ContactForm.module.css";

type ContactFormValues = {
  name: string;
  phone: string;
  message: string;
};

const contactFormSchema: yup.ObjectSchema<ContactFormValues> = yup
  .object({
    name: yup.string().trim().required("Вкажіть ім’я"),
    phone: yup
      .string()
      .trim()
      .required("Вкажіть номер телефону")
      .matches(/^[+\d\s()-]{7,20}$/, "Вкажіть коректний номер телефону"),
    message: yup
      .string()
      .trim()
      .required("Напишіть повідомлення")
      .min(5, "Повідомлення має містити щонайменше 5 символів"),
  })
  .required();

const yupResolver: Resolver<ContactFormValues> = async (values) => {
  try {
    const validatedValues = await contactFormSchema.validate(values, {
      abortEarly: false,
    });

    return {
      values: validatedValues,
      errors: {},
    };
  } catch (error) {
    if (!(error instanceof yup.ValidationError)) {
      return {
        values: {},
        errors: {},
      };
    }

    const formErrors: FieldErrors<ContactFormValues> = {};

    error.inner.forEach((validationError) => {
      const fieldName = validationError.path as keyof ContactFormValues;

      if (fieldName && !formErrors[fieldName]) {
        formErrors[fieldName] = {
          type: validationError.type ?? "validation",
          message: validationError.message,
        };
      }
    });

    return {
      values: {},
      errors: formErrors,
    };
  }
};

export default function ContactForm() {
  const [isValidated, setIsValidated] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: yupResolver,
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit(() => {
    setIsValidated(true);
  });

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
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
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          {errors.name ? (
            <span className={styles.error}>{errors.name.message}</span>
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
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          {errors.phone ? (
            <span className={styles.error}>{errors.phone.message}</span>
          ) : null}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>
            <Icon name="icon-mail" size={16} />
            Повідомлення
          </span>
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            placeholder="Коротко опишіть, які пакувальні матеріали вас цікавлять"
            rows={5}
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          {errors.message ? (
            <span className={styles.error}>{errors.message.message}</span>
          ) : null}
        </label>
      </div>

      <Button
        className={`orange ${styles.submit}`}
        type="submit"
        disabled={isSubmitting}
      >
        Надіслати
      </Button>

      {isValidated ? (
        <p className={styles.status} role="status">
          Дані перевірено. Відправку повідомлень підключимо наступним етапом.
        </p>
      ) : null}
    </form>
  );
}
