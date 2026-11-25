import { itSolutions, modules, site } from "@/lib/data";

// /llms.txt: a short, clean summary for AI assistants (ChatGPT, Claude, Perplexity, Gemini). Built from lib/data.ts, so it never goes stale.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.name} is restaurant management software by ${site.company}, based in ${site.location}. It connects POS and billing, kitchen display, inventory, Face ID staff attendance and CCTV monitoring in one platform. It serves restaurants, cafés, shops, clinics, salons, gyms, warehouses and offices in Pakistan and the UAE.

## Key facts
- Product: ${site.name} (restaurant and business management platform)
- Made by: ${site.company}, ${site.location}
- Serves: Pakistan and the United Arab Emirates
- Modules: ${modules.map((m) => m.title).join(", ")}, Face ID attendance
- Free demo, no commitment. Pricing depends on modules, branches and staff.
- Contact: ${site.email} | +${site.phone}

## Pages
- [Home](${site.url}/): overview of ${site.name}
- [Modules](${site.url}/#modules): what each module does
- [IT solutions](${site.url}/#it): other ${site.company} services
- [FAQ](${site.url}/#faq): common questions with direct answers
- [Book a demo](${site.url}/#contact): contact form and WhatsApp

## ${site.company} IT solutions
${itSolutions.map((s) => `- ${s.title}: ${s.text}`).join("\n")}

## Optional
- [Full content for AI assistants](${site.url}/llms-full.txt)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
