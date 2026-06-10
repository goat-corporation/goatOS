import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "goatOS",
  description: "Transparent AI-agent operating system for Solana memecoin markets."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
