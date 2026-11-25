import Image from "next/image";
import Icon from "./Icon";
import { allFaqs, industries, itSolutions, photos, site, steps, testimonials, tints } from "@/lib/data";
import type { TopicId } from "@/lib/data";
import type { CSSProperties } from "react";
const bars = [40, 58, 46, 72, 64, 86, 98];
import WhySlider from "./WhySlider";

export function Why() {
  return (
    <section
      id="why"
      className="section relative overflow-hidden bg-[linear-gradient(135deg,#F6FBF5_0%,#EAF6E9_50%,#FCF4EB_100%)]"
    >
      {/* Ground 1/2/3 blobs so the glass has something to blur (no chili here: chili is for the highlight word + buttons) */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(184,225,231,.45),transparent_68%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(247,231,218,.9),transparent_68%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,233,182,.5),transparent_68%)]" />

      <div className="relative max-w-3xl">
        <p className="eyebrow">WHY ONE BRAIN</p>
        <h2 className="h2">Stop running your restaurant from <span className="text-chili">five</span> different tools</h2>
        <p className="lead mt-4">Manual work and disconnected systems make it hard to keep accurate records. Restaurant Brain brings them together.</p>
      </div>

      <div className="relative">
        <WhySlider />
      </div>
    </section>
  );
}


export function Control() {
  return (
    <section id="control" className="section bg-ground">
      <div className="grid items-center gap-8 overflow-hidden rounded-[26px] bg-deep p-5 text-white sm:gap-12 sm:rounded-[40px] sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:p-14">
        <div className="flex flex-col items-start gap-5">
          <p className="eyebrow !text-lemon">LIVE CONTROL CENTER</p>
          <h2 className="h2 !mt-0 !text-white">See every branch, <span className="text-lemon">live.</span></h2>
          <p className="text-base font-medium leading-relaxed text-[#D5E6EA] sm:text-lg">Sales, orders, staff attendance and camera views in one dashboard, with reports for daily, weekly and monthly review.</p>
          <ul className="flex flex-col gap-3.5 text-base font-bold">
            {["Central dashboards and exportable reports", "Role-based access for managers and staff", "Multiple locations where your setup supports it"].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><Icon name="chk" size={18} stroke={2.8} className="text-leaf" />{t}</li>
            ))}
          </ul>
          <a href="#contact" className="btn">See it live</a>
        </div>
        <div className="relative [perspective:1500px]">
          <div className="rounded-[20px] border border-white/15 bg-deep2 p-3.5 shadow sm:rounded-[26px] sm:p-5 sm:shadow-[-24px_30px_0_-6px_rgba(0,0,0,.25),0_50px_80px_-30px_rgba(0,0,0,.7)] lg:[transform:rotateY(-14deg)_rotateX(6deg)]">
            <div className="mb-3.5 flex items-center justify-between"><b>Live control center</b><span className="rounded-full bg-leaf px-3 py-1 text-xs font-extrabold text-ink">All branches</span></div>
            <div className="flex gap-2.5">
              {[["bg-leaf", "SALES TODAY", "Rs 148,200"], ["bg-lemon", "ORDERS OPEN", "14"], ["bg-aqua", "ON SHIFT", "9"]].map(([c, l, v]) => (
                <div key={l} className={`flex-1 rounded-2xl px-3 py-3 text-ink ${c}`}><small className="text-[10px] font-extrabold">{l}</small><div className="text-xl font-extrabold">{v}</div></div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
              <div className="rounded-2xl bg-white/10 p-3.5">
                <small className="text-[11px] font-extrabold text-[#CFE6D2]">THIS WEEK</small>
                <svg viewBox="0 0 250 120" className="mt-1.5 w-full" role="img" aria-label="Weekly sales bar chart">
                  {bars.map((h, i) => <rect key={i} x={12 + i * 34} y={110 - h} width="22" height={h} rx="6" fill={i === 6 ? "#F5E9B6" : "#BFE5C1"} />)}
                </svg>
              </div>
              <div className="relative min-h-[150px] overflow-hidden rounded-2xl">
                <Image src={photos.cctv.src} alt={photos.cctv.alt} fill sizes="300px" className="object-cover" />
                <span className="absolute left-2 top-2 flex items-center gap-1.5 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-extrabold"><i className="h-2 w-2 rounded-full bg-lemon" />CAM 02 · KITCHEN</span>
              </div>
            </div>
          </div>
          <div className="float absolute -left-3 bottom-6 hidden rounded-2xl bg-lemon px-4 py-3 text-[13px] font-extrabold text-ink shadow-[0_18px_30px_-14px_rgba(0,0,0,.6)] sm:block">Late 14 min · Waiter</div>
          <span className="absolute -bottom-7 right-1.5 text-xs font-bold text-[#CFE6D2] max-sm:hidden">Illustrative data</span>
        </div>
      </div>
    </section>
  );
}

export function ItSolutions() {
  return (
    <section id="it" className="section bg-mist">
      <div className="max-w-3xl">
        <p className="eyebrow">BEYOND RESTAURANTS</p>
        <h2 className="h2">Tech Twist <span className="text-chili">IT solutions</span> for every business</h2>
        <p className="lead mt-4">The same team behind Restaurant Brain builds software, security and monitoring systems for offices, retail, hotels, factories and more.</p>
      </div>
      <ul className="mt-7 grid gap-3 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {itSolutions.map((s, i) => {
          const t = tints[i % 4];
          return (
            <li key={s.title} className="card flex items-start gap-3.5 p-4 sm:flex-col sm:gap-3 sm:p-7">
              <span className={`ib h-11 w-11 rounded-[13px] sm:h-[52px] sm:w-[52px] sm:rounded-[15px] ${t.bg} ${t.fg}`}><Icon name={s.icon} size={24} /></span>
              <div className="min-w-0 flex flex-col gap-1 sm:gap-3">
                <h3 className="text-t-h3 font-extrabold sm:mt-1.5">{s.title}</h3>
                <p className="text-[14px] font-medium leading-relaxed text-muted sm:text-[15px]">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <ul className="mt-5 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-4">
        {industries.map((x) => (
          <li key={x.label} className="relative h-32 overflow-hidden rounded-2xl sm:rounded-3xl shadow-[0_22px_34px_-22px_rgba(13,43,62,.6)] sm:h-52">
            <Image src={photos[x.photo].src} alt={photos[x.photo].alt} fill sizes="(min-width:1024px) 320px, 50vw" className="object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-3 pb-3 pt-8 text-[13px] font-extrabold text-white sm:px-4 sm:text-[15px]">{x.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="section bg-ground pt-0">
      <div className="max-w-3xl">
        <p className="eyebrow">OUR PROCESS</p>
        <h2 className="h2">From first call to <span className="text-chili">running</span> smoothly</h2>
      </div>
      <ol className="mt-7 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 lg:grid-cols-6">
        {steps.map((s, i) => (
          <li key={s} className="card flex flex-col gap-2 bg-white/75 p-4 sm:gap-3 sm:p-6">
            <span className={`text-3xl font-extrabold ${tints[i % 4].fg}`}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className="text-t-h4 font-extrabold">{s}</h3>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="section bg-mist" aria-labelledby="testi-title">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">CLIENT FEEDBACK</p>
        <h2 id="testi-title" className="h2">What our <span className="text-chili">clients</span> say</h2>
      </div>
      <ul className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <li key={i} className="card flex flex-col gap-3.5 p-6">
            <div className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((n) => <svg key={n} width="18" height="18" viewBox="0 0 24 24" fill="#C8921B" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" /></svg>)}
            </div>
            <blockquote className="text-[17px] font-semibold leading-relaxed">“{t.quote}”</blockquote>
            <div className="mt-auto flex items-center gap-3 border-t border-ink/10 pt-3.5">
              <span className={`ib h-11 w-11 rounded-full text-sm font-extrabold ${tints[i % 4].bg} ${tints[i % 4].fg}`}>{t.name.replace(/[\[\]]/g, "").slice(0, 1)}</span>
              <span className="text-sm leading-snug"><b className="block text-[15px]">{t.name}</b><span className="font-semibold text-muted">{t.role}</span></span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
const FAQ_WA_TEXT = "Hi! I have a question about Restaurant Brain.";

const topics: { id: TopicId; title: string; note: string; bg: string; tick: string; icon: string }[] = [
  { id: "basics", title: "The basics", note: "What it is and who it is for", bg: "#BFE5C1", tick: "#2F8F55", icon: "M12 16v-5M12 8h.01M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" },
  { id: "setup", title: "Setup & hardware", note: "Getting started without surprises", bg: "#B8E1E7", tick: "#2E93A3", icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z" },
  { id: "branches", title: "Branches & data", note: "Many locations, one dashboard", bg: "#F5E9B6", tick: "#A88F16", icon: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" },
  { id: "pricing", title: "Pricing & demo", note: "Cost, quotes and trying it first", bg: "#F6C5BD", tick: "#D4574A", icon: "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8zM7.5 7.5h.01" },
];

/* "Still have a question?" card. Desktop par header k right mein, mobile par list k neeche. */
function FaqHelp({ wa, className = "" }: { wa: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[22px] bg-deep px-5 py-5 sm:rounded-[28px] sm:px-7 sm:py-7 ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(37,211,102,.35),transparent_68%)]" />
      <div className="relative">
        <h3 className="text-t-h3 font-extrabold leading-tight text-white">Still have a question?</h3>
        <p className="mt-1 text-[15px] font-medium leading-relaxed text-white/85">
          Ask our team directly. We reply during working hours.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[15px] font-extrabold text-ink shadow-[0_14px_26px_-12px_rgba(37,211,102,.8)] transition hover:bg-[#2BE070] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 motion-safe:hover:-translate-y-0.5"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.09.55 4.13 1.6 5.93L0 24l6.4-1.68a11.8 11.8 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44zM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.8 1 1.01-3.7-.24-.38a9.86 9.86 0 0 1-1.51-5.27C2.1 6.4 6.6 1.9 12.05 1.9c2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.98c0 5.45-4.44 9.9-9.87 9.9zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" /></svg>
            Ask on WhatsApp
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-5 py-2.5 text-[15px] font-extrabold text-white transition hover:border-white/60 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
          >
            Send a message
          </a>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const all = allFaqs;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(FAQ_WA_TEXT)}`;

  /* topic ke hisaab se group, khaali topics hata do */
  const groups = topics
    .map((t) => ({ ...t, items: all.filter((f) => f.topic === t.id) }))
    .filter((g) => g.items.length > 0);

  /* Topics ko left/right columns mein balance karo: har naya topic us column mein jaata hai jo chhota ho */
  const columns: (typeof groups)[] = [[], []];
  const load = [0, 0];
  groups.forEach((g) => {
    const side = load[0] <= load[1] ? 0 : 1;
    columns[side].push(g);
    load[side] += g.items.length + 2;
  });

  return (
    <section id="faq" className="section relative overflow-clip bg-ground pt-0" aria-labelledby="faq-title">
      <style>{`
        @keyframes faq-reveal{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
        .faq-item[open] .faq-a{animation:faq-reveal .4s cubic-bezier(.22,.8,.2,1)}
        @media (prefers-reduced-motion:reduce){.faq-item[open] .faq-a{animation:none}}
      `}</style>

      {/* soft colour orbs glass cards k peeche */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(70,190,130,.25),transparent_68%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(214,52,31,.16),transparent_68%)]" />

      {/* HEADER: left mein heading + description + topic links, right mein help card (desktop) */}
      <div className="relative grid items-end gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div className="text-left">
          <p className="eyebrow">FAQS</p>
          <h2 id="faq-title" className="h2">
            Questions? <span className="text-chili">Answered.</span>
          </h2>
          <p className="lead mt-3 max-w-xl">
            Everything you need to know before you start, sorted by topic so you can jump straight to what matters.
          </p>

          <nav aria-label="FAQ topics" className="mt-6 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a
                key={g.id}
                href={`#faq-${g.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-[14px] font-bold text-ink shadow-[0_10px_20px_-16px_rgba(13,43,62,.4)] transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-chili/40"
              >
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: g.tick }} />
                {g.title}
              </a>
            ))}
          </nav>
        </div>

        <FaqHelp wa={wa} className="hidden lg:block" />
      </div>

      {/* TOPIC COLUMNS: kuch topics left mein, kuch right mein */}
      <div className="relative mt-8 grid items-start gap-8 sm:mt-12 md:grid-cols-2 md:gap-8 lg:gap-12">
        {columns.map((col, c) => (
          <div key={c} className="flex flex-col gap-7 sm:gap-10">
            {col.map((g) => (
              <section key={g.id} id={`faq-${g.id}`} aria-labelledby={`faq-h-${g.id}`} className="scroll-mt-28">
                <header className="mb-5 flex items-center gap-3 px-1">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl text-white"
                    style={{ background: g.tick }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d={g.icon} /></svg>
                  </span>
                  <div>
                    <h3 id={`faq-h-${g.id}`} className="text-t-h3 font-extrabold leading-tight text-ink">{g.title}</h3>
                    <p className="text-[13.5px] font-medium text-ink/60">{g.note}</p>
                  </div>
                </header>

                <div className="flex flex-col gap-4">
                  {g.items.map((f, i) => (
                    <details
                      key={f.q}
                      name="faq"
                      open={g.id === groups[0].id && i === 0}
                      style={{ "--bg": `${g.bg}77`, "--tick": g.tick } as CSSProperties}
                      className="faq-item group relative overflow-hidden rounded-[26px] border border-white/80 bg-gradient-to-br from-white/85 to-white/55 shadow-[0_18px_30px_-26px_rgba(13,43,62,.35)] transition duration-500 hover:border-white hover:shadow-[0_26px_40px_-28px_rgba(13,43,62,.45)] open:border-white open:shadow-[0_34px_50px_-30px_rgba(13,43,62,.5),inset_0_1px_0_#fff] open:[background-image:linear-gradient(135deg,rgba(255,255,255,.97),rgba(255,255,255,.85)_45%,var(--bg))]"
                    >
                      {/* accent bar: open hone par slide in */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-5 left-0 top-5 w-1 origin-center scale-y-0 rounded-r-full bg-[var(--tick)] transition duration-500 group-open:scale-y-100"
                      />

                      <summary className="flex cursor-pointer list-none items-center gap-3 rounded-[22px] px-4 py-4 sm:gap-4 sm:rounded-[26px] sm:px-5 sm:py-5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-chili/40 [&::-webkit-details-marker]:hidden">
                        <span
                          aria-hidden="true"
                          style={{ WebkitTextStroke: "1.5px var(--tick)" }}
                          className="min-w-[24px] text-[19px] font-black sm:min-w-[30px] sm:text-[24px] leading-none tabular-nums text-transparent transition-colors duration-500 group-open:text-[var(--tick)]"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-left text-[15px] font-extrabold sm:text-[16px] leading-snug text-ink">{f.q}</span>
                        <span
                          aria-hidden="true"
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/5 text-ink transition duration-500 group-hover:bg-ink/10 group-open:rotate-45 group-open:bg-[var(--tick)] group-open:text-white"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                        </span>
                      </summary>

                      <div className="faq-a">
                        <p className="px-4 pb-4 text-[14px] font-medium leading-relaxed text-ink/70 sm:px-5 sm:pb-5 sm:text-[15px] sm:pl-[70px]">{f.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile / tablet par help card sab k neeche */}
      <FaqHelp wa={wa} className="relative mt-10 lg:hidden" />
    </section>
  );
}