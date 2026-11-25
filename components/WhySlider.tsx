"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { itSolutions, pairs } from "@/lib/data";

// Emerald Chili tints: bg = soft blob colour, tick = stronger accent (text, icon, connector)
const tones = [
  { bg: "#BFE5C1", tick: "#2F8F55" },
  { bg: "#F6C5BD", tick: "#D4574A" },
  { bg: "#F5E9B6", tick: "#A88F16" },
  { bg: "#B8E1E7", tick: "#2E93A3" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/* Shown on every card above the solution headline. Change it if the section should speak to any business. */
const FIX_LABEL = "With Restaurant Brain";

/* Business types in the "Works for" row under the slider */
const BUSINESSES = ["Restaurants", "Retail shops", "Clinics", "Salons", "Gyms", "Warehouses", "Offices", "Call centers"];

/* Extra points that speak to any business, added after the ones in lib/data.
   Format: [problem, solution, description]. Move them into `pairs` in lib/data whenever you like. */
const morePairs: readonly (readonly [string, string, string])[] = [
  ["Customers wait and walk away", "Queues that manage themselves", "Smart tokens and live wait times keep customers calm in shops, clinics and salons."],
  ["Cash goes missing at the counter", "Every transaction watched", "AI flags odd voids, refunds and cash moves in any store or branch, the moment they happen."],
  ["No idea what is really selling", "Live sales insights", "Daily and weekly reports by branch, product and staff member, right on your phone."],
  ["Stock runs out without warning", "Alerts before you run low", "Low-stock warnings and ready reorder lists for shops, pharmacies, cafes and warehouses."],
  ["Many branches, no clear picture", "All branches, one dashboard", "Compare sales, attendance and issues across every location without calling anyone."],
  ["Shifts and payroll eat your week", "Shifts and payroll on autopilot", "Attendance, overtime and leave flow straight into payroll-ready reports."],
  ["Safety and rule breaks go unseen", "AI cameras that spot issues live", "Missing uniforms, restricted areas and safety gear are flagged to a manager instantly."],
  ["Customer messages go unanswered", "An assistant that never sleeps", "Answers questions and takes bookings and orders on WhatsApp and web, around the clock."],
];

const all: ReadonlyArray<readonly string[]> = [...pairs, ...morePairs];

/* Points in lib/data without a 3rd item (description) get one from here, matched by topic keywords
   in the problem/solution text. A description you write in lib/data always wins over these. */
const topicDescriptions: { words: string[]; text: string }[] = [
  { words: ["late", "attend", "clock", "face", "punch", "roster"], text: "Face ID clock-ins at the door, with late and overtime alerts and payroll-ready reports, so nobody clocks in for a friend." },
  { words: ["hygiene", "hairnet", "glove", "clean", "uniform", "safety", "kitchen"], text: "AI cameras spot missing hairnets, gloves and uniforms live and alert the manager before it becomes a problem." },
  { words: ["till", "cash", "void", "theft", "fraud", "register", "steal", "refund"], text: "Odd voids, refunds and cash moves are flagged the moment they happen, and the manager is notified straight away." },
  { words: ["stock", "inventory", "waste", "ingredient", "supply", "run out"], text: "Every sale updates inventory in real time, with low-stock alerts and ready reorder lists." },
  { words: ["table", "guest", "queue", "wait", "floor", "service", "customer", "ignored"], text: "See every table and entrance on one screen, so waiting guests and calls for help never go unnoticed." },
  { words: ["bill", "pos", "order", "payment", "ticket", "billing"], text: "Orders go straight to the kitchen and bills update stock automatically, with no re-entering and fewer mistakes." },
];

function fallbackDesc(a: string, b: string): string | undefined {
  const text = `${a} ${b}`.toLowerCase();
  return topicDescriptions.find((t) => t.words.some((w) => text.includes(w)))?.text;
}

export default function WhySlider() {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scrollToIndex = useCallback((i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      const kids = Array.from(el.children) as HTMLElement[];
      const max = el.scrollWidth - el.clientWidth;
      const start = el.scrollLeft <= 2;
      const end = max > 2 && el.scrollLeft >= max - 2;
      setAtStart(start);
      setAtEnd(end);

      const left = el.scrollLeft + el.offsetLeft;
      let best = 0;
      kids.forEach((k, i) => {
        if (Math.abs(k.offsetLeft - left) < Math.abs(kids[best].offsetLeft - left)) best = i;
      });
      setActive(end ? kids.length - 1 : best);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir: 1 | -1) => scrollToIndex(Math.min(all.length - 1, Math.max(0, active + dir)));

  return (
    <div className="mt-6 sm:mt-10">
      <ul
        ref={track}
        aria-label="Problems Restaurant Brain solves"
        className="-mx-2 flex snap-x snap-mandatory gap-3 sm:gap-6 overflow-x-auto scroll-smooth px-2 pb-8 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {all.map((pair, i) => {
          const [a, b, given] = pair; // 3rd item = optional description
          const desc = given || fallbackDesc(a, b);
          const tone = tones[i % tones.length];
          const icon = itSolutions[i % itSolutions.length].icon; // apne icon names yahan laga sakte hain
          return (
            <li key={`${i}-${a}`} className="w-[84%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
              <article
                className="group relative flex h-full min-h-[400px] flex-col overflow-hidden rounded-[26px] border border-white bg-white/80 p-4 sm:min-h-[460px] sm:rounded-[36px] sm:p-6 shadow-[0_30px_60px_-30px_rgba(13,43,62,.4),inset_0_1px_0_#fff] backdrop-blur-xl transition duration-500 hover:shadow-[0_44px_70px_-30px_rgba(13,43,62,.5),inset_0_1px_0_#fff] motion-safe:hover:-translate-y-2 sm:p-7"
              >
                {/* colour blobs, they drift a little on hover */}
                <span
                  aria-hidden="true"
                  style={{ background: `radial-gradient(circle, ${tone.bg}, transparent 68%)` }}
                  className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full opacity-70 transition duration-700 motion-safe:group-hover:scale-125"
                />
                <span
                  aria-hidden="true"
                  style={{ background: `radial-gradient(circle, ${tone.bg}, transparent 68%)` }}
                  className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full opacity-40 transition duration-700 motion-safe:group-hover:translate-x-6"
                />

                {/* top row: outlined number + icon badge */}
                <div className="relative flex items-start justify-between">
                  <span
                    aria-hidden="true"
                    style={{ WebkitTextStroke: `1.5px ${tone.tick}`, color: "transparent" }}
                    className="text-t-num font-black leading-none tracking-tight tabular-nums opacity-80"
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{ background: tone.tick }}
                    className="grid h-16 w-16 place-items-center rounded-[22px] text-white shadow-[0_16px_26px_-12px_rgba(13,43,62,.55)] transition duration-500 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110"
                  >
                    <Icon name={icon} size={30} stroke={1.8} />
                  </span>
                </div>

                {/* the problem */}
                <div className="relative mt-8">
                  <p className="text-[11px] font-extrabold uppercase tracking-[.14em] text-ink/45">Before</p>
                  <p className="mt-2.5 inline-flex items-start gap-2 rounded-2xl border border-ink/10 bg-ink/5 px-3 py-2 text-[13px] font-semibold leading-snug text-ink/55 line-through decoration-ink/30">
                    <span
                      aria-hidden="true"
                      className="mt-px grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink/15 text-[10px] font-black leading-none text-ink/60 no-underline"
                    >
                      ✕
                    </span>
                    {a}
                  </p>
                </div>

                {/* connector */}
                <div aria-hidden="true" className="relative my-4 flex items-center gap-3">
                  <span className="h-px flex-1 border-t border-dashed border-ink/20" />
                  <span
                    style={{ background: tone.tick }}
                    className="grid h-8 w-8 place-items-center rounded-full text-white shadow-[0_10px_16px_-8px_rgba(13,43,62,.5)]"
                  >
                    <Icon name="arr" size={14} stroke={2.6} className="rotate-90 transition-transform duration-500 motion-safe:group-hover:translate-y-0.5" />
                  </span>
                  <span className="h-px flex-1 border-t border-dashed border-ink/20" />
                </div>

                {/* the fix */}
                <div className="relative flex flex-1 flex-col">
                  <p style={{ color: tone.tick }} className="text-[11px] font-extrabold uppercase tracking-[.14em]">
                    {FIX_LABEL}
                  </p>
                  <h3 className="mt-2 text-t-h3 font-extrabold leading-tight text-ink">{b}</h3>
                  {desc && <p className="mt-3.5 text-[14px] font-medium leading-relaxed text-ink/70">{desc}</p>}
                </div>

                {/* accent bar that fills on hover */}
                <span aria-hidden="true" className="relative mt-6 block h-1.5 overflow-hidden rounded-full bg-ink/10">
                  <span
                    style={{ background: tone.tick }}
                    className="block h-full w-1/4 rounded-full transition-[width] duration-700 ease-out group-hover:w-full motion-reduce:transition-none"
                  />
                </span>
              </article>
            </li>
          );
        })}
      </ul>

      {/* controls: segmented progress + counter on the left, arrows on the right */}
      <div className="mt-1 flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <p className="shrink-0 text-sm font-extrabold tabular-nums text-ink">
            {pad(active + 1)}
            <span className="text-ink/35"> / {pad(all.length)}</span>
          </p>
          <div className="flex max-w-[360px] flex-1 items-center gap-1.5" role="tablist" aria-label="Choose slide">
            {all.map(([a], i) => (
              <button
                key={`${i}-${a}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className="group/seg grid h-5 flex-1 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili"
              >
                <span
                  className={`block h-1.5 w-full rounded-full transition-all duration-500 ${
                    i === active ? "bg-ink" : i < active ? "bg-ink/40" : "bg-ink/15 group-hover/seg:bg-ink/30"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2.5">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => go(d)}
              disabled={d === -1 ? atStart : atEnd}
              aria-label={d === -1 ? "Previous" : "Next"}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/80 bg-white/70 text-ink shadow-[0_12px_24px_-14px_rgba(13,43,62,.5)] backdrop-blur-xl transition hover:bg-chili hover:text-white disabled:opacity-40 disabled:hover:bg-white/70 disabled:hover:text-ink motion-safe:active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-chili"
            >
              <Icon name="arr" size={20} stroke={2.6} className={d === -1 ? "rotate-180" : ""} />
            </button>
          ))}
        </div>
      </div>

      {/* works for every business */}
      <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-10 sm:gap-2.5">
        <span className="mr-1 text-[11px] font-extrabold uppercase tracking-[.14em] text-ink/45">Works for</span>
        {BUSINESSES.map((b) => (
          <span
            key={b}
            className="rounded-full border border-white bg-white/70 px-3.5 py-1.5 text-[13px] font-bold text-ink shadow-[0_8px_16px_-12px_rgba(13,43,62,.5)] backdrop-blur-md"
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
} 