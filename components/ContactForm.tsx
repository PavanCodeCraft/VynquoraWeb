"use client";

import { useState } from "react";
import { site, projectTypes, timelines } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 outline-none transition-colors focus:border-brand focus:ring-4 focus:ring-brand/15";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [type, setType] = useState(projectTypes[0]);
  const [timeline, setTimeline] = useState<string>("");
  const [error, setError] = useState("");

  const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hi ${site.name}, I'd like to discuss a project.`)}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Spam trap: real people never see or fill this field.
    if (data.botcheck) return;

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();
    if (name.length < 2) return fail("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("Please enter a valid email address.");
    if (message.length < 10) return fail("Please tell us a little more about the project.");

    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company: (data.company || "").trim(),
          phone: (data.phone || "").trim(),
          projectType: type,
          timeline: timeline || "Not specified",
          message,
          botcheck: "",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("sent");
        form.reset();
        setTimeline("");
      } else {
        fail(`Your message didn't send. Please try again, email us at ${site.email}, or`);
      }
    } catch {
      fail(`Your message didn't send. Check your connection and try again, email us at ${site.email}, or`);
    }
  }

  function fail(msg: string) {
    setError(msg);
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div className="rounded-3xl border border-line bg-card p-8 sm:p-10" role="status">
        <p className="text-2xl font-semibold tracking-tight">Thanks, we&apos;ve got your message.</p>
        <p className="mt-3 text-muted">
          We&apos;ll reply within one working day to set up a call. Need us sooner? Message us on WhatsApp.
        </p>
        <button onClick={() => setStatus("idle")} className="mt-6 text-brand font-medium hover:underline cursor-pointer">
          Send another message
        </button>
      </div>
    );
  }

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-2 text-sm transition-colors cursor-pointer ${
      active ? "border-brand bg-brand-soft text-ink" : "border-line text-muted hover:text-ink hover:border-silver"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-line bg-card p-6 sm:p-9">
      {/* honeypot for bots */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium">Your name</span>
          <input name="name" required autoComplete="name" placeholder="Full name" className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Work email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Company <span className="text-muted font-normal">(optional)</span></span>
          <input name="company" autoComplete="organization" placeholder="Company name" className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-medium">Phone or WhatsApp <span className="text-muted font-normal">(optional)</span></span>
          <input name="phone" type="tel" autoComplete="tel" placeholder="+91" className={field} />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">What do you want to build?</legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {projectTypes.map((t) => (
            <button type="button" key={t} aria-pressed={type === t} onClick={() => setType(t)} className={chip(type === t)}>
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">When do you want to start? <span className="text-muted font-normal">(optional)</span></legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {timelines.map((t) => (
            <button
              type="button"
              key={t}
              aria-pressed={timeline === t}
              onClick={() => setTimeline(timeline === t ? "" : t)}
              className={chip(timeline === t)}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="text-sm font-medium">Tell us a little about it</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="What problem are you solving, and who will use it?"
          className={`${field} resize-y`}
        />
      </label>

      {status === "error" && error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}{" "}
          <a href={waLink} target="_blank" rel="noreferrer" className="font-medium underline underline-offset-2">
            Message us on WhatsApp
          </a>
        </p>
      )}

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">We reply within one working day. NDA on request.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-brand px-7 py-3.5 font-medium text-brand-ink hover:bg-brand-hover disabled:opacity-60 transition-colors cursor-pointer"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}