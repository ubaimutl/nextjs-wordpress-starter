import { Lora, Manrope } from "next/font/google";

import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const headlineFont = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Next.js WordPress Starter",
    template: "%s | Next.js WordPress Starter",
  },
  description:
    "Modern Next.js 16 App Router starter template for WordPress REST API projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headlineFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
