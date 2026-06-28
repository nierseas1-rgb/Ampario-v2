import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#16243f",
          50: "#f3f5f9",
          100: "#e2e7f0",
          200: "#c3cddf",
          300: "#9aabc8",
          400: "#6c83ac",
          500: "#4d6391",
          600: "#3c4e76",
          700: "#2f3d5e",
          800: "#1f2c49",
          900: "#16243f",
          950: "#0c1426",
        },
        gold: {
          DEFAULT: "#b8975a",
          50: "#faf7f0",
          100: "#f2ead6",
          200: "#e4d2ac",
          300: "#d4b67c",
          400: "#c5a05c",
          500: "#b8975a",
          600: "#a07c45",
          700: "#80613a",
          800: "#6a5034",
          900: "#5a442f",
        },
        cream: {
          DEFAULT: "#f5f2ea",
          50: "#fdfcf9",
          100: "#f5f2ea",
          200: "#ebe5d6",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 40px -12px rgba(22, 36, 63, 0.18)",
        "card-hover": "0 24px 60px -16px rgba(22, 36, 63, 0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "fade-in": "fade-in 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
