import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
        ],
      },
      colors: {
        primary: "#F97316",
        secondary: "#111827",
        "secondary-text": "#6B7280",
        border: "#E5E7EB",
        surface: "#F9FAFB",
      },
      fontSize: {
        xs: ["12px", "18px"],
        sm: ["14px", "22px"],
        md: ["16px", "24px"],

        "h-sm": ["18px", "26px"],
        "h-md": ["20px", "28px"],
        "h-lg": ["24px", "32px"],
        "h-xl": ["32px", "40px"],
      },
    },
  },
  plugins: [],
};

export default config;
