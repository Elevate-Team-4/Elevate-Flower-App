import AboutUs from "./_components/about-us-section";
import BestSelling from "./_components/best-selling/best-selling";
import CompaniesSection from "./_components/companies-section";
import Gallery from "./_components/gallery-section";
import MostPopular from "./_components/most-popular/most-popular";

export default function Home({
  searchParams,
}: {
  params?: { locale: string };
  searchParams?: { occasion?: string };
}) {
  return (
    <main className="py-10">
      {/*Companie sectoin*/}
      <BestSelling />
      <MostPopular searchParams={searchParams || {}} />

      {/*About sectoin*/}
      <AboutUs />

      {/*Gallery sectoin*/}
      <Gallery />

      <CompaniesSection />
    </main>
  );
}
