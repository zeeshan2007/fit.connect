import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0D0D0D",
          light: "#F8F9FA",
        },
        card: {
          DEFAULT: "#1A1A1A",
          light: "#FFFFFF",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          dark: "var(--color-accent-dark)",
        },
        textPrimary: {
          DEFAULT: "#F5F5F5",
          light: "#0D0D0D",
        },
        textSecondary: {
          DEFAULT: "#A0A0A0",
          light: "#6B7280",
        },
        border: {
          DEFAULT: "#2A2A2A",
          light: "#E5E7EB",
        },
      },
      fontFamily: {
        heading: ["var(--font-barlow)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        "display": ["4.5rem", { lineHeight: "1", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-sm": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "heading-1": ["2.25rem", { lineHeight: "1.1", letterSpacing: "0.02em", fontWeight: "700" }],
        "heading-2": ["1.875rem", { lineHeight: "1.15", letterSpacing: "0.02em", fontWeight: "600" }],
        "heading-3": ["1.5rem", { lineHeight: "1.2", letterSpacing: "0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
      boxShadow: {
        "card": "0 4px 24px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.4)",
        "card-light": "0 4px 24px rgba(0, 0, 0, 0.08)",
        "card-light-hover": "0 8px 40px rgba(0, 0, 0, 0.12)",
        "accent-glow": "0 0 30px rgba(198, 241, 53, 0.3)",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pop": "pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
