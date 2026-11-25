import Icon from "./Icon";
import VideoCarousel from "./VideoCarousel";
import { site } from "@/lib/data";

/* full label on tablets and up, short label on phones so all 4 fit in one row */
const chips = [
  { full: "POS and billing", short: "POS" },
  { full: "Kitchen and queue", short: "Kitchen" },
  { full: "AI attendance", short: "Attendance" },
  { full: "CCTV monitoring", short: "CCTV" },
];

export default function Hero() {
  return (
    <>
      {/* first video poster is the biggest image above the fold: fetch it right away */}
      <link rel="preload" as="image" href="/videos/posters/attendance.webp" fetchPriority="high" />
      <section id="platform" className="px-wrap relative overflow-hidden bg-[linear-gradient(135deg,#E8F5E7_0%,#CFE9D0_50%,#F7E7DA_100%)] py-7 sm:py-12 lg:py-20">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(13,43,62,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(13,43,62,.06)_1px,transparent_1px)] bg-[length:56px_56px] [mask-image:radial-gradient(ellipse_at_60%_50%,#000,transparent_78%)]" />
        <div className="relative grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          <div className="flex flex-col items-start gap-3.5 sm:gap-6">
            <span className="pill max-sm:!px-2.5 max-sm:!py-1.5 max-sm:!text-[11px]"><i className="h-2 w-2 shrink-0 rounded-full bg-[#1F7A3A]" />Restaurant management software by Tech Twist</span>

            {/* phones: max 2 lines (font scales with screen width) */}
            <h1 className="h1 max-sm:!text-[clamp(1.3rem,6.1vw,2.1rem)] max-sm:!leading-[1.12]">
              One smart <span className="text-chili">brain</span> for your whole restaurant.
            </h1>

            <p data-speakable className="max-w-[520px] text-[14px] font-semibold leading-relaxed text-muted sm:text-lg lg:text-[19px]">
              Restaurant Brain connects your POS, kitchen, inventory, staff attendance and CCTV in one platform, so you always know what is happening.
            </p>

            {/* both buttons always on one line */}
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-3">
              <a href="#contact" className="btn whitespace-nowrap max-sm:!gap-1.5 max-sm:!px-3 max-sm:!py-3 max-sm:!text-[13.5px] sm:!px-7 sm:!py-4">Book a demo <Icon name="arr" size={16} stroke={2.4} /></a>
              <a href="#modules" className="btn-ghost whitespace-nowrap max-sm:!px-3 max-sm:!py-[10px] max-sm:!text-[13.5px] sm:!py-3.5">Explore modules</a>
            </div>

            {/* 4 badges in one line on phones */}
            <ul className="grid w-full grid-cols-4 gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:gap-2.5">
              {chips.map((t) => (
                <li key={t.full} className="pill max-sm:min-w-0 max-sm:justify-center max-sm:!gap-0 max-sm:!px-1 max-sm:!py-1.5 max-sm:!text-[10.5px] max-sm:leading-none sm:!px-3 sm:!py-1.5 sm:!text-[13px]">
                  <Icon name="chk" size={15} stroke={2.6} className="text-[#1F7A3A] max-sm:hidden" />
                  <span className="max-sm:truncate sm:hidden">{t.short}</span>
                  <span className="hidden sm:inline">{t.full}</span>
                </li>
              ))}
            </ul>

            <p className="text-[12px] font-bold text-muted sm:text-sm"><span className="sm:hidden">Built in Lahore · Pakistan and UAE</span><span className="hidden sm:inline">Built in Lahore · Serving businesses in Pakistan and the UAE</span></p>
          </div>
          <VideoCarousel />
        </div>
        <span className="sr-only">{site.name}</span>
      </section>
    </>
  );
}
