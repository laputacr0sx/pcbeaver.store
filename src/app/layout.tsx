import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import LandingPageFooter from "@/components/landingPage/layout/Footer";
import HeroHeader from "@/components/landingPage/layout/HeroHeader";
import { cn } from "@/lib/utils";
import ReactQueryClientProvider from "./QueryClientProvider";

export const metadata: Metadata = {
  title: "Computer Assemble",
  description: "Best Spot for Products",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
  ],
  // <link rel="manifest" href="/site.webmanifest">
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="bg-white dark:bg-zinc-900 lg:bg-zinc-100 dark:lg:bg-zinc-950">
      <body
        className={
          (cn("min-h-screen w-full font-sans antialiased"), fontSans.variable)
        }
      >
        <ReactQueryClientProvider>
          <HeroHeader />
          {children}
          <LandingPageFooter />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
