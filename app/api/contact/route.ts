import { NextResponse } from "next/server";
import * as yup from "yup";

import { createContactEmailTemplate } from "@/lib/emailTemplates/contactEmailTemplate";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validation/contactFormSchema";

const BREVO_EMAIL_URL = "https://api.brevo.com/v3/smtp/email";

const invalidRequestResponse = () =>
  NextResponse.json(
    { message: "Перевірте правильність заповнення форми." },
    { status: 400 },
  );

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return invalidRequestResponse();
  }

  let contactData: ContactFormValues;

  try {
    contactData = await contactFormSchema.validate(requestBody, {
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return invalidRequestResponse();
    }

    console.error("Contact form validation failed unexpectedly.");
    return NextResponse.json(
      { message: "Не вдалося обробити заявку. Спробуйте пізніше." },
      { status: 500 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const companyEmail = process.env.COMPANY_EMAIL;

  if (!apiKey || !senderEmail || !companyEmail) {
    console.error("Brevo environment variables are not configured.");
    return NextResponse.json(
      { message: "Сервіс надсилання тимчасово недоступний." },
      { status: 500 },
    );
  }

  const { htmlContent, textContent } =
    createContactEmailTemplate(contactData);
  const isSandbox = process.env.BREVO_SANDBOX === "true";

  const payload = {
    sender: {
      name: "ЮНІВАК УКРАЇНА",
      email: senderEmail,
    },
    to: [
      {
        name: "ЮНІВАК УКРАЇНА",
        email: companyEmail,
      },
    ],
    replyTo: {
      name: contactData.name,
      email: contactData.email,
    },
    subject: "Нова заявка з сайту ЮНІВАК УКРАЇНА",
    htmlContent,
    textContent,
    ...(isSandbox
      ? {
          headers: {
            "X-Sib-Sandbox": "drop",
          },
        }
      : {}),
  };

  try {
    const brevoResponse = await fetch(BREVO_EMAIL_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!brevoResponse.ok) {
      console.error(`Brevo request failed with status ${brevoResponse.status}.`);
      return NextResponse.json(
        { message: "Не вдалося надіслати заявку. Спробуйте пізніше." },
        { status: 502 },
      );
    }

    return NextResponse.json({ message: "Заявку успішно надіслано." });
  } catch {
    console.error("Brevo request could not be completed.");
    return NextResponse.json(
      { message: "Не вдалося надіслати заявку. Спробуйте пізніше." },
      { status: 502 },
    );
  }
}
