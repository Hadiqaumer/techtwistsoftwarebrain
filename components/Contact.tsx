"use client";
import { FormEvent, useState } from "react";
import { site } from "@/lib/data";

const CONTACT_WA_TEXT = "Hi! I would like a demo of Restaurant Brain.";

const businessTypes = ["Restaurant or café", "Shop or retail", "Clinic or salon", "Other business"];
const modules = ["POS & billing", "Face ID attendance", "CCTV & AI cameras", "Stock control", "Reports & alerts", "Full package"];

const steps = [
  { t: "Send your request", d: "Tell us about your business. It takes about a minute." },
  { t: "We call you back", d: "We confirm a time and ask a few quick questions." },
  { t: "See a live demo", d: "We show it working for your kind of business, free." },
];

const icons = {
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  check: "M5 12.5l4.5 4.5L19 7.5",
};

function Icon({ d, size = 20 }: { d: string; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function InfoRow({ icon, label, value, href }: { icon: string; label: string; value: string; href?: string }) {
  const inner = (
    <>
      <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 text-white transition group-hover:bg-white/20">
        <Icon d={icon} size={18} />
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] font-medium text-white/75">{label}</span>
        <span className="block break-words text-[15px] font-bold text-white">{value}</span>
      </span>
    </>
  );
  const cls = "group flex items-center gap-3";
  return href ? (
    <a href={href} className={`${cls} rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white`}>{inner}</a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

const field =
  "w-full rounded-2xl border border-ink/15 bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-ink/45 transition focus-visible:border-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili aria-[invalid=true]:border-chili";
const label = "mb-2 block text-[13.5px] font-extrabold text-ink";
const chip =
  "block cursor-pointer select-none rounded-full border border-ink/15 bg-white px-4 py-2 text-[14px] font-bold text-ink transition hover:border-ink/40 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-chili";

type Errors = { name?: string; phone?: string };

export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [type, setType] = useState(businessTypes[0]);
  const [picked, setPicked] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});

  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(CONTACT_WA_TEXT)}`;

  function toggle(m: string) {
    setPicked((p) => (p.includes(m) ? p.filter((x) => x !== m) : [...p, m]));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const note = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a valid phone number.";
    setErrors(next);
    if (next.name || next.phone) {
      (form.elements.namedItem(next.name ? "name" : "phone") as HTMLElement | null)?.focus();
      return;
    }

    /* Selected modules ko message k shuru mein jod diya, taake /api/contact ko naya field na chahiye ho */
    const message = [picked.length ? `Interested in: ${picked.join(", ")}.` : "", note].filter(Boolean).join("\n\n");

    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, type, message }),
      });
      if (res.ok) {
        form.reset();
        setPicked([]);
        setType(businessTypes[0]);
        setState("ok");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  }

  return (
    <section id="contact" className="section relative bg-ground pt-0" aria-labelledby="contact-title">
      <div className="relative overflow-hidden rounded-[26px] bg-deep shadow sm:rounded-[40px]-[0_40px_60px_-40px_rgba(13,43,62,.7)]">
        {/* soft colour orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(70,190,130,.30),transparent_68%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 left-1/3 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(214,52,31,.22),transparent_68%)]" />

        <div className="relative grid gap-7 p-4 sm:gap-10 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-12 lg:p-12">
          {/* LEFT: message + next steps + contact details */}
          <div className="flex flex-col items-start gap-7 text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13.5px] font-bold text-white/90">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#25D366]" />
              Free demo, no commitment
            </span>

            <h2 id="contact-title" className="text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.06] tracking-tight text-white">
              Let’s make your business <span className="text-[#FF8A75]">smarter</span> and safer.
            </h2>

            <p className="max-w-lg text-base font-medium leading-relaxed text-white/85 sm:text-[17px]">
              Book a consultation and a live demo of Restaurant Brain. Prefer to chat? Message us on WhatsApp.
            </p>

            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[15px] font-extrabold text-ink shadow-[0_14px_26px_-12px_rgba(37,211,102,.8)] transition hover:bg-[#2BE070] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 motion-safe:hover:-translate-y-0.5"
            >
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.8 11.8 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.8 1 1.01-3.7-.24-.38a9.86 9.86 0 0 1-1.51-5.27C2.1 6.4 6.6 1.9 12.05 1.9c2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.98c0 5.45-4.44 9.9-9.87 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" /></svg>
              Chat on WhatsApp
            </a>

            {/* kya hota hai agle qadam par: yeh waqai aik sequence hai, is liye numbers theek hain */}
            <div className="w-full pt-2">
              <h3 className="text-t-h4 font-extrabold text-white">What happens next</h3>
              <ol className="mt-4 flex flex-col gap-5">
                {steps.map((s, i) => (
                  <li key={s.t} className="relative flex gap-4">
                    {i < steps.length - 1 && <span aria-hidden="true" className="absolute -bottom-5 left-4 top-9 w-px bg-white/15" />}
                    <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/25 text-[13px] font-extrabold text-white">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-white">{s.t}</p>
                      <p className="text-[14px] font-medium leading-relaxed text-white/75">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid w-full gap-5 border-t border-white/10 pt-7 sm:grid-cols-2">
              <InfoRow icon={icons.mail} label="Email" value={site.email} href={`mailto:${site.email}`} />
              <InfoRow icon={icons.phone} label="Phone / WhatsApp" value={site.phoneLocal} href={`tel:+${site.phone}`} />
              <InfoRow icon={icons.globe} label="Website" value={site.website} />
              <InfoRow icon={icons.pin} label="Location" value={site.location} />
            </div>
          </div>

          {/* RIGHT: form card */}
          <div className="rounded-[22px] border border-white/80 bg-white p-4 sm:rounded-[30px] shadow-[0_40px_60px_-30px_rgba(0,0,0,.6)] sm:p-7">
            {state === "ok" ? (
              <div role="status" className="flex min-h-[300px] sm:min-h-[380px] flex-col items-start justify-center gap-4">
                <span aria-hidden="true" className="grid h-14 w-14 place-items-center rounded-full bg-[#2F8F55] text-white">
                  <Icon d={icons.check} size={28} />
                </span>
                <h3 className="text-t-h3-lg font-extrabold leading-tight text-ink">Request received. Thank you.</h3>
                <p className="max-w-sm text-[15px] font-medium leading-relaxed text-ink/70">
                  We will contact you soon to confirm a time for your free demo. If it is urgent, message us on WhatsApp.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-[#25D366] px-5 py-2.5 text-[15px] font-extrabold text-ink transition hover:bg-[#2BE070] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/30">
                    Chat on WhatsApp
                  </a>
                  <button type="button" onClick={() => setState("idle")} className="inline-flex items-center rounded-full border border-ink/20 px-5 py-2.5 text-[15px] font-extrabold text-ink transition hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-chili/40">
                    Send another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-6">
                <div>
                  <h3 className="text-t-h3-lg font-extrabold leading-tight text-ink">Book your free demo</h3>
                  <p className="mt-1 text-[14.5px] font-medium text-ink/60">Takes about a minute. Name and phone are all we need.</p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Your name</label>
                    <input
                      id="name" name="name" required autoComplete="name" placeholder="Full name"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "name-err" : undefined}
                      onChange={() => errors.name && setErrors((p) => ({ ...p, name: undefined }))}
                      className={field}
                    />
                    {errors.name && <p id="name-err" className="mt-1 text-[13px] font-bold text-chili">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>Phone</label>
                    <input
                      id="phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="Phone number"
                      aria-invalid={errors.phone ? true : undefined}
                      aria-describedby={errors.phone ? "phone-err" : undefined}
                      onChange={() => errors.phone && setErrors((p) => ({ ...p, phone: undefined }))}
                      className={field}
                    />
                    {errors.phone && <p id="phone-err" className="mt-1 text-[13px] font-bold text-chili">{errors.phone}</p>}
                  </div>
                </div>

                <fieldset className="min-w-0">
                  <legend className={label}>Business type</legend>
                  <div className="flex flex-wrap gap-2.5">
                    {businessTypes.map((t, i) => (
                      <div key={t} className="relative">
                        <input
                          id={`type-${i}`} type="radio" name="type" value={t}
                          checked={type === t} onChange={() => setType(t)} className="peer sr-only"
                        />
                        <label htmlFor={`type-${i}`} className={`${chip} peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white`}>{t}</label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="min-w-0">
                  <legend className={label}>What do you need? <span className="font-medium text-ink/50">(pick any)</span></legend>
                  <div className="flex flex-wrap gap-2.5">
                    {modules.map((m, i) => (
                      <div key={m} className="relative">
                        <input
                          id={`mod-${i}`} type="checkbox" name="modules" value={m}
                          checked={picked.includes(m)} onChange={() => toggle(m)} className="peer sr-only"
                        />
                        <label htmlFor={`mod-${i}`} className={`${chip} peer-checked:border-[#2F8F55] peer-checked:bg-[#2F8F55]/10 peer-checked:text-[#1D6B3E]`}>{m}</label>
                      </div>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="message" className={label}>Anything else we should know? <span className="font-medium text-ink/50">(optional)</span></label>
                  <textarea id="message" name="message" rows={3} className={field} placeholder="Number of branches, staff, current setup..." />
                </div>

                <button type="submit" disabled={state === "sending"} className="btn w-full disabled:opacity-60">
                  {state === "sending" ? "Sending..." : "Book a free demo"}
                </button>

                <p role="status" aria-live="polite" className="min-h-5 text-[14px] font-bold text-chili">
                  {state === "error" && "Could not send right now. Please try again, or message us on WhatsApp."}
                </p>

                <p className="-mt-2 text-[13px] font-medium text-ink/55">We never share your details. No spam, no commitment.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}