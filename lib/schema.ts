import { allFaqs, itSolutions, modules, site } from "./data";

const url = site.url;
const id = (hash: string) => `${url}/#${hash}`;
const phone = `+${String(site.phone).replace(/\D/g, "")}`;
const areaServed = [
  { "@type": "Country", name: "Pakistan" },
  { "@type": "Country", name: "United Arab Emirates" },
];
const title = "Restaurant Brain | Restaurant POS & CCTV Software, Pakistan";
const description =
  "Restaurant management software that connects POS, kitchen display, inventory, Face ID attendance and CCTV in one platform, by Tech Twist Global in Lahore. Serving Pakistan and the UAE.";

/**
 * One linked @graph: Organization, WebSite, WebPage, SoftwareApplication and FAQPage.
 * Only facts that are on the page are stated. No fake ratings, reviews or prices.
 * TODO (when you have them): add social profile links to Organization.sameAs, a street address, opening hours.
 */
export function buildSchema() {
  const organization = {
    "@type": "Organization",
    "@id": id("org"),
    name: site.company,
    alternateName: "Tech Twist",
    url,
    logo: { "@type": "ImageObject", url: `${url}/logo.png`, width: 300, height: 215 },
    email: site.email,
    telephone: phone,
    address: { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
    areaServed,
    knowsAbout: [
      "Restaurant management software", "POS and billing", "Kitchen display systems", "Inventory management",
      "Face ID attendance", "CCTV surveillance", "Workforce management", "Custom software",
    ],
    contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: site.email, telephone: phone, areaServed: ["PK", "AE"], availableLanguage: "English" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tech Twist IT solutions",
      itemListElement: itSolutions.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.text, provider: { "@id": id("org") }, areaServed },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": id("website"),
    url,
    name: site.name,
    description,
    inLanguage: "en",
    publisher: { "@id": id("org") },
  };

  const webpage = {
    "@type": "WebPage",
    "@id": id("webpage"),
    url,
    name: title,
    description,
    inLanguage: "en",
    dateModified: site.updated,
    isPartOf: { "@id": id("website") },
    about: { "@id": id("software") },
    primaryImageOfPage: { "@type": "ImageObject", url: `${url}/og-image.png`, width: 1200, height: 630 },
    // Tells voice assistants and answer engines which text is safe to read aloud / quote
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "[data-speakable]"] },
  };

  const software = {
    "@type": "SoftwareApplication",
    "@id": id("software"),
    name: site.name,
    url,
    description,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Restaurant management software",
    image: `${url}/og-image.png`,
    inLanguage: "en",
    author: { "@id": id("org") },
    publisher: { "@id": id("org") },
    areaServed,
    audience: { "@type": "BusinessAudience", name: "Restaurants, cafés, retail shops, clinics, salons, gyms, warehouses and offices" },
    featureList: [...modules.map((m) => m.title), "Face ID attendance"],
  };

  const faq = {
    "@type": "FAQPage",
    "@id": id("faq"),
    url: `${url}/#faq`,
    isPartOf: { "@id": id("webpage") },
    mainEntity: allFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return { "@context": "https://schema.org", "@graph": [organization, website, webpage, software, faq] };
}
