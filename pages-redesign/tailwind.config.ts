
import type { Config } from "tailwindcss";

export default {
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // New OKLCH System 
        // Using CSS variables or direct OKLCH values where supported by PostCSS plugin
        // Fallback to HEX approximations if necessary, but Oklch is preferred for modern browsers

        // Red
        "red-50": "oklch(0.971 0.013 17.38)",
        "red-200": "oklch(0.885 0.062 18.334)",
        "red-500": "oklch(0.637 0.237 25.331)",
        "red-900": "oklch(0.396 0.141 25.723)",

        // Orange
        "orange-50": "oklch(0.98 0.016 73.684)",
        "orange-500": "oklch(0.705 0.213 47.604)",

        // Green / Emerald
        "green-100": "oklch(0.962 0.044 156.743)",
        "green-500": "oklch(0.723 0.219 149.579)",
        "emerald-500": "oklch(0.696 0.17 162.48)",

        // Blue
        "blue-50": "oklch(0.97 0.014 254.604)",
        "blue-100": "oklch(0.932 0.032 255.585)",
        "blue-500": "oklch(0.623 0.214 259.815)",
        "blue-700": "oklch(0.488 0.243 264.376)", // Royal Blue Equivalent

        // Purple
        "purple-50": "oklch(0.977 0.014 308.299)",
        "purple-500": "oklch(0.627 0.265 303.9)",

        // Gray / Neutral
        "gray-50": "oklch(0.985 0.002 247.839)",
        "gray-100": "oklch(0.967 0.003 264.542)",
        "gray-200": "oklch(0.928 0.006 264.531)",
        "gray-500": "oklch(0.551 0.027 264.364)",
        "gray-800": "oklch(0.278 0.033 256.848)",
        "gray-900": "oklch(0.21 0.034 264.665)",

        // Brand Colors from Figma
        brand: {
          DEFAULT: "#3973E1", // Primary Blue
          50: "#EBF1FC",
          100: "#D7E3F9",
          200: "#AFC7F3",
          300: "#87ABED",
          400: "#5F8FE7",
          500: "#3973E1",
          600: "#2D5CB4",
          700: "#224587",
          800: "#172E5A",
          900: "#0B172D",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        manrope: ['Manrope', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        "dm-sans": ['DM Sans', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
        "plus-jakarta-sans": ['"Plus Jakarta Sans"', 'sans-serif'],
        "poppins": ['Poppins', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        "source-serif-pro": ['"Source Serif Pro"', 'serif'],
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
        // Added for completeness from source
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
