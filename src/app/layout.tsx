import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import { Sarabun } from "next/font/google";
import Footer from "./components/footer";
import Header from "./components/header";


// Sarabun font
const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sarabun",
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
      <body className={`${sarabun.variable} antialiased transition-colors duration-300`}>
        {/* Providers */}
        <Providers>
          <main className="container mx-auto font-sarabun">
            {/* Navbar  */}
            <Header />

            {/* Main content */}
            {children}

            {/* Footer */}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
