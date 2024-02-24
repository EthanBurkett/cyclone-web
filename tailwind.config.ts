import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#F8D57E",
        secondary: "#BFAFF2",
        "main-dark": "#2B2B2B",
        main: "#333333",
        brand: {
          100: "#E9E3FF",
          200: "#9e86ff",
          300: "#422AFB",
          400: "#7551FF",
          500: "#422AFB",
          600: "#3311DB",
          700: "#02044A",
          800: "#190793",
          900: "#11047A",
        },
        brandAlpha: {
          500: "#7451ff9c",
          100: "#7451ff2d",
        },
        secondaryGray: {
          100: "#E0E5F2",
          200: "#E1E9F8",
          300: "#F4F7FE",
          400: "#E9EDF7",
          500: "#8F9BBA",
          600: "#A3AED0",
          700: "#707EAE",
          800: "#707EAE",
          900: "#1B2559",
        },
        red: {
          500: "#EE5D50",
          600: "#E31A1A",
        },
        blue: {
          50: "#EFF4FB",
          500: "#3965FF",
        },
        orange: {
          100: "#FFF6DA",
          500: "#FFB547",
        },
        green: {
          100: "#E6FAF5",
          500: "#01B574",
        },
        navy: {
          50: "#d0dcfb",
          100: "#aac0fe",
          200: "#a3b9f8",
          300: "#728fea",
          400: "#3652ba",
          500: "#2f4bba",
          600: "#232c4f",
          700: "#1d2343",
          800: "#080e2c",
          900: "#08081c",
        },
        gray: {
          100: "#FAFCFE",
        },
        textSecondary: "secondaryGray-400",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
