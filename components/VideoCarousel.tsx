"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Tone = "lemon" | "aqua" | "white" | "chili";

type Slide = {
  video: string;
  title: string;
  sub: string;
  widgets: [Widget, Widget, Widget];
};
type Widget = { text: string; tone: Tone };

/* Edit copy and widgets here. Videos live in /public/videos */
const slides: Slide[] = [
  {
    video: "/videos/attendance.mp4",
    title: "Face ID attendance",
    sub: "Clock-ins verified at the door",
    widgets: [
      { text: "Face ID matched · 08:32", tone: "aqua" },
      { text: "Late 14 min · Waiter", tone: "lemon" },
      { text: "Marcus Chen clocked in", tone: "white" },
    ],
  },
  {
    video: "/videos/floor.mp4",
    title: "Dining floor watch",
    sub: "Every table in view",
    widgets: [
      { text: "Table 04 is calling", tone: "lemon" },
      { text: "Guest waiting 2 min at the door", tone: "white" },
      { text: "All 12 tables in view", tone: "aqua" },
    ],
  },
  {
    video: "/videos/kitchen.mp4",
    title: "Kitchen hygiene checks",
    sub: "Hairnets and gloves, spotted live",
    widgets: [
      { text: "No hairnet · Station 2", tone: "chili" },
      { text: "Alert sent to head chef", tone: "white" },
      { text: "6 of 7 staff compliant", tone: "aqua" },
    ],
  },
  {
    video: "/videos/till.mp4",
    title: "Till anomaly alerts",
    sub: "Odd voids and cash moves flagged",
    widgets: [
      { text: "Anomaly · Register 3", tone: "chili" },
      { text: "3 voids in 10 min", tone: "lemon" },
      { text: "Manager notified", tone: "white" },
    ],
  },
  {
    video: "/videos/pos.mp4",
    title: "POS and live stock",
    sub: "Billing that updates inventory",
    widgets: [
      { text: "Order sent to kitchen", tone: "aqua" },
      { text: "Truffle Burger · 99 left", tone: "lemon" },
      { text: "Bill paid · Table 07", tone: "white" },
    ],
  },
];

/* Poster = first frame of each video (small webp). It shows instantly, the video itself loads only when needed. */
const poster = (v: string) => v.replace("/videos/", "/videos/posters/").replace(".mp4", ".webp");

const toneCls: Record<Tone, string> = {
  lemon: "bg-lemon text-ink",
  aqua: "bg-aqua text-ink",
  white: "bg-white text-ink",
  chili: "bg-chili text-white",
};

/* Where each floating widget sits around the carousel */
const slots = [
  { cls: "right-[-1%] top-[3%] sm:right-[1%]", delay: "0s" },
  { cls: "left-[-1%] top-[41%] sm:left-[0%]", delay: "-3s" },
  { cls: "right-[1%] bottom-[9%] sm:right-[3%]", delay: "-5s" },
];

/* Deck layout: cards wait behind the front card (trailing to the right),
   the front card flies forward and fades, the next one rises from the back. */
function pose(d: number, exiting: boolean) {
  const base = "translate(-50%,-50%)";
  if (exiting)
    return { transform: `${base} translateX(-18%) translateZ(260px) rotateY(8deg) scale(1.04)`, blur: 5, opacity: 0, z: 12 };
  if (d === 0) return { transform: `${base} translateZ(0) scale(1)`, blur: 0, opacity: 1, z: 10 };
  if (d === 1) return { transform: `${base} translateX(28%) translateZ(-170px) rotateY(-10deg)`, blur: 2.5, opacity: 0.85, z: 9 };
  if (d === 2) return { transform: `${base} translateX(38%) translateZ(-340px) rotateY(-16deg)`, blur: 5, opacity: 0.45, z: 8 };
  return { transform: `${base} translateX(46%) translateZ(-520px) rotateY(-20deg)`, blur: 7, opacity: 0, z: 7 };
}

const N = slides.length;
const SWIPE_PX = 50;
const FALLBACK_MS = 10000;

export default function VideoCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [armed, setArmed] = useState(false); // videos start downloading only once the carousel is near the screen
  const [inView, setInView] = useState(true); // paused while off screen (saves CPU, battery and data)
  const [lite, setLite] = useState(false); // phones and slow networks: only the front video is downloaded
  const rootRef = useRef<HTMLDivElement>(null);

  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);

  const go = useCallback((i: number) => setActive(((i % N) + N) % N), []);
  const next = useCallback(() => setActive((a) => (a + 1) % N), []);
  const prev = useCallback(() => setActive((a) => (a - 1 + N) % N), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = !!conn && (!!conn.saveData || /^(slow-2g|2g|3g)$/.test(conn.effectiveType ?? ""));
    if (mq.matches || slow) setPlaying(false); // start paused, person can press play
    setLite(window.matchMedia("(max-width: 767px)").matches || slow);
  }, []);

  /* Start loading when near the viewport, pause when far away */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setArmed(true);
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Rewind everything when the active slide changes */
  useEffect(() => {
    videos.current.forEach((v) => {
      if (v) v.currentTime = 0;
    });
    bars.current.forEach((b) => {
      if (b) b.style.width = "0%";
    });
  }, [active]);

  /* Only the front card plays */
  useEffect(() => {
    videos.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && playing && inView && armed) v.play().catch(() => {});
      else v.pause();
    });
  }, [active, playing, inView, armed]);

  /* Safety net if a video fails to fire "ended" (autoplay blocked, slow network) */
  useEffect(() => {
    if (!playing || !inView) return;
    const id = window.setTimeout(next, FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [active, playing, inView, next]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    dragged.current = false;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > SWIPE_PX) {
      dragged.current = true;
      if (dx < 0) next();
      else prev();
    }
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const current = slides[active];

  return (
    <div ref={rootRef} className="mx-auto w-full max-w-[860px]">
      <style>{`
        @keyframes vc-pop{0%{opacity:0;transform:translateY(10px) scale(.92)}100%{opacity:1;transform:none}}
        .vc-pop{animation:vc-pop .55s cubic-bezier(.22,.8,.2,1) both}
        @media (prefers-reduced-motion:reduce){.vc-pop{animation:none}}
      `}</style>

      <div
        className="relative h-[clamp(250px,calc(52vw_+_80px),580px)]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Restaurant Brain in action"
      >
        {/* Floor rings, same language as the rest of the hero */}
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[92%] w-[92%] rounded-full border-2 border-dashed border-ink/25 [transform:translate(-50%,-44%)_rotateX(68deg)]" />
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[64%] w-[64%] rounded-full border-2 border-white/70 bg-white/20 [transform:translate(-50%,-44%)_rotateX(68deg)]" />
        <div aria-hidden className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,.8),transparent_65%)]" />
        <div aria-hidden className="absolute bottom-[7%] left-1/2 h-7 w-[56%] -translate-x-1/2 rounded-full bg-ink/25 blur-xl" />

        {/* 3D stage */}
        <div
          className="absolute inset-0 touch-pan-y select-none outline-none focus-visible:ring-4 focus-visible:ring-ink/40 rounded-[28px] [perspective:1500px]"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (startX.current = null)}
        >
          {slides.map((s, i) => {
            const d = (i - active + N) % N; // 0 = front, 1..2 = waiting behind, N-1 = just left the front
            const front = d === 0;
            const exiting = d === N - 1;
            const p = pose(d, exiting);
            const isNext = d === 1;
            const near = front || isNext || (!lite && exiting);
            return (
              <div
                key={s.video}
                role={front ? "group" : "button"}
                tabIndex={front ? -1 : 0}
                aria-label={front ? `${s.title}, slide ${i + 1} of ${N}` : `Show ${s.title}`}
                aria-hidden={exiting || d > 2 ? true : undefined}
                aria-current={front || undefined}
                onClick={() => {
                  if (!front && !dragged.current) go(i);
                }}
                onKeyDown={(e) => {
                  if (!front && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    go(i);
                  }
                }}
                className={`stage-card absolute left-1/2 top-1/2 aspect-video w-[min(88%,640px)] overflow-hidden rounded-[26px] border-[3px] border-white bg-ink ${
                  front ? "" : "cursor-pointer"
                }`}
                style={{
                  transform: p.transform,
                  filter: `blur(${p.blur}px)`,
                  opacity: p.opacity,
                  zIndex: p.z,
                  boxShadow: front
                    ? "0 40px 50px -26px rgba(13,43,62,.7), -12px 14px 0 -2px rgba(13,43,62,.12)"
                    : "0 24px 36px -22px rgba(13,43,62,.5)",
                  transition:
                    "transform .9s cubic-bezier(.22,.8,.2,1), filter .9s ease, opacity .7s ease, box-shadow .9s ease",
                  pointerEvents: d > 1 ? "none" : "auto",
                }}
              >
                <video
                  ref={(el) => {
                    videos.current[i] = el;
                  }}
                  src={armed && near ? s.video : undefined}
                  poster={poster(s.video)}
                  muted
                  playsInline
                  preload={playing && (front || (isNext && !lite)) ? "auto" : near ? "metadata" : "none"}
                  disablePictureInPicture
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  onEnded={() => {
                    if (front && playing) next();
                  }}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    const b = bars.current[i];
                    if (b && v.duration) b.style.width = `${(v.currentTime / v.duration) * 100}%`;
                  }}
                  draggable={false}
                />

                {/* Glass caption */}
                <div className="absolute inset-x-3 bottom-4 rounded-[16px] border border-white/45 bg-[linear-gradient(135deg,rgba(13,43,62,.35)_0%,rgba(13,43,62,.55)_55%,rgba(13,43,62,.72)_100%)] px-3.5 py-2.5 shadow-[0_10px_30px_-12px_rgba(13,43,62,.6),inset_0_1px_0_rgba(255,255,255,.55)] sm:inset-x-4 sm:bottom-5 sm:px-4 sm:py-3">
                  <p className="text-t-cap font-extrabold leading-tight tracking-tight text-white [text-shadow:0_1px_8px_rgba(13,43,62,.55)]">
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[12px] font-semibold leading-snug text-white/85 [text-shadow:0_1px_6px_rgba(13,43,62,.5)] sm:text-[13px]">{s.sub}</p>
                </div>

                <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white/25" aria-hidden>
                  <span
                    ref={(el) => {
                      bars.current[i] = el;
                    }}
                    className="block h-full w-0 bg-lemon"
                  />
                </span>
              </div>
            );
          })}
        </div>

        {/* Floating text widgets, they change with the front slide */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
          {slots.map((slot, k) => {
            const w = current.widgets[k];
            return (
              <div key={`${active}-${k}`} className={`vc-pop absolute ${slot.cls}`} style={{ animationDelay: `${k * 90}ms` }}>
                <div
                  className={`float rounded-[14px] px-3 py-2 text-[12px] font-extrabold shadow-[0_18px_28px_-14px_rgba(13,43,62,.55)] sm:px-3.5 sm:py-2.5 sm:text-[13px] ${toneCls[w.tone]}`}
                  style={{ animationDelay: slot.delay }}
                >
                  {w.text}
                </div>
              </div>
            );
          })}
        </div>
        <span className="absolute left-[1%] top-[-1%] z-20 text-xs font-bold text-muted">Illustrative footage</span>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <button type="button" onClick={prev} aria-label="Previous slide" className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-white/70 text-ink shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div className="flex items-center gap-2" role="group" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.video}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to ${s.title}`}
              aria-current={i === active || undefined}
              className={`h-2.5 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${i === active ? "w-7 bg-ink" : "w-2.5 bg-ink/30 hover:bg-ink/50"}`}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next slide" className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-white/70 text-ink shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
        </button>
        <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause carousel" : "Play carousel"} className="ml-1 grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-white/70 text-ink shadow-sm transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}