import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        field: "#030504",
        panel: "#0B0D0C",
        card: "#111312",
        elevated: "#181B19",
        control: "#202422",
        line: "#242A27",
        "line-strong": "#343A37",
        "line-active": "#DDE8DC",
        signal: "#72F4D4",
        green: "#A6FF5F",
        solar: "#FF7A2F",
        blue: "#62A8FF",
        violet: "#9B7CFF",
        danger: "#FF4D64",
        pale: "#DDE8D8",
        ink: "#111512",
        mineral: {
          50: "#F2F5EF",
          100: "#DDE8DC",
          300: "#A7B0AA",
          500: "#68726B",
          700: "#454D48"
        }
      },
      fontFamily: {
        sans: ["Inter", "Geist", "Avenir Next", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
