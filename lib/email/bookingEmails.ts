import type { Booking } from "@/types";
import { SITE_CONFIG } from "@/lib/config/site";
import { sendEmail } from "./brevo";

// Customer-entered text goes into HTML, so escape it
function esc(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailsTable(b: Booking) {
  const rows: [string, unknown][] = [
    ["Booking Reference", b.booking_reference],
    ["Package", b.package_name],
    ["Date", b.booking_date],
    ["Adults", b.adults],
    ["Children", b.children || 0],
    ["Pickup Location", b.pickup_location],
    ["Hotel", b.hotel_name],
    ["Name", b.customer_name],
    ["Phone", b.phone],
    ["Email", b.email],
    ["Special Requests", b.special_requests],
  ];
  return `<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px">${rows
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="border-bottom:1px solid #eee;color:#666;width:40%">${k}</td><td style="border-bottom:1px solid #eee;color:#17120D"><strong>${esc(v)}</strong></td></tr>`
    )
    .join("")}</table>`;
}

function layout(title: string, body: string) {
  const { gold, cream, primaryDark } = SITE_CONFIG.colors;
  return `<!doctype html><html><body style="margin:0;background:${cream};font-family:Arial,Helvetica,sans-serif;color:${primaryDark}">
<div style="max-width:600px;margin:0 auto;padding:24px">
  <div style="background:#fff;border-radius:12px;padding:28px;border-top:4px solid ${gold}">
    <h1 style="margin:0 0 16px;font-size:20px">${title}</h1>
    ${body}
  </div>
  <p style="text-align:center;color:#999;font-size:12px;margin-top:16px">${esc(SITE_CONFIG.name)} · ${esc(SITE_CONFIG.contact.address)} · <a href="${SITE_CONFIG.url}" style="color:${gold}">${SITE_CONFIG.url.replace("https://", "")}</a></p>
</div></body></html>`;
}

// Sends the admin notification and, when the customer gave an email, their confirmation.
// Never throws: a failed email must not fail a saved booking.
export async function sendBookingEmails(b: Booking) {
  const adminTo = process.env.BOOKING_NOTIFY_EMAIL || process.env.BREVO_SENDER_EMAIL || SITE_CONFIG.contact.email;
  const whatsappDigits = SITE_CONFIG.contact.whatsapp.replace(/^00/, "").replace(/\D/g, "");

  const tasks: Promise<boolean>[] = [
    sendEmail({
      to: adminTo.split(",").map((email) => ({ email: email.trim() })).filter((a) => a.email),
      subject: `New Booking ${b.booking_reference}: ${b.package_name ?? "Desert Safari"} on ${b.booking_date}`,
      html: layout(
        "New booking received",
        `${detailsTable(b)}
        <p style="margin-top:20px"><a href="${SITE_CONFIG.url}/admin/bookings" style="background:${SITE_CONFIG.colors.gold};color:#17120D;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:bold">Open in Admin</a></p>`
      ),
      replyTo: b.email ? { email: b.email, name: b.customer_name } : undefined,
    }),
  ];

  if (b.email) {
    tasks.push(
      sendEmail({
        to: [{ email: b.email, name: b.customer_name }],
        subject: `Booking received: ${b.booking_reference} | ${SITE_CONFIG.name}`,
        html: layout(
          `Thank you, ${esc(b.customer_name)}!`,
          `<p style="font-size:15px;line-height:1.6">We have received your booking request. Our team will confirm your pickup time shortly on WhatsApp or phone.</p>
          ${detailsTable(b)}
          <p style="font-size:14px;line-height:1.6;margin-top:20px">Questions? WhatsApp us at <a href="https://wa.me/${whatsappDigits}" style="color:${SITE_CONFIG.colors.gold}">+${whatsappDigits}</a> or reply to this email.</p>`
        ),
        // Customer replies go to the mailbox we actually send from
        replyTo: { email: process.env.BREVO_SENDER_EMAIL || SITE_CONFIG.contact.email, name: SITE_CONFIG.name },
      })
    );
  }

  await Promise.allSettled(tasks);
}
