"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site, waLink } from "@/lib/data";
import { PhoneIcon, WhatsAppIcon } from "./ContactIcons";

const links = [
  ["Platform", "platform"], ["Modules", "modules"], ["Control center", "control"],
  ["IT solutions", "it"], ["Process", "process"], ["FAQ", "faq"],
] as const;

const tel = `tel:+${site.phone}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("platform");

  useEffect(() => {
    const els = links.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { io.disconnect(); window.removeEventListener("keydown", onKey); };
  }, []);

  const item = (id: string) =>
    `rounded-full px-3.5 py-2 text-[15px] font-bold transition ${active === id ? "bg-ground text-ink" : "text-ink/80 hover:bg-ground/70 hover:text-ink"}`;

  return (
    <header className="px-wrap sticky top-0 z-50 pt-3">
      <nav aria-label="Main" className="rounded-[28px] border border-white bg-white/90 px-3 py-2 shadow-[0_14px_30px_-18px_rgba(13,43,62,.4)] backdrop-blur-md lg:rounded-full lg:pl-4 lg:pr-2.5">
        <div className="flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-3" aria-label={`${site.name} by ${site.company}, home`}>
            <Image src="/images/logo.webp" alt={`${site.company} logo`} width={59} height={42} priority className="h-9 w-auto sm:h-[42px]" />
            <span className="flex flex-col leading-tight">
              <b className="whitespace-nowrap text-[clamp(.94rem,.86rem+.55vw,1.19rem)] font-extrabold text-ink">{site.name}</b>
              <small className="whitespace-nowrap text-[10px] font-bold tracking-wide text-muted sm:text-[11px]">by {site.company}</small>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {links.map(([t, id]) => (
              <li key={id}><a href={`#${id}`} aria-current={active === id ? "true" : undefined} className={item(id)}>{t}</a></li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={tel} className="hidden items-center gap-2 rounded-full px-3 py-2 text-[15px] font-extrabold text-ink transition hover:bg-ground/70 xl:inline-flex" aria-label={`Call ${site.phoneLocal}`}>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-leaf text-[#1F7A3A]"><PhoneIcon size={16} /></span>
              {site.phoneLocal}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="grid h-11 w-11 place-items-center rounded-full bg-[#25D366] text-white transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink motion-safe:hover:-translate-y-0.5">
              <WhatsAppIcon size={22} />
            </a>
            <a href="#contact" className="btn hidden lg:inline-flex">Book a demo</a>
            <button type="button" aria-label="Menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-ground text-ink lg:hidden">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="mt-3 border-t border-ink/10 pb-2 pt-4 lg:hidden">
            <ul className="grid grid-cols-2 gap-2">
              {links.map(([t, id]) => (
                <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className={`block text-center ${item(id)}`}>{t}</a></li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={tel} className="btn-ghost !gap-2 !px-3"><PhoneIcon size={17} />Call</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-3 py-3 text-[15px] font-extrabold text-ink"><WhatsAppIcon size={18} />WhatsApp</a>
            </div>
            <a href="#contact" onClick={() => setOpen(false)} className="btn mt-2 w-full">Book a demo</a>
          </div>
        )}
      </nav>
    </header>
  );
}
