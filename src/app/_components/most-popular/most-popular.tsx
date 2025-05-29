import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOccasions } from "@/lib/apis/occasions.api";
import ProductsByOccasion from "./product-by-occasion";
import BarTitle from "@/components/common/bar-title";

async function MostPopular() {
  // ? Functions
  const response = await getOccasions({ limit: 4 });

  if ("error" in response) {
    return <p>error</p>;
  }

  const { occasions } = response;

  return (
    <>
      <Tabs defaultValue="wedding">
        {/* Heading */}
        <div className="flex justify-between items-center">
          {/* Title */}
          <BarTitle
            title="Most Popular"
            highlightBarWidth="w-[27%]"
            mainBarWidth="w-[71%]"
          />

          {/* Taps List Titles */}
          <TabsList className="bg-transparent">
            {occasions.map((occasion) => (
              <TabsTrigger key={occasion._id} value={occasion.slug}>
                {occasion.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Products Based On Occasion */}
        {occasions.map((occasion) => (
          <TabsContent
            key={occasion._id}
            value={occasion.slug}
            // TODO Change text Color
            className="mt-10"
          >
            <ProductsByOccasion occasionId={occasion._id} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default MostPopular;
