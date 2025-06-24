import BestSelling from "./_components/best-selling/best-selling";
import MostPopular from "./_components/most-popular/most-popular";

export default function Home({ searchParams }: { searchParams: { occasion?: string } }) {
  return (
    <div>
      <BestSelling />
      <MostPopular searchParams={searchParams} />
    </div>
  );
}
