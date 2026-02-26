import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F5F0",
        cream: "#EDE8E0",
        "cream-dark": "#D9D2C7",
        charcoal: "#1C1C1E",
        "charcoal-light": "#2C2C2E",
        "warm-gray": "#6B6560",
        "warm-gray-light": "#9B9490",
        gold: "#C9A96E",
        "gold-light": "#E2C99B",
        "gold-dark": "#A8844A",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 9rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 6.5rem)", { lineHeight: "1", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2rem, 4vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "body-lg": ["clamp(1rem, 1.5vw, 1.2rem)", { lineHeight: "1.7" }],
        "body-md": ["clamp(0.9rem, 1.2vw, 1.05rem)", { lineHeight: "1.7" }],
      },
      spacing: {
        "section": "clamp(5rem, 12vw, 10rem)",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
      },
      backgroundImage: {
        "grain": "url('/images/grain.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-ivory": "linear-gradient(180deg, #F7F5F0 0%, #EDE8E0 100%)",
        "gradient-charcoal": "linear-gradient(180deg, #1C1C1E 0%, #2C2C2E 100%)",
        "gradient-gold": "linear-gradient(135deg, #C9A96E 0%, #E2C99B 50%, #C9A96E 100%)",
      },
      boxShadow: {
        "luxury": "0 4px 30px rgba(28, 28, 30, 0.06), 0 1px 8px rgba(28, 28, 30, 0.04)",
        "luxury-hover": "0 16px 60px rgba(28, 28, 30, 0.12), 0 4px 16px rgba(28, 28, 30, 0.08)",
        "gold": "0 4px 24px rgba(201, 169, 110, 0.2)",
        "card": "0 1px 3px rgba(28, 28, 30, 0.04), 0 8px 32px rgba(28, 28, 30, 0.06)",
        "card-hover": "0 8px 48px rgba(28, 28, 30, 0.14), 0 2px 12px rgba(28, 28, 30, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-left": "slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
};

export default config;
