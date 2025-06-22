import type { Metadata } from "next";
import "./globals.css";
import { Sarabun } from "next/font/google";
import { Pinyon_Script } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/providers";
import Footer from "./components/footer";
import Header from "./components/header";

// Sarabun font
const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sarabun",
});
// Pinyon_Script font
const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-pinyon",
});

// Metadata for the application
export const metadata: Metadata = {
  title: "Rose App",
  description: "Rose App is a modern web application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sarabun.variable} ${pinyon.variable} antialiased transition-colors duration-300 dark:bg-zinc-800`}
      >
        {/* Providers */}
        <Providers>
          {/* Header  */}
          <Header />

          {/* Main content */}
          <main className="font-sarabun container mx-auto  w-full min-h-[calc(100vh-200px)] px-20">
            {/* Main children components */}
            {children}

            {/* Toast notifications */}
            <Toaster />
          </main>

          {/* Footer */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
