import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { getOccasions } from "@/lib/apis/occasions.api";
import ProductsByOccasion from "./product-by-occasion";
import BarTitle from "@/components/common/bar-title";
import { Suspense } from "react";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";
import TabsTitle from "./tabs-title";
export default async function MostPopular({
  searchParams,
}: {
  searchParams: { occasion?: string };
}) {
  
  // Functions
  const response = await getOccasions({ limit: 4 });

  if ("error" in response) {
    return <p>error while fetching data</p>;
  }

  const { occasions } = response;

  // Variables
  let selectedOccasion = occasions.find(
    (occasion) => occasion._id == searchParams.occasion
  );

  // If search params are empty (default search param)
  if (!searchParams.occasion) {
    selectedOccasion = occasions[0];
  }

  // If occasion Id does not exist (change in occasion id)
  if (!selectedOccasion) {
    return <p>occasion id not valid</p>;
  }

  return (
    <>
      <Tabs defaultValue={`${selectedOccasion._id}`}>
        {/* Heading */}
        <div className="flex justify-between items-center">
          {/* Title */}
          <BarTitle
            title="Most Popular"
            highlightBarWidth="w-[27%]"
            mainBarWidth="w-9/12"
          />

          {/* Taps list titles */}
          <TabsList className="bg-transparent gap-6">
            <TabsTitle occasions={occasions} />
          </TabsList>
        </div>

        {/* Products based on occasion */}
        <Suspense fallback={<p className="text-black">"loading"</p>}>
          <TabsContent
            defaultValue={selectedOccasion._id}
            key={selectedOccasion._id}
            value={selectedOccasion._id}
            // TODO Change text Color
            className="mt-10"
          >
            <Suspense
              fallback={
                <SingleProductSkeleton count={4} key={selectedOccasion._id} />
              }
            >
              <ProductsByOccasion occasionId={selectedOccasion._id} />
            </Suspense>
          </TabsContent>
        </Suspense>
      </Tabs>
    </>
  );
}
