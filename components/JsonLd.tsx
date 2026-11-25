import { buildSchema } from "@/lib/schema";

// Structured data for Google, Bing and AI assistants (ChatGPT, Claude, Perplexity, Gemini).
// Server component: ships as plain JSON in the HTML, zero client JavaScript.
export default function JsonLd() {
  const json = JSON.stringify(buildSchema()).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
