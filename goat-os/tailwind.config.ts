import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        field: "#0b0f10",
        panel: "#11181a",
        line: "#263335",
        signal: "#48f5a9",
        amber: "#f5bd48",
        danger: "#ff5c77"
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
