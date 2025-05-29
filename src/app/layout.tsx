import type { Metadata } from "next";
import localFont from "next/font/local";
import { Sarabun } from "next/font/google";
import "./globals.css";

// Configure Poppins
const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: "Rose App",
  description: "Rose Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sarabun.variable} antialiased`}>
        <main className="max-w-[1441px] m-auto  px-20 py-7 font-sarabun">
          {children}
        </main>
      </body>
    </html>
  );
}
