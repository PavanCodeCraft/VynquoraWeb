import { site } from "@/lib/site";

export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

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
    const firstName = esc(name.split(/\s+/)[0]);
    const thanksHtml = `
      <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111;max-width:560px">
        <p>Hi ${firstName},</p>
        <p>Thanks for contacting ${esc(site.name)}. We have received your enquiry and a real person will reply within one working day.</p>
        <p style="margin:18px 0 6px"><b>Your message</b></p>
        <p style="white-space:pre-wrap;background:#f4f6fb;border-radius:8px;padding:12px 14px;margin:0">${esc(message)}</p>
        <p style="margin-top:18px">In a hurry? Message us on WhatsApp: <a href="https://wa.me/${site.whatsapp}">${esc(site.phone)}</a>.</p>
        <p>Regards,<br/>Team ${esc(site.name)}<br/><a href="${site.url}">${site.domain}</a></p>
      </div>`;
    const thanksText = `Hi ${name.split(/\s+/)[0]},\n\nThanks for contacting ${site.name}. We have received your enquiry and a real person will reply within one working day.\n\nYour message:\n${message}\n\nIn a hurry? WhatsApp: ${site.phone}\n\nRegards,\nTeam ${site.name}\n${site.url}`;

    const res2 = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        reply_to: to[0] || site.email,
        subject: `We received your enquiry | ${site.name}`,
        html: thanksHtml,
        text: thanksText,
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
