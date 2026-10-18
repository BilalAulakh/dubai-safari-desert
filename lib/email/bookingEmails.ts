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
  // Label stacked above value: fits any screen width without media queries,
  // and long values (emails, hotel names) wrap instead of overflowing
  return `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;width:100%;table-layout:fixed">${rows
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;word-break:break-word;overflow-wrap:anywhere">
          <div style="font-size:12px;color:#777;text-transform:uppercase;letter-spacing:0.5px">${k}</div>
          <div style="font-size:15px;color:#17120D;font-weight:bold;margin-top:3px">${esc(v)}</div>
        </td></tr>`
    )
    .join("")}</table>`;
}

function layout(title: string, body: string) {
  const { gold, cream, primaryDark } = SITE_CONFIG.colors;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${cream};font-family:Arial,Helvetica,sans-serif;color:${primaryDark};-webkit-text-size-adjust:100%">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:${cream}"><tr><td align="center" style="padding:16px 8px">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;width:100%;table-layout:fixed">
    <tr><td style="background:#fff;border-radius:12px;padding:20px 18px;border-top:4px solid ${gold};word-break:break-word;overflow-wrap:anywhere">
      <h1 style="margin:0 0 14px;font-size:20px;line-height:1.3">${title}</h1>
      ${body}
    </td></tr>
    <tr><td style="text-align:center;color:#999;font-size:12px;padding:14px 8px;line-height:1.5">${esc(SITE_CONFIG.name)} · ${esc(SITE_CONFIG.contact.address)}<br><a href="${SITE_CONFIG.url}" style="color:${gold}">${SITE_CONFIG.url.replace("https://", "")}</a></td></tr>
  </table>
</td></tr></table></body></html>`;
}

// Customer email when an admin moves a booking to confirmed or cancelled.
// Other statuses (contacted, completed, back to pending) send nothing.
// Internal admin notes are deliberately never included.
export async function sendBookingStatusEmail(b: Booking): Promise<boolean> {
  if (!b.email || (b.status !== "confirmed" && b.status !== "cancelled")) return false;
  const whatsappDigits = SITE_CONFIG.contact.whatsapp.replace(/^00/, "").replace(/\D/g, "");
  const whatsappLink = `<a href="https://wa.me/${whatsappDigits}" style="color:${SITE_CONFIG.colors.gold}">+${whatsappDigits}</a>`;
  const confirmed = b.status === "confirmed";

  return sendEmail({
    to: [{ email: b.email, name: b.customer_name }],
    subject: confirmed
      ? `Booking confirmed: ${b.booking_reference} | ${SITE_CONFIG.name}`
      : `Booking cancelled: ${b.booking_reference} | ${SITE_CONFIG.name}`,
    html: confirmed
      ? layout(
          `Your booking is confirmed, ${esc(b.customer_name)}! ✅`,
          `<p style="font-size:15px;line-height:1.6">Great news: your desert safari is confirmed. Our driver will contact you on WhatsApp or phone before pickup with the exact pickup time.</p>
          ${detailsTable(b)}
          <p style="font-size:14px;line-height:1.6;margin-top:20px">Please be ready at your pickup location on time. Need to change anything? WhatsApp us at ${whatsappLink} or reply to this email.</p>`
        )
      : layout(
          `Booking cancelled`,
          `<p style="font-size:15px;line-height:1.6">Dear ${esc(b.customer_name)}, your booking <strong>${esc(b.booking_reference)}</strong> has been cancelled.</p>
          ${detailsTable(b)}
          <p style="font-size:14px;line-height:1.6;margin-top:20px">If this is unexpected, or you would like to book another date, WhatsApp us at ${whatsappLink} or reply to this email.</p>`
        ),
    replyTo: { email: process.env.BREVO_SENDER_EMAIL || SITE_CONFIG.contact.email, name: SITE_CONFIG.name },
  });
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
        <p style="margin-top:20px"><a href="${SITE_CONFIG.url}/admin/bookings" style="background:${SITE_CONFIG.colors.gold};color:#17120D;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block">Open in Admin</a></p>`
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
