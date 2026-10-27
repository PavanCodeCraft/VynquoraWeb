import { site } from "@/lib/site";

// Sends 2 emails through Resend when someone submits the contact form:
//   1. a notification to the company inbox
//   2. a thank-you email to the visitor
// Needs these env vars (set in Vercel): RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL

export const runtime = "nodejs";

const BRAND = "#1f5fd1";
const NAVY = "#0b192c";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Remove line breaks so visitors can't inject extra email headers.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
}

function thankYouHtml(name: string, projectType: string, timeline: string, message: string) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;color:#6b7686;font-size:14px;width:130px;vertical-align:top">${label}</td><td style="padding:8px 0;color:${NAVY};font-size:14px">${value}</td></tr>`;
  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f6fa;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fa;padding:32px 16px">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden">
    <tr><td style="background:${NAVY};padding:28px 32px">
      <span style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.5px">${esc(site.name)}</span>
    </td></tr>
    <tr><td style="padding:36px 32px 8px">
      <h1 style="margin:0;font-size:24px;line-height:1.3;color:${NAVY}">Thanks, ${esc(name)}. We&rsquo;ve got your message.</h1>
      <p style="margin:16px 0 0;font-size:16px;line-height:1.6;color:#3b4656">
        Our team will read your enquiry and reply within <strong>one working day</strong> to set up a call.
      </p>
    </td></tr>
    <tr><td style="padding:24px 32px 8px">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7686">Your enquiry</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e5e9f0">
        ${row("Project type", esc(projectType))}
        ${row("Start", esc(timeline))}
        ${row("Message", esc(message).replace(/\n/g, "<br>"))}
      </table>
    </td></tr>
    <tr><td style="padding:24px 32px 36px">
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#3b4656">Need us sooner? Message us on WhatsApp and we&rsquo;ll pick it up.</p>
      <a href="https://wa.me/${site.whatsapp}" style="display:inline-block;background:${BRAND};color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:13px 26px;border-radius:999px">Message us on WhatsApp</a>
    </td></tr>
    <tr><td style="background:#f4f6fa;padding:20px 32px;font-size:12px;line-height:1.6;color:#6b7686">
      ${esc(site.name)} &middot; ${esc(site.location)}<br>
      <a href="mailto:${site.email}" style="color:#6b7686">${esc(site.email)}</a> &middot; ${esc(site.phone)}<br>
      You are receiving this because you submitted the contact form on ${esc(site.domain)}.
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || site.email;

  if (!apiKey || !from) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  // Bots fill the hidden field. Pretend it worked so they go away.
  if (str(body.botcheck, 10)) return Response.json({ ok: true });

  const name = oneLine(str(body.name, 100));
  const email = oneLine(str(body.email, 200));
  const company = oneLine(str(body.company, 150)) || "-";
  const phone = oneLine(str(body.phone, 40)) || "-";
  const projectType = oneLine(str(body.projectType, 100)) || "Not specified";
  const timeline = oneLine(str(body.timeline, 100)) || "Not specified";
  const message = str(body.message, 4000);

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  try {
    // 1. Notification to the company inbox. Reply goes straight to the visitor.
    await sendEmail(apiKey, {
      from,
      to: [to],
      reply_to: email,
      subject: `New project enquiry from ${name}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0b192c;line-height:1.6">
        <h2 style="margin:0 0 12px">New enquiry from the website</h2>
        <p><strong>Name:</strong> ${esc(name)}<br>
        <strong>Email:</strong> ${esc(email)}<br>
        <strong>Company:</strong> ${esc(company)}<br>
        <strong>Phone:</strong> ${esc(phone)}<br>
        <strong>Project type:</strong> ${esc(projectType)}<br>
        <strong>Start:</strong> ${esc(timeline)}</p>
        <p><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>")}</p>
      </div>`,
      text: `New enquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nProject type: ${projectType}\nStart: ${timeline}\n\nMessage:\n${message}`,
    });
  } catch (err) {
    console.error("Contact form: notification email failed", err);
    return Response.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  // 2. Thank-you email to the visitor. If this one fails, the enquiry is still safe in our inbox.
  try {
    await sendEmail(apiKey, {
      from,
      to: [email],
      reply_to: to,
      subject: `Thanks for contacting ${site.name}`,
      html: thankYouHtml(name, projectType, timeline, message),
      text: `Hi ${name},\n\nThanks for contacting ${site.name}. We've got your message and will reply within one working day to set up a call.\n\nNeed us sooner? WhatsApp us: https://wa.me/${site.whatsapp}\n\n${site.name}\n${site.email} | ${site.phone}`,
    });
  } catch (err) {
    console.error("Contact form: thank-you email failed", err);
  }

  return Response.json({ ok: true });
}