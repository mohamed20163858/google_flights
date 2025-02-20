import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"],
  subsets: ["latin"],
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Google Flights Clone",
  description: "A simplified version of Google Flights built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased text-[10px] leading-[14px] sm:text-[14px] sm:leading-[20px] text-[#70757a] dark:bg-gray-900 dark:text-white`}
      >
        <ThemeProvider attribute="class">
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
