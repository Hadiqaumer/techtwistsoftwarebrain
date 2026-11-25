# Restaurant Brain website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + a Node.js API route. Light Emerald Chili palette, Plus Jakarta Sans (variable font).

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

- All text and photos are edited in `lib/data.ts`. Photos live in `public/images/` (replace files, keep names, or change the paths).
- Colors are in `tailwind.config.ts`. Chili red is used only for highlight words and buttons.
- Content width is capped at 1350px (`.section` / `.px-wrap` in `app/globals.css`).
- The contact form posts to `app/api/contact/route.ts`: connect it to email or a CRM where marked TODO.
- Testimonials are sample text: replace them with real ones before launch.

## GitHub

    git init -b main
    git add .
    git commit -m "Initial commit: Restaurant Brain website"
    git remote add origin https://github.com/<your-username>/restaurant-brain-web.git
    git push -u origin main

CI (type-check + build) runs on every push and pull request. Run `npm install` once and commit `package-lock.json` (CI uses `npm ci`).


## Before you deploy (important)

1. Set your real domain: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` (also add it in Vercel/your host). It drives the canonical URL, sitemap, robots.txt, structured data and llms.txt.
2. WhatsApp number is `site.whatsapp` in `lib/data.ts` (currently the same as `site.phone`). Change it there if your WhatsApp number is different.
3. Replace the sample testimonials before you turn `<Testimonials />` back on.

## Speed

- Videos are 960x540, no audio track, `faststart` (about 2.4 MB total, was 9.8 MB). Each video has a small poster image in `public/videos/posters/`.
- A video downloads only when its carousel is near the screen, only the front card and the next one load, and videos pause when off screen or when Data Saver is on.
- One variable font file instead of three. No backdrop blur over playing video. Heavy animated blur layers replaced with gradients.
- Replacing a video? Keep the same name, then regenerate its poster:
  `ffmpeg -ss 0.05 -i NAME.mp4 -frames:v 1 -vf scale=640:-2 -c:v libwebp -quality 72 posters/NAME.webp`

## SEO, AEO, GEO and AI search

- `app/layout.tsx`: title, description, canonical, Open Graph, Twitter card, robots, Lahore / Pakistan geo tags.
- `lib/schema.ts` + `components/JsonLd.tsx`: Organization, WebSite, WebPage, SoftwareApplication and FAQPage structured data (FAQs come from `allFaqs` in `lib/data.ts`, so page and schema always match).
- `app/robots.ts`: search engines and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and more) allowed. `app/sitemap.ts` lists the page.
- `/llms.txt` and `/llms-full.txt`: built from `lib/data.ts` for AI assistants.
- `public/og-image.png`: 1200x630 share image.
- Add social profile links to `Organization.sameAs` in `lib/schema.ts` when you have them.
