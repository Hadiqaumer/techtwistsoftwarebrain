"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps, CSSProperties, PointerEvent as RPointerEvent } from "react";
import Icon from "./Icon";
import { industries, itSolutions, photos } from "@/lib/data";

/* ---------- content (taken from the Tech Twist Global company profile) ---------- */
const pillars = [
  { title: "Business software", text: "Sales, records and reports managed in one place.", bg: "#BFE5C1", fg: "#3F9A5E" },
  { title: "Custom solutions", text: "Modules and workflows built around how you work.", bg: "#F6C5BD", fg: "#D9675D" },
  { title: "CCTV & security", text: "Planned camera coverage, live view and saved footage.", bg: "#B8E1E7", fg: "#3A9FB0" },
  { title: "Staff attendance", text: "Digital records, shifts and clear attendance reports.", bg: "#F5E9B6", fg: "#B8A22A" },
];

const stats = [
  { to: 6, label: "core solutions" },
  { to: 2, label: "countries served" },
  { to: 9, label: "industry types" },
];

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/* ---------- helpers ---------- */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setSeen(true); io.disconnect(); }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

function Count({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

/* pointer-driven 3D tilt: writes CSS vars directly, so no re-renders */
function useTilt<T extends HTMLElement>(max = 10) {
  const ref = useRef<T>(null);
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onPointerMove = (e: RPointerEvent<T>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch" || reduced()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * max * 2}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };
  return { ref, onPointerMove, onPointerLeave };
}

type IconName = ComponentProps<typeof Icon>["name"];

function PillarCard({ p, icon, delay }: { p: (typeof pillars)[number]; icon: IconName; delay: number }) {
  const tilt = useTilt<HTMLDivElement>(9);
  return (
    <li className="ab-r" style={d(delay)}>
      <div
        {...tilt}
        className="ab-card group relative flex items-start gap-4 rounded-2xl border border-white/80 p-4 backdrop-blur-xl sm:rounded-3xl sm:p-5"
        style={{ backgroundImage: `linear-gradient(160deg, rgba(255,255,255,.95), ${p.bg}59)` }}
      >
        <span aria-hidden="true" className="ab-glare pointer-events-none absolute inset-0 rounded-3xl" />
        <span
          className="ab-pop grid h-14 w-14 shrink-0 place-items-center rounded-2xl shadow-[0_14px_20px_-10px_rgba(13,43,62,.35)]"
          style={{ background: `${p.bg}CC`, color: p.fg }}
        >
          <Icon name={icon} size={30} stroke={1.8} />
        </span>
        <span className="ab-pop-sm">
          <b className="block text-[16px] font-extrabold text-ink">{p.title}</b>
          <span className="mt-0.5 block text-[14px] font-medium leading-snug text-ink/70">{p.text}</span>
        </span>
      </div>
    </li>
  );
}

const css = `
.ab-scene3d{perspective:1400px}
.ab-stage{--rx:0deg;--ry:0deg;transform-style:preserve-3d;transform:rotateX(var(--rx)) rotateY(var(--ry));transition:transform .35s cubic-bezier(.2,.7,.2,1);will-change:transform}
.ab-layer{position:absolute;transform-style:preserve-3d}
.ab-card{--rx:0deg;--ry:0deg;--mx:50%;--my:50%;transform-style:preserve-3d;transform:perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s ease;box-shadow:0 22px 34px -24px rgba(13,43,62,.45),inset 0 1px 0 rgba(255,255,255,.9)}
.ab-card:hover{box-shadow:0 34px 46px -22px rgba(13,43,62,.5),inset 0 1px 0 rgba(255,255,255,.9)}
.ab-glare{opacity:0;transition:opacity .3s ease;background:radial-gradient(240px circle at var(--mx) var(--my),rgba(255,255,255,.75),transparent 60%)}
.ab-card:hover .ab-glare{opacity:1}
.ab-pop{transform:translateZ(34px)}
.ab-pop-sm{transform:translateZ(18px)}
.ab-cube{width:64px;height:64px;position:relative;transform-style:preserve-3d}
.ab-cube i{position:absolute;inset:0;border-radius:14px;border:1.5px solid rgba(255,255,255,.7);backdrop-filter:blur(2px)}
.ab-cube i:nth-child(1){transform:translateZ(32px);background:linear-gradient(135deg,#BFE5C1cc,#B8E1E7cc)}
.ab-cube i:nth-child(2){transform:rotateY(180deg) translateZ(32px);background:linear-gradient(135deg,#F5E9B6cc,#F6C5BDcc)}
.ab-cube i:nth-child(3){transform:rotateY(90deg) translateZ(32px);background:linear-gradient(135deg,#B8E1E7cc,#BFE5C1cc)}
.ab-cube i:nth-child(4){transform:rotateY(-90deg) translateZ(32px);background:linear-gradient(135deg,#F6C5BDcc,#F5E9B6cc)}
.ab-cube i:nth-child(5){transform:rotateX(90deg) translateZ(32px);background:#F5E9B6cc}
.ab-cube i:nth-child(6){transform:rotateX(-90deg) translateZ(32px);background:#BFE5C1cc}
.ab-ring{width:210px;height:210px;border-radius:9999px;border:2px dashed rgba(63,154,94,.55);transform:rotateX(72deg)}
@media (prefers-reduced-motion: no-preference){
  .ab-r{opacity:0;transform:perspective(900px) translateY(30px) rotateX(14deg);transform-origin:50% 100%;transition:opacity .7s ease,transform .9s cubic-bezier(.2,.7,.2,1);transition-delay:var(--d,0ms)}
  [data-in="true"] .ab-r{opacity:1;transform:none}
  .ab-img{clip-path:inset(0 0 100% 0);transition:clip-path 1.2s cubic-bezier(.7,0,.2,1)}
  [data-in="true"] .ab-img{clip-path:inset(0 0 0 0)}
  .ab-scan{animation:ab-scan 4s ease-in-out infinite}
  .ab-spin{animation:ab-spin 22s linear infinite}
  .ab-bob{animation:ab-bob 5s ease-in-out infinite}
  .ab-bob2{animation:ab-bob 6.5s ease-in-out -2s infinite}
  .ab-rec{animation:ab-rec 1.2s steps(2) infinite}
  .ab-cube{animation:ab-cube 14s linear infinite}
  .ab-ring{animation:ab-ring 9s linear infinite}
  .ab-orb{animation:ab-orb 12s ease-in-out infinite}
}
@keyframes ab-scan{0%,100%{top:4%}50%{top:78%}}
@keyframes ab-spin{to{transform:rotate(360deg)}}
@keyframes ab-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes ab-rec{50%{opacity:.15}}
@keyframes ab-cube{from{transform:rotateX(-24deg) rotateY(0)}to{transform:rotateX(-24deg) rotateY(360deg)}}
@keyframes ab-ring{from{transform:rotateX(72deg) rotateZ(0)}to{transform:rotateX(72deg) rotateZ(360deg)}}
@keyframes ab-orb{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(24px,-30px,0) scale(1.08)}}
`;

/* ---------- section ---------- */
export function About() {
  const [ref, seen] = useInView<HTMLElement>();
  const stage = useTilt<HTMLDivElement>(11);
  const main = photos.cctv;
  const second = photos[industries[0].photo];

  return (
    <section
      id="about"
      ref={ref}
      data-in={String(seen)}
      className="section relative overflow-hidden bg-[linear-gradient(160deg,#FAFDF9_0%,#EFF8EE_55%,#FDF7EF_100%)]"
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ambient orbs */}
      <span aria-hidden="true" className="ab-orb pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(159,211,218,.55),transparent_68%)]" />
      <span aria-hidden="true" className="ab-orb pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(238,220,147,.55),transparent_68%)]" style={{ animationDelay: "-5s" }} />
      <span aria-hidden="true" className="ab-orb pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(239,169,160,.35),transparent_68%)]" style={{ animationDelay: "-8s" }} />

      <div className="relative grid items-center gap-12 sm:gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* ---------- 3D visual ---------- */}
        <div className="ab-scene3d relative mx-auto w-full max-w-[500px] pb-10 lg:mx-0">
          <div {...stage} className="ab-stage relative aspect-square sm:aspect-[4/5]">
            {/* depth plate behind the photo */}
            <div
              aria-hidden="true"
              className="ab-layer inset-0 rounded-[44px] bg-gradient-to-br from-[#BFE5C1]/70 to-[#B8E1E7]/70"
              style={{ transform: "translateZ(-70px) translate(26px,26px) scale(.97)" }}
            />
            <div
              aria-hidden="true"
              className="ab-layer inset-0 rounded-[44px] border border-white/70 bg-white/40 backdrop-blur-md"
              style={{ transform: "translateZ(-34px) translate(12px,12px)" }}
            />

            {/* main photo */}
            <div className="ab-layer inset-0" style={{ transform: "translateZ(0)" }}>
              <div className="ab-img relative h-full w-full overflow-hidden rounded-[44px] shadow-[0_46px_70px_-34px_rgba(13,43,62,.6)]">
                <Image src="/images/12.webp" alt="Monitoring screen showing live camera feeds and attendance logs" fill sizes="(min-width:1024px) 480px, 90vw" className="object-cover" priority={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/10" />
                <span aria-hidden="true" className="ab-scan absolute inset-x-0 top-1/3 h-20 bg-gradient-to-b from-transparent via-leaf/45 to-transparent" />
                <span className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ink/75 px-3 py-1.5 text-[11px] font-extrabold text-white backdrop-blur">
                  <i className="ab-rec h-2 w-2 rounded-full bg-[#FF5A4F]" />
                  LIVE · MONITORING
                </span>
              </div>
            </div>

            {/* orbit ring (floor) */}
            <div aria-hidden="true" className="ab-layer -bottom-6 left-1/2 -ml-[105px] max-md:hidden" style={{ transform: "translateZ(40px)" }}>
              <div className="ab-ring" />
            </div>

            {/* second photo */}
            <div className="ab-layer -bottom-8 right-0 w-[44%] sm:-right-8" style={{ transform: "translateZ(90px)" }}>
              <div className="ab-r" style={d(500)}>
                <div className="ab-bob">
                  <div className="relative aspect-square overflow-hidden rounded-[30px] border-[6px] border-white shadow-[0_30px_44px_-22px_rgba(13,43,62,.65)]">
                    <Image src="/images/10.webp" alt={second.alt} fill sizes="220px" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* glass chips */}
            <div className="ab-layer left-1 top-[22%] sm:-left-8" style={{ transform: "translateZ(120px)" }}>
              <div className="ab-r" style={d(700)}>
                <div className="ab-bob2 flex items-center gap-2.5 rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-[13px] font-extrabold text-ink shadow-[0_18px_30px_-16px_rgba(13,43,62,.5)] backdrop-blur-xl">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#BFE5C1] text-[#1F7A3A]"><Icon name="chk" size={16} stroke={2.8} /></span>
                  Attendance logged
                </div>
              </div>
            </div>
            <div className="ab-layer left-1 bottom-[16%] sm:-left-6" style={{ transform: "translateZ(100px)" }}>
              <div className="ab-r" style={d(900)}>
                <div className="ab-bob rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-[13px] font-extrabold text-ink shadow-[0_18px_30px_-16px_rgba(13,43,62,.5)] backdrop-blur-xl">
                  Daily report ready
                </div>
              </div>
            </div>

            {/* 3D cube */}
            <div className="ab-layer right-6 top-[38%] max-md:hidden" style={{ transform: "translateZ(140px)" }} aria-hidden="true">
              <div className="ab-r" style={d(600)}>
                <div className="ab-cube"><i /><i /><i /><i /><i /><i /></div>
              </div>
            </div>

            {/* rotating badge */}
            <div className="ab-layer right-0 -top-6 sm:-right-6" style={{ transform: "translateZ(110px)" }}>
              <div className="ab-r" style={d(300)}>
                <div className="relative grid h-28 w-28 place-items-center rounded-full bg-ink text-white shadow-[0_20px_36px_-16px_rgba(13,43,62,.7)]">
                  <svg viewBox="0 0 120 120" className="ab-spin absolute inset-0 h-full w-full" aria-hidden="true">
                    <defs><path id="ab-circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
                    <text fontSize="10.5" fontWeight="800" letterSpacing="2.2" fill="#F5E9B6">
                      <textPath href="#ab-circ">LAHORE • PAKISTAN • UAE • TECH TWIST •</textPath>
                    </text>
                  </svg>
                  <span className="relative text-lg font-extrabold text-leaf">TT</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- copy ---------- */}
        <div>
          <p className="eyebrow ab-r">ABOUT TECH TWIST GLOBAL</p>
          <h2 className="h2 ab-r" style={d(80)}>
            Technology that keeps your business <span className="text-chili">connected</span>
          </h2>
          <p className="lead ab-r mt-4 max-w-xl" style={d(160)}>
            Tech Twist Global is a technology solutions company based in Lahore. We help businesses in Pakistan and the UAE run on dependable software, modern monitoring and integrated security.
          </p>
          <p className="ab-r mt-4 max-w-xl text-base font-medium leading-relaxed text-muted" style={d(220)}>
            Sales, staff, attendance and camera views usually live in separate tools. We bring them into one organised system, so owners and managers can see what is happening and make decisions with clear records.
          </p>

          <ul className="mt-7 grid gap-3 sm:mt-10 sm:gap-5 sm:grid-cols-2" style={{ perspective: "1200px" }}>
            {pillars.map((p, i) => (
              <PillarCard key={p.title} p={p} icon={itSolutions[i % itSolutions.length].icon} delay={300 + i * 90} />
            ))}
          </ul>

          <div
            className="ab-r mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-[22px] border border-white/80 bg-white/60 px-5 py-4 sm:mt-9 sm:gap-x-10 sm:rounded-[28px] sm:px-7 sm:py-5 shadow-[0_26px_40px_-28px_rgba(13,43,62,.5)] backdrop-blur-xl"
            style={d(700)}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-t-stat font-extrabold leading-none text-ink"><Count to={s.to} run={seen} /></div>
                <div className="mt-1 text-[13px] font-bold text-ink/60">{s.label}</div>
              </div>
            ))}
            <a href="#contact" className="btn sm:ml-auto">Talk to our team</a>
          </div>
        </div>
      </div>
    </section>
  );
}