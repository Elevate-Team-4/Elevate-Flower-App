// Local Components
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main children components */}
      <main className="font-sarabun container mx-auto  w-full min-h-[calc(100vh-200px)] px-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
