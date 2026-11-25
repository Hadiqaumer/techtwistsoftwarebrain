import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

// Search engines AND AI answer engines are welcome (that is what AEO / GEO needs).
// To opt out of AI model training only, remove the training crawlers (GPTBot, Google-Extended, Applebot-Extended, anthropic-ai).
const aiCrawlers = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "Applebot-Extended", "Amazonbot", "DuckAssistBot", "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: aiCrawlers, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
