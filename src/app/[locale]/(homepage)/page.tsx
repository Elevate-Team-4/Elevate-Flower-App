import AboutUs from "./_components/about-us-section";
import ProductReview from "./_components/add-product-review/product-review";
import BestSelling from "./_components/best-selling/best-selling";
import CarouselSection from "./_components/carousel-section";
import CompaniesSection from "./_components/companies-section";
import FeaturesSection from "./_components/features-section";
import Gallery from "./_components/gallery-section";
import MostPopular from "./_components/most-popular/most-popular";
import OccasionsSection from "./_components/occasions-section";

export default function Home({
  searchParams,
}: {
  params?: { locale: string };
  searchParams?: { occasion?: string };
}) {
  return (
    <main className="py-10 container">
      {/* Carousel section */}
      <CarouselSection />

      {/* Occasions section */}
      <OccasionsSection />

      {/* Features section */}
      <FeaturesSection />

      {/*Companie sectoin*/}
      <BestSelling />
      <MostPopular searchParams={searchParams || {}} />

      {/*About sectoin*/}
      <AboutUs />

      {/*Gallery sectoin*/}
      <Gallery />

      <CompaniesSection />
      {/* <ProductReview /> */}
    </main>
  );
}
