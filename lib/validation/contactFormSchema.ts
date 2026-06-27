import * as yup from "yup";

export type ContactFormValues = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const phonePattern = /^[+\d\s()-]{7,20}$/;

export const contactFormSchema: yup.ObjectSchema<ContactFormValues> = yup
  .object({
    name: yup
      .string()
      .trim()
      .max(80, "Ім’я має містити не більше 80 символів")
      .required("Вкажіть ім’я"),
    phone: yup
      .string()
      .trim()
      .max(20, "Номер телефону задовгий")
      .required("Вкажіть номер телефону")
      .matches(phonePattern, "Вкажіть коректний номер телефону"),
    email: yup
      .string()
      .trim()
      .lowercase()
      .max(254, "Email задовгий")
      .email("Вкажіть коректний email")
      .required("Вкажіть email"),
    message: yup
      .string()
      .trim()
      .max(2000, "Повідомлення має містити не більше 2000 символів")
      .default(""),
  })
  .required();
