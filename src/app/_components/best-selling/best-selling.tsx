import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SingleProduct from "@/components/common/single-product";
import { getProducts } from "@/lib/apis/products.api";
import { ArrowRight } from "lucide-react";

async function BestSelleing() {
  // ? Functions
  const response = await getProducts({ limit: 10, sort: "-sold" });
  if ("error" in response) {
    return <p>error</p>;
  }

  const { products } = response;

  return (
    <div className="grid grid-cols-12 gap-8 mb-32">
      {/* Title */}
      <div className="col-span-3 flex flex-col justify-between">
        <div>
          <h2
            // TODO Change text Color
            className="text-base font-bold uppercase tracking-[0.25em] mb-3 text-[#FF668B]"
          >
            Best Selling
          </h2>
          <p
            // TODO Change text Color
            className="text-3xl font-bold text-[#741C21]"
          >
            <span
              // TODO Change text Color
              className="text-[#FF668B]"
            >
              Check Out
            </span>{" "}
            What Everyone’s{" "}
            <span
              // TODO Change text Color
              className="text-[#FF668B]"
            >
              Buying
            </span>{" "}
            Right Now
          </p>
          <p className="text-base text-zinc-500">
            Not sure what to choose?
            <br />
            Start with our best sellers, these are the gifts our customers keep
            coming back for. Whether you're celebrating a birthday, anniversary
            or wedding, our top picks are guaranteed to leave a lasting
            impression.
          </p>
        </div>

        {/* Explore Gifts Button */}
        <Button
          // TODO Change bg Color
          className="mt-8 px-7 py-3 rounded-lg self-start bg-[#A6252A] hover:bg-[#A6252A]"
        >
          Explore gifts <ArrowRight />
        </Button>
      </div>

      {/* Carousel */}
      <div className="col-span-9">
        <Carousel>
          <CarouselContent className="-ml-[24px]">
            {products.map((product) => (
              <CarouselItem
                key={product._id}
                className="basis-1/3 mx-auto flex justify-center pl-[24px]"
              >
                <SingleProduct singleProduct={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            // TODO Change text Color
            className="bg-[#A6252A] hover:bg-[#A6252A] hover:text-white border-0 text-white [&_svg]:size-6"
          />
          <CarouselNext
            // TODO Change text Color
            className="bg-[#A6252A] hover:bg-[#A6252A] hover:text-white border-0 text-white [&_svg]:size-6"
          />
        </Carousel>
      </div>
    </div>
  );
}

export default BestSelleing;
