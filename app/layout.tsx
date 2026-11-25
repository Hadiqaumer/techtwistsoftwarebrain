import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "@/components/living-cards.css";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/data";

// Self-hosted variable font (one woff2 file covers weights 200-800). No request to Google Fonts, so it loads fast
// everywhere, including in Pakistan where fonts.googleapis.com can be slow or blocked.
const jakarta = localFont({
  src: "./fonts/PlusJakartaSans.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const title = "Restaurant Brain | Restaurant POS & CCTV Software, Pakistan";
const description =
  "Restaurant management software that connects POS, kitchen display, inventory, Face ID attendance and CCTV in one platform. By Tech Twist Global, Lahore. Serving Pakistan and the UAE.";
const ogImage = { url: "/og-image.png", width: 1200, height: 630, alt: "Restaurant Brain: one smart brain for your whole restaurant" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Restaurant Brain" },
  description,
  applicationName: site.name,
  keywords: [
    "restaurant management software", "restaurant POS Pakistan", "POS software Lahore", "kitchen display system",
    "restaurant inventory software", "Face ID attendance system", "CCTV monitoring for restaurants",
    "restaurant software UAE", "Tech Twist Global", "Restaurant Brain",
  ],
  authors: [{ name: site.company, url: site.url }],
  creator: site.company,
  publisher: site.company,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: site.name, title, description, locale: "en_PK", images: [ogImage] },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Local signals for Lahore, Punjab, Pakistan
  other: { "geo.region": "PK-PB", "geo.placename": "Lahore", "geo.country": "PK" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#E8F5E7", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-extrabold focus:text-white"
        >
          Skip to content
        </a>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
