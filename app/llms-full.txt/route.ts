import { allFaqs, itSolutions, modules, site, steps } from "@/lib/data";

// /llms-full.txt: the whole site as plain Markdown, so an AI assistant can read it in one request.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name} by ${site.company}

${site.name} is restaurant management software that connects POS and billing, kitchen display, inventory, Face ID staff attendance and CCTV monitoring in one platform, so owners always know what is happening. ${site.company} is a technology solutions company based in ${site.location}, serving businesses in Pakistan and the UAE.

Website: ${site.url}
Email: ${site.email}
Phone / WhatsApp: +${site.phone}
Location: ${site.location} (serving Pakistan and the UAE)

## Modules
${modules.map((m) => `### ${m.title}\n${m.text}`).join("\n\n")}

### Face ID attendance
Clock-ins verified at the door with Face ID, with late and overtime alerts and payroll-ready reports.

## ${site.company} IT solutions (beyond restaurants)
${itSolutions.map((s) => `### ${s.title}\n${s.text}`).join("\n\n")}

## How we work
${steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Frequently asked questions
${allFaqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
