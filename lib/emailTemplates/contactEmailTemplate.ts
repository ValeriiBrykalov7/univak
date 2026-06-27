import type { ContactFormValues } from "@/lib/validation/contactFormSchema";
import { escapeHtml } from "@/lib/escapeHtml";

export const DEFAULT_CONTACT_MESSAGE =
  "Клієнт зацікавлений у пакувальних матеріалах і просить зв’язатися з ним.";

type ContactEmailContent = {
  htmlContent: string;
  textContent: string;
};

export function createContactEmailTemplate({
  name,
  phone,
  email,
  message,
}: ContactFormValues): ContactEmailContent {
  const messageContent = message || DEFAULT_CONTACT_MESSAGE;
  const safeName = escapeHtml(name);
  const safePhone = escapeHtml(phone);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(messageContent).replace(/\r?\n/g, "<br />");

  return {
    htmlContent: `<!doctype html>
<html lang="uk">
  <body style="margin:0;padding:0;background-color:#f4f7f4;font-family:Arial,sans-serif;color:#1f2933;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7f4;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background-color:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
            <tr>
              <td style="padding:24px 28px;background-color:#2f6b3f;color:#ffffff;border-bottom:4px solid #f47c20;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#fff3e8;">ЮНІВАК УКРАЇНА</p>
                <h1 style="margin:0;font-size:24px;line-height:1.3;">Нова заявка з сайту</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 22px;font-size:15px;line-height:1.6;color:#667085;">Користувач заповнив форму зворотного зв’язку.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="width:112px;padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#2f6b3f;vertical-align:top;">Ім’я</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:15px;line-height:1.5;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="width:112px;padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#2f6b3f;vertical-align:top;">Телефон</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:15px;line-height:1.5;">${safePhone}</td>
                  </tr>
                  <tr>
                    <td style="width:112px;padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:14px;font-weight:700;color:#2f6b3f;vertical-align:top;">Email</td>
                    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-size:15px;line-height:1.5;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="width:112px;padding:10px 0;font-size:14px;font-weight:700;color:#2f6b3f;vertical-align:top;">Повідомлення</td>
                    <td style="padding:10px 0;font-size:15px;line-height:1.6;">${safeMessage}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background-color:#eaf6ee;font-size:12px;line-height:1.5;color:#667085;">
                Щоб відповісти клієнту, натисніть Reply у вашому поштовому клієнті.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
    textContent: [
      "Нова заявка з сайту ЮНІВАК УКРАЇНА",
      "",
      `Ім’я: ${name}`,
      `Телефон: ${phone}`,
      `Email: ${email}`,
      `Повідомлення: ${messageContent}`,
    ].join("\n"),
  };
}
