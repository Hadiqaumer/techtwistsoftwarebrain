import type { Config } from "tailwindcss";

// Emerald Chili palette (lightened). ink = text only, deep/deep2 = big dark panels. Chili is only for highlight words and buttons (red reads as "error" in software).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"], // lib/data.ts holds tint classes too
  theme: {
    extend: {
      colors: {
        ink: "#0D2B3E", deep: "#1E4A63", deep2: "#2B5E7A", muted: "#35505F", chili: "#C0332A",
        ground: "#E8F5E7", ground2: "#CFE9D0", peach: "#F7E7DA", mist: "#F0F9EF",
        leaf: "#BFE5C1", pepper: "#F6C5BD", lemon: "#F5E9B6", aqua: "#B8E1E7",
      },
      fontFamily: { sans: ["var(--font-jakarta)", "sans-serif"] },
      // Fluid type scale: every heading grows smoothly from 320px phones to wide desktops (no jumps, no overflow)
      fontSize: {
        "t-cap": "clamp(1rem, .92rem + .4vw, 1.25rem)",
        "t-h4": "clamp(1.0625rem, 1rem + .3vw, 1.25rem)",
        "t-h3": "clamp(1.125rem, 1.02rem + .45vw, 1.375rem)",
        "t-h3-lg": "clamp(1.3rem, 1.12rem + .8vw, 1.65rem)",
        "t-feat": "clamp(1.45rem, 1.15rem + 1.2vw, 2rem)",
        "t-stat": "clamp(2rem, 1.6rem + 1.6vw, 2.5rem)",
        "t-num": "clamp(3rem, 2.4rem + 2.2vw, 4rem)",
        "t-cta": "clamp(2rem, 1.2rem + 3.6vw, 3.7rem)",
      },
    },
  },
  plugins: [],
};
export default config;
