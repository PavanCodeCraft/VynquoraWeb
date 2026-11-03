import { site } from "@/lib/site";

export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// ─────────────────────────────────────────────────────────────
//  Thank-you email sent to the visitor (branded, email-safe HTML:
//  tables + inline styles so it looks right in Gmail, Outlook, Apple Mail).
//  The logo is loaded from your live site: https://vynquora.com/vynquora_logo.png
// ─────────────────────────────────────────────────────────────
function buildThankYouEmail(d: { name: string; projectType: string; timeline: string; message: string }) {
  const BRAND = "#1f5fd1";
  const NAVY = "#0f2f6e";
  const INK = "#0f172a";
  const MUTED = "#5b6577";
  const LINE = "#e3e8f2";
  const SOFT = "#eaf1fd";
  const FONT = "'Segoe UI',Helvetica,Arial,sans-serif";

  const logoUrl = `${site.url}${site.logo}`;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I just sent an enquiry from your website.`)}`;
  const firstName = d.name.split(/\s+/)[0];
  const shown = d.message.length > 500 ? `${d.message.slice(0, 500).trim()}…` : d.message;
  const shownHtml = esc(shown).replace(/\r?\n/g, "<br/>");
  const where = `${site.address.locality}, ${site.address.city}, ${site.address.countryName}`;
  const year = new Date().getFullYear();

  const step = (n: number, title: string, body: string) => `
    <tr>
      <td width="40" valign="top" style="padding:0 0 16px 0">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td width="28" height="28" align="center" valign="middle" bgcolor="${SOFT}" style="background:${SOFT};border-radius:14px;color:${BRAND};font:700 13px/28px ${FONT}">${n}</td>
        </tr></table>
      </td>
      <td valign="top" style="padding:0 0 16px 0;font:400 14px/1.55 ${FONT};color:${MUTED}">
        <span style="font-weight:600;color:${INK}">${title}</span><br/>${body}
      </td>
    </tr>`;

  const row = (label: string, value: string) => `
    <tr>
      <td width="110" valign="top" style="padding:7px 0;font:600 12px/1.5 ${FONT};color:${MUTED};text-transform:uppercase;letter-spacing:.5px">${label}</td>
      <td valign="top" style="padding:7px 0;font:400 14px/1.55 ${FONT};color:${INK}">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<meta name="color-scheme" content="light"/>
<title>We received your enquiry | ${esc(site.name)}</title>
</head>
<body style="margin:0;padding:0;background:#eef2f9">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#eef2f9;font-size:1px;line-height:1px">Thanks for contacting ${esc(site.name)}. A real person will reply within one working day.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#eef2f9" style="background:#eef2f9">
<tr><td align="center" style="padding:28px 12px">

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${LINE};border-radius:16px;overflow:hidden">

    <!-- Header -->
    <tr>
      <td bgcolor="${NAVY}" style="background:${NAVY};background-image:linear-gradient(135deg,${NAVY} 0%,${BRAND} 100%);padding:28px 32px">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td valign="middle" style="padding-right:14px">
            <a href="${site.url}" style="text-decoration:none"><img src="${logoUrl}" width="56" height="56" alt="${esc(site.name)}" style="display:block;width:56px;height:56px;border-radius:28px;border:0;outline:none"/></a>
          </td>
          <td valign="middle">
            <div style="font:700 22px/1.2 ${FONT};color:#ffffff;letter-spacing:.2px">${esc(site.name)}</div>
            <div style="font:400 12.5px/1.4 ${FONT};color:#c9d9f7;padding-top:3px">${esc(site.tagline)}</div>
          </td>
        </tr></table>
      </td>
    </tr>

    <!-- Intro -->
    <tr>
      <td style="padding:34px 32px 8px">
        <div style="font:400 15px/1.5 ${FONT};color:${MUTED}">Hi ${esc(firstName)},</div>
        <div style="font:700 26px/1.25 ${FONT};color:${INK};padding:8px 0 12px;letter-spacing:-.3px">Thanks, we&rsquo;ve got your enquiry.</div>
        <div style="font:400 15px/1.7 ${FONT};color:${MUTED}">We&rsquo;ve received your message and a real person from our team will reply <b style="color:${INK}">within one working day</b> to set up a short call. No sales pressure, just a clear conversation about what you want to build.</div>
      </td>
    </tr>

    <!-- Summary -->
    <tr>
      <td style="padding:22px 32px 6px">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f6f8fc" style="background:#f6f8fc;border:1px solid ${LINE};border-radius:12px">
          <tr><td style="padding:18px 20px">
            <div style="font:700 12px/1.4 ${FONT};color:${BRAND};text-transform:uppercase;letter-spacing:1px;padding-bottom:8px">Your enquiry</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${row("Project", esc(d.projectType))}
              ${row("Start", esc(d.timeline))}
              ${row("Message", shownHtml)}
            </table>
          </td></tr>
        </table>
      </td>
    </tr>

    <!-- What happens next -->
    <tr>
      <td style="padding:26px 32px 4px">
        <div style="font:700 16px/1.4 ${FONT};color:${INK};padding-bottom:14px">What happens next</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          ${step(1, "We read your enquiry", "Someone on the team reviews exactly what you wrote.")}
          ${step(2, "We reply within one working day", "We&rsquo;ll suggest a time for a short call to understand your goals.")}
          ${step(3, "You get a fixed-scope proposal", "Usually within a week of the first call, with clear scope, timeline and cost.")}
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td align="center" style="padding:10px 32px 30px">
        <div style="font:400 14px/1.6 ${FONT};color:${MUTED};padding-bottom:14px">In a hurry? Talk to us directly.</div>
        <a href="${wa}" style="display:inline-block;background:${BRAND};color:#ffffff;font:600 15px/1 ${FONT};text-decoration:none;padding:14px 28px;border-radius:999px">Chat on WhatsApp</a>
        <div style="font:400 13px/1.6 ${FONT};color:${MUTED};padding-top:14px">or call <a href="tel:${esc(site.phone.replace(/\s+/g, ""))}" style="color:${BRAND};text-decoration:none;font-weight:600">${esc(site.phone)}</a></div>
      </td>
    </tr>

    <!-- Sign-off -->
    <tr>
      <td style="padding:0 32px 30px;border-top:1px solid ${LINE}">
        <div style="font:400 14px/1.7 ${FONT};color:${MUTED};padding-top:22px">Regards,<br/><b style="color:${INK}">Team ${esc(site.name)}</b></div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td bgcolor="#f6f8fc" style="background:#f6f8fc;border-top:1px solid ${LINE};padding:22px 32px">
        <div style="font:400 12.5px/1.7 ${FONT};color:${MUTED}">
          <a href="${site.url}" style="color:${BRAND};text-decoration:none;font-weight:600">${esc(site.domain)}</a>
          &nbsp;&middot;&nbsp; <a href="mailto:${esc(site.email)}" style="color:${MUTED};text-decoration:none">${esc(site.email)}</a><br/>
          ${esc(where)}<br/>
          ${esc(site.hours)}
        </div>
        <div style="font:400 12px/1.7 ${FONT};color:${MUTED};padding-top:10px">
          <a href="${site.socials.linkedin}" style="color:${MUTED};text-decoration:underline">LinkedIn</a>
          &nbsp;&middot;&nbsp; <a href="${site.socials.x}" style="color:${MUTED};text-decoration:underline">X (Twitter)</a>
        </div>
        <div style="font:400 11.5px/1.6 ${FONT};color:#8b94a6;padding-top:14px">You&rsquo;re receiving this because you submitted the contact form on ${esc(site.domain)}. Your details are kept private, and we&rsquo;re happy to sign an NDA on request.<br/>&copy; ${year} ${esc(site.name)}</div>
      </td>
    </tr>

  </table>

</td></tr>
</table>
</body>
</html>`;

  const text = [
    `Hi ${firstName},`,
    ``,
    `Thanks, we've got your enquiry.`,
    `A real person from ${site.name} will reply within one working day to set up a short call.`,
    ``,
    `YOUR ENQUIRY`,
    `Project: ${d.projectType}`,
    `Start: ${d.timeline}`,
    `Message: ${shown}`,
    ``,
    `WHAT HAPPENS NEXT`,
    `1. We read your enquiry.`,
    `2. We reply within one working day to set up a short call.`,
    `3. You get a fixed-scope proposal, usually within a week of the first call.`,
    ``,
    `In a hurry? WhatsApp: ${wa}`,
    `Call: ${site.phone}`,
    ``,
    `Regards,`,
    `Team ${site.name}`,
    `${site.url}`,
    `${where} | ${site.hours}`,
  ].join("\n");

  return { html, text };
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  // Spam trap: pretend success so bots learn nothing.
  if (body.botcheck) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const company = clean(body.company, 160) || "-";
  const phone = clean(body.phone, 60) || "-";
  const projectType = clean(body.project_type, 80) || "-";
  const timeline = clean(body.timeline, 80) || "Not specified";
  const message = clean(body.message, 5000);

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "Please check the form fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set in the environment.");
    return Response.json({ ok: false, error: "Mail is not configured." }, { status: 500 });
  }

  // The "from" address MUST be on a domain you verified in Resend (vynquora.com).
  const from = process.env.CONTACT_FROM_EMAIL || `${site.name} Website <noreply@${site.domain}>`;
  const to = (process.env.CONTACT_TO_EMAIL || site.email).split(",").map((s) => s.trim()).filter(Boolean);

  const html = `
    <h2 style="margin:0 0 12px">New project enquiry</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
      <tr><td><b>Name</b></td><td>${esc(name)}</td></tr>
      <tr><td><b>Email</b></td><td>${esc(email)}</td></tr>
      <tr><td><b>Company</b></td><td>${esc(company)}</td></tr>
      <tr><td><b>Phone</b></td><td>${esc(phone)}</td></tr>
      <tr><td><b>Project type</b></td><td>${esc(projectType)}</td></tr>
      <tr><td><b>Start</b></td><td>${esc(timeline)}</td></tr>
    </table>
    <p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap"><b>Message</b><br/>${esc(message)}</p>`;

  const text = `New project enquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone}\nProject type: ${projectType}\nStart: ${timeline}\n\nMessage:\n${message}`;

  try {
    // 1) Enquiry mail to your inbox. This one is the important one.
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New project enquiry from ${name}`,
        html,
        text,
      }),
    });

    if (!res.ok) {
      // Visible in Vercel -> Project -> Logs. This tells you the exact reason.
      const detail = await res.text().catch(() => "");
      console.error("[contact] Resend rejected the enquiry email:", res.status, detail);
      return Response.json({ ok: false, error: "Could not send." }, { status: 502 });
    }

    // 2) Thank-you mail to the visitor. If this fails, the enquiry is already
    //    delivered to you, so we only log it and still tell the visitor "sent".
    const thanks = buildThankYouEmail({ name, projectType, timeline, message });
    const res2 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        reply_to: to[0] || site.email,
        subject: `We received your enquiry | ${site.name}`,
        html: thanks.html,
        text: thanks.text,
      }),
    });
    if (!res2.ok) {
      const detail = await res2.text().catch(() => "");
      console.error("[contact] Thank-you email to visitor failed:", res2.status, detail);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Network error calling Resend:", err);
    return Response.json({ ok: false, error: "Could not send." }, { status: 502 });
  }
}
