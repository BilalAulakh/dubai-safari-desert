// Minimal Brevo transactional email client (https://developers.brevo.com/reference/sendtransacemail).
// Plain fetch, no SDK. Configure via env vars; when BREVO_API_KEY is missing, sending is skipped.

interface EmailAddress {
  email: string;
  name?: string;
}

interface SendEmailInput {
  to: EmailAddress[];
  subject: string;
  html: string;
  replyTo?: EmailAddress;
}

export function isBrevoConfigured() {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailInput): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !senderEmail) {
    console.warn("Brevo not configured (BREVO_API_KEY / BREVO_SENDER_EMAIL); email skipped:", subject);
    return false;
  }

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: process.env.BREVO_SENDER_NAME || "Safari Dune Tours" },
        to,
        subject,
        htmlContent: html,
        ...(replyTo ? { replyTo } : {}),
      }),
    });

    if (!res.ok) {
      console.error("Brevo send failed:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Brevo send error:", err);
    return false;
  }
}
