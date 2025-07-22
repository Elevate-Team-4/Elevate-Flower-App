import "./globals.css";

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
  return children;
}
