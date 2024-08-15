import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import MyNavBar from "@/components/navigation/MyNavBar";
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
    <html>
      <body
        className={
          (cn("min-h-screen w-full bg-background font-sans antialiased"),
          fontSans.variable)
        }
      >
        <MyNavBar />
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
