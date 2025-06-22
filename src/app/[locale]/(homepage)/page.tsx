import AboutUs from "./_components/about-us-section";
import CompaniesSection from "./_components/companies-section";
import Gallery from "./_components/gallery-section";

export default function Home() {
  return (
    <main className="py-10">
      {/*About sectoin*/}
      <AboutUs />

      {/*Gallery sectoin*/}
      <Gallery />

      {/*Companie sectoin*/}
      <CompaniesSection />
    </main>
  );
}
