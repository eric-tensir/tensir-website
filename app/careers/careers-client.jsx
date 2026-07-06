"use client";

import { useRef, useState } from "react";
import { MONO, DISPLAY, PANEL, FRAG } from "../components/site";

// ————————————————————————————————————————————
// TENSIR — careers: the application whiteboard.
// No listings, no ladders. One freeform surface.
// ————————————————————————————————————————————

// TODO(eric): placeholder copy — replace with your own words.
const t = {
  title: "Careers",
  kicker: "no job listings",
  intro: [
    "we don't post roles. roles are someone else's idea of what you should do.",
    "tensir is small and intends to stay sharp. if you want in, take the whiteboard below and make your case — in your own words, at your own altitude.",
  ],
  cashLabel: "cash vs. equity — what's your preference and why?",
  roleLabel: "define your own role. what would you do at tensir?",
  whiteboardLabel: "write anything you want about yourself. we read everything.",
  successHead: "[ received ]",
  successBody:
    "we read every whiteboard. if it resonates, you'll hear from eric directly.",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "w-full rounded-md border border-white/15 bg-[#10151B] px-4 py-3 text-[15px] text-white " +
  "placeholder:text-white/25 outline-none transition-colors duration-150 focus:border-[#CB433A]";

function Field({ label, error, sentence, children }) {
  return (
    <div>
      <label
        className={
          sentence
            ? "block mb-3 text-sm leading-6 text-white/70"
            : "block mb-2 text-[11px] uppercase tracking-[0.2em] text-white/45"
        }
        style={{ fontFamily: MONO }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-xs text-[#CB433A]" style={{ fontFamily: MONO }}>
          {error}
        </p>
      )}
    </div>
  );
}

export function CareersContent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cashEquity: "",
    role: "",
    whiteboard: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const taRef = useRef(null);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((errs) => ({ ...errs, [key]: undefined }));
  };

  const autogrow = () => {
    const el = taRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "required";
    if (!form.lastName.trim()) errs.lastName = "required";
    if (!EMAIL_RE.test(form.email)) errs.email = "that doesn't look like an email";
    if (!form.cashEquity.trim()) errs.cashEquity = "required — a one-liner is fine";
    if (!form.role.trim()) errs.role = "required — a one-liner is fine";
    if (!form.whiteboard.trim()) errs.whiteboard = "the whiteboard is the application — it can't be blank";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* ————— HEADER ————— */}
      <section className="px-4 md:px-10 pt-16 md:pt-24 pb-14 md:pb-20 border-b border-white/10">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/45" style={{ fontFamily: MONO }}>
          {t.kicker}
        </p>
        <h1
          className="mt-4 font-semibold tracking-tight leading-none"
          style={{ fontFamily: DISPLAY, fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          {t.title}
        </h1>
        <div className="mt-8 max-w-2xl space-y-4">
          {t.intro.map((line) => (
            <p key={line} className="text-sm md:text-base leading-6 text-white/60" style={{ fontFamily: MONO }}>
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ————— WHITEBOARD ————— */}
      <section className="px-4 md:px-10 py-14 md:py-20">
        <div className="max-w-3xl">
          {status === "sent" ? (
            <div className="rounded-md border p-8 md:p-10" style={{ borderColor: FRAG, backgroundColor: PANEL }}>
              <p className="text-sm text-[#CB433A]" style={{ fontFamily: MONO }}>
                {t.successHead}
              </p>
              <p className="mt-4 text-base md:text-lg leading-7 text-white/80" style={{ fontFamily: MONO }}>
                {t.successBody}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="First name" error={errors.firstName}>
                  <input className={inputCls} value={form.firstName} onChange={set("firstName")} autoComplete="given-name" />
                </Field>
                <Field label="Last name" error={errors.lastName}>
                  <input className={inputCls} value={form.lastName} onChange={set("lastName")} autoComplete="family-name" />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Email" error={errors.email}>
                    <input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                  </Field>
                </div>
              </div>

              <div className="mt-12 space-y-10">
                <Field label={t.cashLabel} error={errors.cashEquity} sentence>
                  <textarea
                    rows={3}
                    value={form.cashEquity}
                    onChange={set("cashEquity")}
                    className={`${inputCls} resize-none leading-7`}
                    style={{ fontFamily: MONO }}
                  />
                </Field>
                <Field label={t.roleLabel} error={errors.role} sentence>
                  <textarea
                    rows={3}
                    value={form.role}
                    onChange={set("role")}
                    className={`${inputCls} resize-none leading-7`}
                    style={{ fontFamily: MONO }}
                  />
                </Field>
              </div>

              <div className="mt-12">
                <p className="text-sm leading-6 text-white/70" style={{ fontFamily: MONO }}>
                  {t.whiteboardLabel}
                </p>
                <textarea
                  ref={taRef}
                  rows={12}
                  value={form.whiteboard}
                  onChange={(e) => {
                    set("whiteboard")(e);
                    autogrow();
                  }}
                  placeholder="the whiteboard is yours."
                  className={`${inputCls} mt-5 resize-none overflow-hidden leading-7`}
                  style={{ fontFamily: MONO }}
                />
                {errors.whiteboard && (
                  <p className="mt-2 text-xs text-[#CB433A]" style={{ fontFamily: MONO }}>
                    {errors.whiteboard}
                  </p>
                )}
              </div>

              <div className="mt-10 flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={
                    "group inline-flex items-center gap-2.5 rounded-md border border-white/25 px-4 py-2.5 " +
                    "text-xs uppercase tracking-[0.15em] text-white whitespace-nowrap cursor-pointer " +
                    "transition-colors duration-150 ease-out hover:border-[#CB433A] hover:bg-[#CB433A] hover:text-[#0B0F13] " +
                    "disabled:opacity-40 disabled:pointer-events-none"
                  }
                  style={{ fontFamily: MONO }}
                >
                  {status === "sending" ? "Sending…" : "Send it"}
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-[#CB433A] group-hover:text-[#0B0F13] transition-colors duration-150"
                  >
                    <path d="M2 8 H13 M9 3.5 L13.5 8 L9 12.5" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </button>
                {status === "error" && (
                  <p className="text-xs text-[#CB433A]" style={{ fontFamily: MONO }}>
                    something broke on our side — try again in a minute
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
