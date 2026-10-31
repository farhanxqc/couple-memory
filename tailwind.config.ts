import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F1E8",
        ink: "#2A211C",
        clay: "#9A5A43",
        sand: "#E8DCCB",
        olive: "#6F725E",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 60px -32px rgba(42, 33, 28, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
