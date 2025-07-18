import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "teamupp",
  description: "Find Your Perfect Team, From Your College or City",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} dark`}>
      <SessionProvider>
        <body>
          <NextTopLoader />
          <Navbar />
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
