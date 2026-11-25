import Image from "next/image";
import { site, waLink } from "@/lib/data";
import { MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./ContactIcons";

const h = "mb-4 text-[13px] font-extrabold uppercase tracking-[.14em] text-chili";
const l = "flex flex-col gap-3 text-[15px] font-semibold text-muted";
const link = "transition hover:text-chili focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-chili rounded";

const modules = ["POS and billing", "Kitchen display", "Inventory", "AI attendance", "CCTV monitoring"];
const company = [["Platform", "platform"], ["IT solutions", "it"], ["Process", "process"], ["FAQ", "faq"], ["Contact", "contact"]];

export default function Footer() {
  return (
    <footer className="px-wrap border-t border-ink/10 bg-[linear-gradient(rgba(255,255,255,.55),rgba(255,255,255,.55)),linear-gradient(135deg,#E8F5E7,#CFE9D0_50%,#F7E7DA)] pt-16 text-ink">
      <div className="grid gap-8 sm:gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-14">
        <div>
          <a href="#top" className="inline-flex items-center gap-3.5" aria-label={`${site.name}, back to top`}>
            <Image src="/images/logo.webp" alt={`${site.company} logo`} width={84} height={60} loading="lazy" className="h-[60px] w-auto" />
            <span className="flex flex-col leading-tight">
              <b className="text-xl font-extrabold">{site.name}</b>
              <small className="text-xs font-bold tracking-wide text-muted">by {site.company}</small>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-[15px] font-semibold leading-relaxed text-muted">
            Smart restaurant software and IT solutions from Lahore, serving businesses in Pakistan and the UAE.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className="btn !py-3 !text-sm">Book a demo</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-extrabold text-ink transition hover:brightness-105">
              <WhatsAppIcon size={17} />WhatsApp
            </a>
          </div>
        </div>

        <nav aria-label="Modules">
          <p className={h}>Modules</p>
          <ul className={l}>{modules.map((t) => <li key={t}><a href="#modules" className={link}>{t}</a></li>)}</ul>
        </nav>

        <nav aria-label="Company">
          <p className={h}>Company</p>
          <ul className={l}>{company.map(([t, id]) => <li key={id}><a href={`#${id}`} className={link}>{t}</a></li>)}</ul>
        </nav>

        <div>
          <p className={h}>Contact</p>
          <address className="flex flex-col gap-4 text-[15px] font-semibold not-italic text-muted">
            <a href={`tel:+${site.phone}`} className={`flex items-center gap-3 ${link}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-leaf text-[#1F7A3A]"><PhoneIcon size={16} /></span>
              {site.phoneLocal}
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${link}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"><WhatsAppIcon size={17} /></span>
              Chat on WhatsApp
            </a>
            <a href={`mailto:${site.email}`} className={`flex items-center gap-3 break-all ${link}`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-aqua text-[#176A78]"><MailIcon size={16} /></span>
              {site.email}
            </a>
            <p className="flex items-center gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lemon text-[#7A6A00]"><PinIcon size={16} /></span>
              {site.location}
              <span className="sr-only">, serving Pakistan and the UAE</span>
            </p>
          </address>
        </div>
      </div>

      <div className="mt-8 sm:mt-14 flex flex-col items-center justify-between gap-3 border-t border-ink/10 py-6 text-sm font-semibold text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {site.company}. All rights reserved.</p>
        <a href="#top" className={link}>Back to top ↑</a>
      </div>
    </footer>
  );
}
