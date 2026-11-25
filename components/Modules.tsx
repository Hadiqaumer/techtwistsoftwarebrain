import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import Icon from "./Icon";
import Roster from "./Roster";
import WallCarousel from "./WallCarousel";
import { modules, photos, tints } from "@/lib/data";

/* Needs ./living-cards.css imported once (e.g. in app/globals.css):
   @import "./living-cards.css";                                      */

const focusRing =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-chili/40";

/* Glass surface: white -> mint gradient, frosted blur, light shine on hover */
const glass =
  "relative overflow-hidden border border-white/90 bg-gradient-to-br from-white/90 via-white/50 to-[#EBF7EA]/70 backdrop-blur-xl backdrop-saturate-150 " +
  "shadow-[inset_0_1px_0_#fff,0_30px_50px_-34px_rgba(13,43,62,.5)] transition duration-500 " +
  "after:pointer-events-none after:absolute after:inset-y-0 after:-left-[70%] after:w-[40%] after:[transform:skewX(-18deg)] " +
  "after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent after:transition-[left] after:duration-1000 " +
  "hover:border-white hover:after:left-[130%] hover:shadow-[inset_0_1px_0_#fff,0_44px_64px_-30px_rgba(13,43,62,.6)] " +
  "motion-safe:hover:-translate-y-2 motion-reduce:after:transition-none";

const faceIdPoints = [
  "No cards or PINs",
  "Late & overtime alerts",
  "Payroll-ready reports",
];

/* ───────────── Living elements: small, top-left corner of the photo ───────────── */

function LiveBadge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute left-2.5 top-2.5 z-10 flex origin-top-left items-center gap-1.5 rounded-xl border border-white/70 bg-white/70 p-1 shadow-[0_8px_16px_-10px_rgba(13,43,62,.55)] backdrop-blur-md transition duration-500 motion-safe:group-hover:scale-110 ${className}`}
    >
      {children}
    </div>
  );
}

const corner = "absolute h-2.5 w-2.5 border-[#FF8A73]";

function LiveFace() {
  return (
    <LiveBadge className="!border-white/30 !bg-ink/60">
      <div className="relative h-[50px] w-[42px]">
        <span className={`${corner} left-0 top-0 rounded-tl-md border-l-2 border-t-2`} />
        <span className={`${corner} right-0 top-0 rounded-tr-md border-r-2 border-t-2`} />
        <span className={`${corner} bottom-0 left-0 rounded-bl-md border-b-2 border-l-2`} />
        <span className={`${corner} bottom-0 right-0 rounded-br-md border-b-2 border-r-2`} />
        <svg viewBox="0 0 120 140" className="absolute inset-[5px] h-[calc(100%-10px)] w-[calc(100%-10px)]" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="5" strokeLinecap="round">
          <circle cx="60" cy="50" r="26" />
          <path d="M14 136c0-26 20-42 46-42s46 16 46 42" />
          <circle className="lv-dot" cx="50" cy="46" r="4" fill="#FF8A73" stroke="none" />
          <circle className="lv-dot" cx="70" cy="46" r="4" fill="#FF8A73" stroke="none" style={{ animationDelay: ".4s" }} />
          <circle className="lv-dot" cx="60" cy="60" r="4" fill="#FF8A73" stroke="none" style={{ animationDelay: ".8s" }} />
        </svg>
        <span className="lv-scan absolute inset-x-1 h-[2px] rounded bg-gradient-to-r from-transparent via-[#FF8A73] to-transparent shadow-[0_0_6px_2px_rgba(255,138,115,.6)]" />
      </div>
      <span className="lv-pop inline-flex items-center gap-1 rounded-full bg-[#3DDC84] px-1.5 py-0.5 text-[8px] font-extrabold text-ink">
        <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
        Matched
      </span>
    </LiveBadge>
  );
}

function LivePos() {
  return (
    <LiveBadge className="lv-bob w-[76px] !flex-col !items-stretch !gap-1 !p-1.5">
      <div className="flex items-center justify-between">
        <span className="h-1 w-6 rounded bg-chili" />
        <span className="lv-blink h-1 w-1 rounded-full bg-chili" />
      </div>
      {[100, 78, 60].map((w, i) => (
        <span key={w} className="lv-grow block h-1 rounded bg-ink/15" style={{ width: `${w}%`, animationDelay: `${i * 0.3}s` }} />
      ))}
      <span className="inline-flex w-fit items-center rounded-full bg-[#D8F3DF] px-1.5 py-px text-[7px] font-extrabold text-[#0F6B3B]">Paid</span>
    </LiveBadge>
  );
}

function LiveKitchen() {
  const bars = ["bg-[#F2A516]", "bg-chili", "bg-[#2E9E5E]"];
  return (
    <LiveBadge className="!gap-1 !p-1.5">
      {bars.map((c, i) => (
        <div key={c} className={`flex w-[19px] flex-col gap-0.5 rounded-md bg-white p-1 shadow-sm ${i === 1 ? "-translate-y-0.5" : ""}`}>
          <span className={`h-[3px] w-3/5 rounded ${c}`} />
          <span className="h-[2px] rounded bg-ink/15" />
          <span className="h-[3px] overflow-hidden rounded bg-ink/10">
            <span className={`lv-grow block h-full rounded ${c}`} style={{ animationDelay: `${-i * 1.1}s` }} />
          </span>
        </div>
      ))}
    </LiveBadge>
  );
}

function LiveStock() {
  const bars = [
    ["h-full", "bg-ink", "0s"],
    ["h-[78%]", "bg-ink/70", "-.8s"],
    ["h-[92%]", "bg-ink/45", "-1.6s"],
    ["h-[60%]", "bg-chili", "-2.2s"],
  ];
  return (
    <LiveBadge className="!flex-col !items-stretch !gap-0.5 !p-1.5">
      <span className="inline-flex items-center gap-1 text-[7px] font-extrabold text-[#B42A18]">
        <span className="lv-blink h-1 w-1 rounded-full bg-chili" /> Low stock
      </span>
      <div className="flex h-[26px] w-[60px] items-end gap-1">
        {bars.map(([h, c, d]) => (
          <span key={c} className={`lv-bar w-full rounded-t ${h} ${c}`} style={{ animationDelay: d }} />
        ))}
      </div>
    </LiveBadge>
  );
}

function LiveCam() {
  return (
    <LiveBadge className="overflow-hidden !border-white/30 !bg-ink/80 !p-0">
      <div
        className="relative h-[42px] w-[68px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)",
          backgroundSize: "9px 9px",
        }}
      >
        <span className="lv-sweep absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-transparent via-[#FF8A73]/40 to-transparent" />
        <span className="lv-track absolute left-[34%] top-[28%] h-4 w-3.5 rounded-sm border-2 border-[#FF8A73]">
          <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />
        </span>
        <span className="absolute left-1 top-0.5 flex items-center gap-0.5 text-[6px] font-extrabold tracking-wider text-white">
          <span className="lv-blink h-1 w-1 rounded-full bg-[#FF5A44]" /> REC
        </span>
      </div>
    </LiveBadge>
  );
}

/* Tables / reservations: seat dots, one keeps blinking */
function LiveTable() {
  return (
    <LiveBadge className="!flex-col !items-stretch !gap-1 !p-1.5">
      <span className="text-[7px] font-extrabold text-ink">Tables</span>
      <div className="grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className={`h-2.5 w-2.5 rounded-[4px] ${i === 2 ? "lv-blink bg-chili" : i % 3 === 0 ? "bg-[#2E9E5E]" : "bg-ink/20"}`}
          />
        ))}
      </div>
    </LiveBadge>
  );
}

/* Delivery / online orders: a rider moving along a route */
function LiveDelivery() {
  return (
    <LiveBadge className="!flex-col !items-stretch !gap-1 !p-1.5">
      <span className="flex items-center gap-1 text-[7px] font-extrabold text-ink">
        <span className="lv-blink h-1 w-1 rounded-full bg-[#2E9E5E]" /> On the way
      </span>
      <div className="relative h-3 w-[64px]">
        <span className="absolute inset-x-0 top-1/2 h-px border-t border-dashed border-ink/30" />
        <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink/40" />
        <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-chili" />
        <span className="lv-track absolute left-[30%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#F2A516] shadow" />
      </div>
    </LiveBadge>
  );
}

/* Reports / analytics: bars + a drawn trend line */
function LiveReport() {
  return (
    <LiveBadge className="!flex-col !items-stretch !gap-0.5 !p-1.5">
      <span className="text-[7px] font-extrabold text-ink">Sales +18%</span>
      <div className="relative h-[24px] w-[60px]">
        <div className="absolute inset-0 flex items-end gap-1">
          {["h-[40%]", "h-[55%]", "h-[48%]", "h-[75%]", "h-full"].map((h, i) => (
            <span key={i} className={`lv-grow w-full rounded-t bg-ink/20 ${h}`} style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <svg viewBox="0 0 60 24" className="absolute inset-0 h-full w-full" fill="none">
          <path className="lv-draw" pathLength="120" d="M2 18 L14 13 L26 15 L40 7 L58 2" stroke="#D6341F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </LiveBadge>
  );
}

/* Menu / QR ordering: QR grid with a scanning line */
function LiveMenu() {
  return (
    <LiveBadge className="!gap-1.5 !p-1.5">
      <div className="relative grid h-[30px] w-[30px] grid-cols-5 gap-px overflow-hidden rounded bg-white p-0.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className={[0, 1, 3, 4, 5, 9, 12, 15, 19, 20, 21, 23, 24, 7, 17].includes(i) ? "bg-ink" : "bg-transparent"} />
        ))}
        <span className="lv-scan absolute inset-x-0 h-[2px] bg-chili shadow-[0_0_6px_1px_rgba(214,52,31,.6)]" />
      </div>
      <span className="lv-pop rounded-full bg-[#D8F3DF] px-1.5 py-0.5 text-[7px] font-extrabold text-[#0F6B3B]">Order sent</span>
    </LiveBadge>
  );
}

/* Pick a widget with `live: "pos" | "kitchen" | "stock" | "cam" | "table" | "delivery" | "report" | "menu"`
   on each item in `modules` (lib/data). Without it, they rotate in this order. */
type LiveKey = "pos" | "kitchen" | "stock" | "cam" | "table" | "delivery" | "report" | "menu";
const LIVE: Record<LiveKey, ComponentType> = {
  pos: LivePos,
  kitchen: LiveKitchen,
  stock: LiveStock,
  cam: LiveCam,
  table: LiveTable,
  delivery: LiveDelivery,
  report: LiveReport,
  menu: LiveMenu,
};
const LIVE_ORDER: ComponentType[] = [
  LivePos,
  LiveKitchen,
  LiveStock,
  LiveCam,
  LiveTable,
  LiveDelivery,
  LiveReport,
  LiveMenu,
];

/* ───────────── Sections ───────────── */

export function Modules() {
  return (
    <section id="modules" aria-labelledby="modules-title" className="section relative overflow-hidden bg-mist">
      {/* soft colour orbs so the glass has something to blur */}
      <div aria-hidden="true" className="lv-drift pointer-events-none absolute -right-24 -top-32 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(214,52,31,.22),transparent_68%)]" />
      <div aria-hidden="true" className="lv-drift pointer-events-none absolute -left-32 top-1/3 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(70,190,130,.32),transparent_68%)] [animation-delay:-4s]" />
      <div aria-hidden="true" className="lv-drift pointer-events-none absolute -bottom-40 right-1/4 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(110,170,230,.25),transparent_68%)] [animation-delay:-7s]" />

      <div className="relative max-w-3xl">
        <p className="eyebrow">PLATFORM MODULES</p>
        <h2 id="modules-title" className="h2">
          Every station,{" "}
          <span className="relative inline-block text-chili">
            one
            <svg aria-hidden="true" viewBox="0 0 100 12" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full">
              <path className="lv-draw" pathLength="120" d="M2 8 C 14 2, 24 2, 36 7 S 60 12, 72 6 S 90 2, 98 6" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </span>{" "}
          brain
        </h2>
        <p className="lead mt-4">
          Start with one module or run them all. Everything shares the same data, so your team never re-enters a thing.
        </p>
      </div>

      <div className="relative mt-7 grid gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Featured module */}
        <article className={`group flex flex-col gap-4 rounded-[26px] p-4 sm:gap-5 sm:rounded-[34px] sm:p-7 sm:col-span-2 lg:row-span-2 ${glass}`}>
          <div className="relative h-[200px] overflow-hidden rounded-[22px] border border-white/60 lg:h-[230px]">
            <Image
              src={photos.module1.src}
              alt={photos.module1.alt}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover object-[50%_30%] transition duration-700 motion-safe:group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/45" />
            <LiveFace />
            <span className="pill absolute bottom-3 left-3 !text-xs">AI attendance · Face check-in</span>
          </div>

          <h3 className="text-t-feat font-extrabold leading-tight text-ink">
            Know who is on shift. <span className="text-chili">Instantly.</span>
          </h3>
          <p className="text-base font-medium leading-relaxed text-muted">
            Your whole floor team, tracked automatically from the moment they walk in.
          </p>

          <ul className="flex flex-wrap gap-2 p-0">
            {faceIdPoints.map((p) => (
              <li key={p} className="flex list-none items-center gap-1.5 rounded-full border border-ink/10 bg-white/75 px-3 py-1.5 text-[13px] font-semibold text-ink">
                <svg aria-hidden="true" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F8A4F" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-auto rounded-[22px] border border-white bg-gradient-to-br from-white/90 to-white/55 p-4 sm:p-5 shadow-[0_18px_30px_-22px_rgba(13,43,62,.45)]">
            <div className="mb-3 flex items-center justify-between">
              <b className="text-[15px] text-ink">Live shift roster</b>
              <span className="flex items-center gap-1.5 text-xs font-extrabold text-chili">
                <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-chili motion-reduce:animate-none" />
                LIVE
              </span>
            </div>
            <Roster />
          </div>
        </article>

        {/* Other modules */}
        {modules.map((m, i) => {
          const t = tints[i % tints.length];
          const liveKey = (m as { live?: LiveKey }).live;
          const Live = (liveKey && LIVE[liveKey]) || LIVE_ORDER[i % LIVE_ORDER.length];
          return (
            <a
              key={m.title}
              href="#contact"
              aria-label={`${m.title} – learn more`}
              className={`group flex flex-col rounded-[24px] p-3 sm:rounded-[30px] sm:p-3.5 ${glass} ${focusRing}`}
            >
              <div className="relative h-[115px] overflow-hidden rounded-[18px] sm:h-[150px] sm:rounded-[22px] border border-white/60">
                <Image
                  src={photos[m.photo].src}
                  alt={photos[m.photo].alt}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                  className="object-cover transition duration-500 motion-safe:group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/30" />
                <Live />
              </div>

              {/* Icon badge sits outside the clipped image so it never gets cut off */}
              <span
                aria-hidden="true"
                className={`ib relative z-10 -mt-6 ml-4 flex h-[46px] w-[46px] items-center justify-center rounded-[15px] border-[3px] border-white shadow-[0_10px_18px_-8px_rgba(13,43,62,.5)] transition duration-300 motion-safe:group-hover:-rotate-6 ${t.bg} ${t.fg}`}
              >
                <Icon name={m.icon} size={22} />
              </span>

              <div className="flex flex-1 flex-col gap-2.5 px-3 pb-3 pt-4">
                <h3 className="text-t-h3 font-extrabold text-ink">{m.title}</h3>
                <p className="text-[15px] font-medium leading-relaxed text-muted">{m.text}</p>
                <span className="mt-auto flex w-fit items-center gap-1.5 rounded-full border border-ink/10 bg-ink/5 px-3.5 py-2 text-sm font-extrabold text-ink transition duration-300 group-hover:border-transparent group-hover:bg-chili group-hover:text-white">
                  Learn more
                  <span aria-hidden="true" className="transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                    <Icon name="arr" size={15} stroke={2.2} />
                  </span>
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="relative mt-8 flex flex-col items-center gap-3 text-center sm:mt-12 sm:gap-4">
        <p className="text-base font-semibold text-muted">Not sure which module to start with?</p>
        <a
          href="#contact"
          className={`inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-extrabold text-white shadow-[0_16px_28px_-14px_rgba(13,43,62,.7)] transition hover:bg-chili motion-safe:hover:-translate-y-0.5 ${focusRing}`}
        >
          Book a free demo <Icon name="arr" size={16} stroke={2.4} />
        </a>
      </div>
    </section>
  );
}

export function Wall() {
  return (
    <section id="action" aria-labelledby="action-title" className="section overflow-hidden bg-ground">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">IN ACTION</p>
        <h2 id="action-title" className="h2">
          See Restaurant Brain <span className="text-chili">at work</span>
        </h2>
        <p className="lead mt-4">From the counter to the kitchen, the floor and the camera room.</p>
      </div>

      <div className="mt-6 sm:mt-12">
        <WallCarousel />
      </div>
    </section>
  );
}