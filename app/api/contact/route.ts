// app/api/contact/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, comment } = body;

    if (!name || !email) {
      return NextResponse.json(
        { message: "Name and email are required" },
        { status: 400 },
      );
    }

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Website Contact Form",
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: process.env.COMPANY_EMAIL,
          },
        ],
        subject: `Нова заявка від ${name}`,
        htmlContent: `
          <h2>Нова заявка з сайту</h2>
          <p><strong>Ім'я:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Коментар:</strong> ${comment || "Без коментаря"}</p>
        `,
      }),
    });

    return NextResponse.json({ message: "Email sent successfully" });
  } catch {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
