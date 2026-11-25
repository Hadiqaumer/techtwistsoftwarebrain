import type { IconName } from "@/components/Icon";

// Edit your details and all page content from this one file.
export const site = {
  name: "Restaurant Brain",
  company: "Tech Twist Global",
  email: "admin@techtwistglobal.com",
  website: "www.techtwistglobal.com",
  location: "312 3rd Floor, Gullberg Main Boulevard, Lahore, Pakistan",
  phone: "923123308055", // international digits for 03123308055 (used for tel: links and structured data)
  phoneLocal: "0312 3308055", // what visitors see
  // WhatsApp number, digits only (country code + number). Same as phone until you set a different one.
  whatsapp: "923123308055",
  // Public address of the site. Set NEXT_PUBLIC_SITE_URL in your host (Vercel etc.) to your real domain.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.techtwistglobal.com").replace(/\/$/, ""),
  // Update when you change page content (used in sitemap and structured data).
  updated: "2026-11-25",
};

export const waLink = (text = "Hi! I would like a demo of Restaurant Brain.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const tints = [
  { bg: "bg-leaf", fg: "text-[#1F7A3A]" },
  { bg: "bg-lemon", fg: "text-[#7A6A00]" },
  { bg: "bg-aqua", fg: "text-[#176A78]" },
  { bg: "bg-pepper", fg: "text-[#A8322A]" },
];

export const photos = {
  pos: { src: "/images/pos.webp", alt: "Restaurant POS touchscreen" },
  orders: { src: "/images/orders.webp", alt: "Tablet order taking in a restaurant" },
  roster: { src: "/images/roster.webp", alt: "Live shift roster on a large screen" },
  cctv: { src: "/images/cctv.webp", alt: "CCTV monitoring wall" },
  inventory: { src: "/images/inventory.webp", alt: "Inventory scanning and stock software" },
  waiter: { src: "/images/waiter.webp", alt: "Waiter call button and wrist pager" },
  access: { src: "/images/access.webp", alt: "Fingerprint attendance and access device" },
  menu: { src: "/images/menu.webp", alt: "Guest browsing a digital menu on a tablet" },
  faceid: { src: "/images/faceid.webp", alt: "Face check-in with a camera at the office entrance" },
  retail: { src: "/images/retail.webp", alt: "Retail store checkout screen" },
  corporate: { src: "/images/corporate.webp", alt: "Reception area with a visitor management screen" },
   module1: { src: "/module/m1.webp", alt: "Face ID staff attendance terminal at a restaurant entrance" },
  module2: { src: "/module/m2.webp", alt: "Restaurant POS billing screen with table orders" },
  module3: { src: "/module/511.webp", alt: "Kitchen display screen showing live order tickets" },
  module5: { src: "/module/t.webp", alt: "CCTV camera monitoring for a restaurant counter and kitchen" },
   module6: { src: "/module/2.webp", alt: "Queue management token screen for waiting customers" },
   module7: { src: "/module/3.webp", alt: "Waiter calling button placed on a restaurant table" },
    module8: { src: "/module/9.webp", alt: "Barcode labels and scanner for stock and checkout" },
     module9: { src: "/module/21.webp", alt: "Access-controlled security door for a kitchen or store room" },
  barcode: { src: "/images/barcode.webp", alt: "Barcode scanning on a tablet" },
} as const;
export type PhotoKey = keyof typeof photos;

export const heroCards: { photo: PhotoKey; icon: IconName; title: string; sub: string; tint: number; cls: string; rot: string }[] = [
  { photo: "pos", icon: "pos", title: "POS and billing", sub: "Table 07 · open", tint: 0, cls: "left-[-1%] top-[3%]", rot: "rotateY(14deg) rotateX(5deg)" },
  { photo: "orders", icon: "hat", title: "Kitchen and orders", sub: "6 orders in queue", tint: 1, cls: "right-[-1%] top-[9%]", rot: "rotateY(-14deg) rotateX(5deg)" },
  { photo: "roster", icon: "usr", title: "Live shift roster", sub: "3 on shift", tint: 2, cls: "left-[-3%] bottom-[11%]", rot: "rotateY(14deg) rotateX(-4deg)" },
  { photo: "cctv", icon: "mon", title: "CCTV monitoring", sub: "4 cameras live", tint: 3, cls: "right-[-3%] bottom-[9%]", rot: "rotateY(-14deg) rotateX(-4deg)" },
  { photo: "inventory", icon: "box", title: "Inventory", sub: "Low stock alert", tint: 0, cls: "left-[33%] bottom-[-5%]", rot: "rotateX(-6deg)" },
];

export const modules: { icon: IconName; title: string; text: string; photo: PhotoKey }[] = [
  { icon: "pos", title: "POS and billing", text: "Fast billing, table orders, split bills and daily sales reports.", photo: "module2" },
  { icon: "hat", title: "Kitchen display", text: "Orders flow from the counter to the pass with no paper tickets.", photo: "module3" },
  { icon: "box", title: "Inventory", text: "Track stock, wastage and purchasing down to each ingredient.", photo: "inventory" },
  { icon: "mon", title: "CCTV monitoring", text: "Live view and saved footage for your counter, kitchen and doors.", photo: "module5" },
  { icon: "que", title: "Queue management", text: "Token and queue screens that keep waiting guests informed.", photo: "module6" },
  { icon: "bell", title: "Waiter calling", text: "One-tap table call buttons that alert your floor team.", photo: "module7" },
  { icon: "bar", title: "Barcode system", text: "Labels and scanners for stock, billing and checkout.", photo: "module8" },
  { icon: "door", title: "Security doors", text: "Access-controlled doors for kitchens, stores and staff areas.", photo: "module9" },
];

export const wall: { photo: PhotoKey; label: string }[] = [
  { photo: "waiter", label: "Waiter calling" }, { photo: "orders", label: "Order taking" }, { photo: "pos", label: "POS and billing" },
  { photo: "roster", label: "Live shift roster" }, { photo: "cctv", label: "CCTV monitoring" },
];

export const roster = [
  { init: "HC", role: "Head chef", where: "Kitchen · 09:02", status: "On time", tone: "ok", bg: "bg-leaf" },
  { init: "WT", role: "Waiter", where: "Floor · 09:14", status: "Late 14 min", tone: "late", bg: "bg-lemon" },
  { init: "CS", role: "Cashier", where: "Counter · 09:00", status: "On time", tone: "ok", bg: "bg-aqua" },
] as const;

export const pairs = [
  ["Manual, disconnected processes", "One connected platform for daily operations"],
  ["Limited view of your outlets", "CCTV monitoring for counter, kitchen and doors"],
  ["Untidy attendance records", "Digital attendance with shifts and working hours"],
  ["Scattered operational data", "Central dashboards and reports"],
  ["Hard to watch several branches", "Multi-location monitoring where supported"],
  ["Little information for managers", "Organized records and management reports"],
] as const;

export const itSolutions: { icon: IconName; title: string; text: string }[] = [
  { icon: "doc", title: "Business management software", text: "Manage records, workflows, sales and daily operations from one central platform." },
  { icon: "code", title: "Custom software", text: "Digital solutions built around your own processes, forms and reports." },
  { icon: "cam", title: "CCTV surveillance and security", text: "Camera planning, installation and remote viewing, with saved footage." },
  { icon: "usr", title: "Smart attendance monitoring", text: "Digital attendance, shifts and working hours, with summaries for managers." },
  { icon: "team", title: "Workforce management", text: "Staff profiles, duty rosters and access permissions by role." },
  { icon: "chart", title: "Dashboards and reporting", text: "Central monitoring and management reports for better decisions." },
];

export const industries: { photo: PhotoKey; label: string }[] = [
  { photo: "menu", label: "Restaurants and cafés" }, { photo: "retail", label: "Retail stores" },
  { photo: "corporate", label: "Corporate offices" }, { photo: "barcode", label: "Warehouses" },
];

export const steps = [
  "Business consultation", "Site and needs review", "Solution demo",
  "Installation and setup", "Training and handover", "Ongoing support",
];

// SAMPLE TEXT: replace with real client testimonials before launch.
export const testimonials = [
  { quote: "Billing is faster and our end-of-day report is ready without manual work.", name: "[Client name]", role: "[Owner, Restaurant]" },
  { quote: "We can check every branch from one screen, and the setup team was neat and on time.", name: "[Client name]", role: "[Manager, Café chain]" },
  { quote: "Shift attendance is automatic now, so payroll no longer needs hours of checking.", name: "[Client name]", role: "[Operations, Food business]" },
];

export type TopicId = "basics" | "setup" | "branches" | "pricing";
export type FaqItem = { q: string; a: string; topic: TopicId };

// Every question is unique (no duplicates). Answers are written to stand alone, so search engines and
// AI assistants can quote them without the rest of the page. Edit freely, keep the facts true.
export const allFaqs: FaqItem[] = [
  { topic: "basics", q: "What is Restaurant Brain?", a: "Restaurant Brain is restaurant management software by Tech Twist Global that connects POS and billing, kitchen display, inventory, staff attendance and CCTV monitoring in one platform." },
  { topic: "basics", q: "What is a restaurant management system?", a: "A restaurant management system is software that brings daily restaurant work into one place: taking orders and billing (POS), sending orders to the kitchen, tracking stock, recording staff attendance and reviewing reports. Restaurant Brain also adds CCTV monitoring, so owners can see sales and the floor together." },
  { topic: "basics", q: "Who makes Restaurant Brain?", a: "Restaurant Brain is made by Tech Twist Global, a technology solutions company in Lahore, Pakistan, which also builds business software, CCTV security systems and attendance monitoring." },
  { topic: "basics", q: "What does Restaurant Brain include?", a: "Modules include POS and billing, kitchen display, inventory, Face ID attendance, CCTV monitoring, queue management, waiter calling, a barcode system and security doors. You switch on only the modules your business needs." },
  { topic: "basics", q: "Where do you work?", a: "We are based in Lahore, Pakistan, and serve restaurants, cafés and other businesses in Pakistan and the UAE." },
  { topic: "basics", q: "Does it work for businesses other than restaurants?", a: "Yes. Attendance, POS, stock, cameras and reports work just as well for shops, clinics, salons, gyms, warehouses and offices. You switch on only the modules your business needs." },
  { topic: "basics", q: "Do you offer other IT solutions?", a: "Yes. Tech Twist also provides business management software, custom software, CCTV security, attendance monitoring, workforce management and reporting dashboards." },
  { topic: "basics", q: "Can I start with just one module?", a: "Absolutely. Many teams start with one, such as Face ID attendance or POS, and add more later. Everything shares the same data, so nothing has to be set up twice." },
  { topic: "setup", q: "Do you install the system and train my staff?", a: "Yes. Our process covers site review, installation and setup, staff training and handover, and ongoing support. You can also reach us on WhatsApp whenever you need help." },
  { topic: "setup", q: "Do I need special hardware?", a: "Face ID and AI camera features need compatible cameras. During your demo we check what you already have, so you only buy what is really needed." },
  { topic: "setup", q: "How long does setup take?", a: "It depends on the modules you choose and how many branches you have. Simple setups go live quickly, and we confirm a clear timeline with you during the demo." },
  { topic: "setup", q: "Will it work with the software I already use?", a: "Tell us what you use today and we will say what can connect and what we can replace. We check this together during the demo." },
  { topic: "branches", q: "Can I manage more than one branch?", a: "Yes. Every branch reports into one dashboard, so you can compare sales, attendance and alerts without calling anyone. Multi-location monitoring is available where your setup supports it." },
  { topic: "branches", q: "Who can see my data?", a: "Access is role based, so owners, managers and staff only see what you allow. We walk you through how data is handled and stored during your demo." },
  { topic: "pricing", q: "How much does it cost?", a: "Pricing depends on the modules, branches and staff you need. Message us on WhatsApp or book a demo and we will send a clear quote." },
  { topic: "pricing", q: "Can I try it before I commit?", a: "Yes. The demo is free and there is no commitment. You see it working for your kind of business first, then decide." },
  { topic: "pricing", q: "How do I book a demo?", a: `Use the Book a demo button, message us on WhatsApp, or email ${site.email}, and we will arrange a consultation.` },
];
