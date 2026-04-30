import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          surface: "#111111",
          elevated: "#161616",
          raised: "#1C1C1C",
        },
        border: {
          DEFAULT: "#1F1F1F",
          strong: "#2A2A2A",
          accent: "#00D56340",
        },
        accent: {
          DEFAULT: "#00D563",
          hover: "#00F070",
          muted: "#00D56320",
          glow: "#00D56340",
        },
        premium: {
          DEFAULT: "#FFD700",
          muted: "#FFD70020",
        },
        live: {
          DEFAULT: "#FF3B3B",
          glow: "#FF3B3B40",
        },
        warning: "#F5A623",
        info: "#3B82F6",
        text: {
          primary: "#FAFAFA",
          secondary: "#A1A1A1",
          muted: "#525252",
          disabled: "#3A3A3A",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontFeatureSettings: {
        tnum: '"tnum"',
      },
      borderRadius: {
        xl: "12px",
        lg: "8px",
      },
      maxWidth: {
        container: "80rem",
      },
      keyframes: {
        "live-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "live-pulse": "live-pulse 1.5s ease-in-out infinite",
        "fade-in": "fade-in 200ms ease-out",
        shimmer: "shimmer 1.6s linear infinite",
      },
      transitionTimingFunction: {
        "out-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
