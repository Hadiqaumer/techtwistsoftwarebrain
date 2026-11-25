/** @type {import('next').NextConfig} */
const longCache = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  compiler: { removeConsole: { exclude: ["error", "warn"] } },
  images: {
    // Sources are already WebP: WebP-only keeps the first visit fast (AVIF encoding is slow on a small server)
    formats: ["image/webp"],
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1600], // lean set: phones never get a desktop-sized file
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 2592000, // optimized images are reused for 30 days
  },
  async headers() {
    return [
      // static media: cached hard in the browser and on the CDN
      { source: "/images/:all*", headers: longCache },
      { source: "/module/:all*", headers: longCache },
      { source: "/videos/:all*", headers: longCache },
      { source: "/og-image.png", headers: longCache },
      // basic security headers on every page
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};
export default nextConfig;
