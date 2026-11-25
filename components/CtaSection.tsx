"use client";

import { useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/data";

/* ───────────── Edit these ───────────── */
const BRAND = "Restaurant Brain";
const BUSINESSES = ["Restaurant", "Cafe", "Retail shop", "Clinic", "Salon", "Gym", "Warehouse", "Other"];
const TRUST = ["Free demo", "No commitment", "Quick reply"];

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.8 11.8 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.8 1 1.01-3.7-.24-.38a9.86 9.86 0 0 1-1.51-5.27C2.1 6.4 6.6 1.9 12.05 1.9c2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.98c0 5.45-4.44 9.9-9.87 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

const focusRing = "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50";

export default function Cta() {
  const [type, setType] = useState(BUSINESSES[0]);

  const message =
    type === "Other"
      ? `Hi ${BRAND} team! I'd like a free demo for my business.`
      : `Hi ${BRAND} team! I run a ${type.toLowerCase()} and I'd like a free demo.`;
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <section id="cta" aria-labelledby="cta-title" className="section">
      <style>{`
        @keyframes cta-pop{0%{opacity:0;transform:translateY(10px) scale(.95)}100%{opacity:1;transform:none}}
        @keyframes cta-ping{0%{transform:scale(1);opacity:.55}100%{transform:scale(1.28);opacity:0}}
        @keyframes cta-dot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-3px);opacity:1}}
        @keyframes cta-draw{to{stroke-dashoffset:0}}
        @keyframes cta-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-14px)}}
        .cta-pop{animation:cta-pop .6s cubic-bezier(.22,.8,.2,1) both}
        .cta-ping{animation:cta-ping 2.2s ease-out infinite}
        .cta-dot{animation:cta-dot 1.2s ease-in-out infinite}
        .cta-draw{stroke-dasharray:120;stroke-dashoffset:120;animation:cta-draw 1.2s .4s ease forwards}
        .cta-drift{animation:cta-drift 12s ease-in-out infinite}
        @media (prefers-reduced-motion:reduce){
          .cta-pop,.cta-ping,.cta-dot,.cta-drift{animation:none}
          .cta-draw{animation:none;stroke-dashoffset:0}
        }
      `}</style>

      <div className="relative isolate overflow-hidden rounded-[26px] bg-deep px-4 py-8 sm:rounded-[44px] shadow-[0_60px_90px_-40px_rgba(13,43,62,.8)] sm:px-12 sm:py-16 lg:px-16 lg:py-20">
        {/* background: dotted grid + colour glows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(rgba(255,255,255,.09)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div aria-hidden="true" className="cta-drift pointer-events-none absolute -right-24 -top-28 -z-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(214,52,31,.45),transparent_68%)]" />
        <div aria-hidden="true" className="cta-drift pointer-events-none absolute -bottom-40 -left-24 -z-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(37,211,102,.28),transparent_68%)] [animation-delay:-6s]" />

        <div className="grid items-center gap-9 sm:gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-10">
          {/* ───────── copy + controls ───────── */}
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[.14em] text-white/80 backdrop-blur-md">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="cta-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25D366]" />
              </span>
              Talk to a real person
            </p>

            <h2 id="cta-title" className="mt-5 text-t-cta font-extrabold leading-[1.05] tracking-tight text-white">
              Ready to run your business on{" "}
              <span className="relative inline-block text-chili">
                autopilot
                <svg aria-hidden="true" viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full">
                  <path className="cta-draw" pathLength="120" d="M2 8 C 14 2, 24 2, 36 7 S 60 12, 72 6 S 90 2, 98 6" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
              ?
            </h2>

            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/85 sm:text-lg">
              Pick what you run, tap the button, and your message is already written in WhatsApp. We reply with a free demo for your kind of business.
            </p>

            {/* business picker */}
            <div className="mt-8" role="group" aria-label="What do you run?">
              <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-white/75">What do you run?</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUSINESSES.map((b) => {
                  const on = b === type;
                  return (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setType(b)}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition duration-300 motion-safe:active:scale-95 ${focusRing} ${
                        on
                          ? "border-white bg-white text-ink shadow-[0_12px_22px_-12px_rgba(255,255,255,.7)]"
                          : "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* buttons */}
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-[15px] sm:px-7 sm:py-4 sm:text-base font-extrabold text-ink shadow-[0_18px_34px_-14px_rgba(37,211,102,.85)] transition hover:bg-[#2BE070] motion-safe:hover:-translate-y-0.5 ${focusRing}`}
              >
                <span aria-hidden="true" className="cta-ping pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]" />
                <WhatsAppIcon size={22} />
                Chat on WhatsApp
                <span aria-hidden="true" className="transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                  <Icon name="arr" size={16} stroke={2.6} />
                </span>
              </a>
              <a
                href="#contact"
                className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-3.5 text-[15px] sm:px-7 sm:py-4 sm:text-base font-extrabold text-white backdrop-blur-md transition hover:border-white/60 hover:bg-white/15 ${focusRing}`}
              >
                Book a free demo
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 p-0">
              {TRUST.map((t) => (
                <li key={t} className="flex list-none items-center gap-1.5 text-sm font-semibold text-white/85">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* ───────── live WhatsApp preview ───────── */}
          <div className="relative mx-auto hidden w-full max-w-[330px] sm:block">
            <div aria-hidden="true" className="float absolute -left-6 top-10 z-10 hidden rounded-2xl bg-white px-3.5 py-2.5 text-[12px] font-extrabold text-ink shadow-[0_18px_28px_-14px_rgba(0,0,0,.6)] sm:block">
              Message pre-filled ✓
            </div>
            <div aria-hidden="true" className="float absolute -right-5 bottom-24 z-10 hidden rounded-2xl bg-lemon px-3.5 py-2.5 text-[12px] font-extrabold text-ink shadow-[0_18px_28px_-14px_rgba(0,0,0,.6)] [animation-delay:-3s] sm:block">
              Opens in WhatsApp
            </div>

            <div
              role="img"
              aria-label="Preview of the WhatsApp message that opens when you tap the button"
              className="overflow-hidden rounded-[40px] border-[6px] border-white/15 bg-[#0B141A] shadow-[0_50px_80px_-30px_rgba(0,0,0,.85)] transition-transform duration-700 motion-safe:rotate-3 motion-safe:hover:rotate-0"
            >
              {/* chat header */}
              <div className="flex items-center gap-3 bg-[#202C33] px-4 pb-3 pt-6">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-chili text-sm font-black text-white">RB</span>
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold leading-tight text-white">{BRAND}</p>
                  <p className="text-[11px] font-semibold text-[#25D366]">online</p>
                </div>
              </div>

              {/* messages */}
              <div className="flex min-h-[250px] sm:min-h-[320px] flex-col gap-2.5 px-3 py-4 [background-image:radial-gradient(rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="cta-pop max-w-[84%] self-start rounded-2xl rounded-tl-md bg-[#202C33] px-3 py-2 text-[13px] leading-snug text-white/90" style={{ animationDelay: ".2s" }}>
                  Hi 👋 Welcome to {BRAND}. Tell us what you run and we&apos;ll set up your demo.
                </div>

                {/* re-animates every time the business type changes */}
                <div key={type} className="cta-pop max-w-[90%] self-end rounded-2xl rounded-tr-md bg-[#005C4B] px-3 py-2 text-[13px] leading-snug text-white" style={{ animationDelay: ".15s" }}>
                  {message}
                  <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-white/60">
                    now <span className="text-[#53BDEB]">✓✓</span>
                  </span>
                </div>

                <div className="cta-pop flex w-fit items-center gap-1 self-start rounded-2xl rounded-tl-md bg-[#202C33] px-3.5 py-3" style={{ animationDelay: ".7s" }}>
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="cta-dot h-1.5 w-1.5 rounded-full bg-white/70" style={{ animationDelay: `${d * 0.18}s` }} />
                  ))}
                </div>
              </div>

              {/* input bar: the send button is a real link */}
              <div className="flex items-center gap-2 bg-[#0B141A] p-3">
                <span className="flex-1 rounded-full bg-[#202C33] px-4 py-2.5 text-[13px] text-white/40">Message</span>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Send this message on WhatsApp"
                  className={`grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-ink transition hover:bg-[#2BE070] motion-safe:hover:scale-105 ${focusRing}`}
                >
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10.1 15 12 3.4 13.9z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}