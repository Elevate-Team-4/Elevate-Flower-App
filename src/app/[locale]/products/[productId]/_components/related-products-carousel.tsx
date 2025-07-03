import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SingleProduct from "@/components/common/single-product";
import { getProductDetails, getRelatedProduct } from "@/lib/apis/products.api";

interface ProductDetailsProbs {
  productId: string;
}

export async function RealatedProductsCarousel({ productId }: ProductDetailsProbs) {
  // Functions
  const response = await getRelatedProduct(productId);

  if ("error" in response) {
    return <p>error</p>;
  }
  const { similarProducts } = response;

  // This functions gets the full info of the related products (can be changed to getting products by same category)
  const relatedProductsDetails = await Promise.all(
    similarProducts.map(async (similarProduct) => {
      const response = await getProductDetails(similarProduct._id);

      if ("error" in response) {
        return undefined;
      }

      return response.product;
    }),
  );

  return (
    <>
      <Carousel opts={{ align: "start" }} className="mt-4 mb-12">
        <CarouselContent className="-ml-4">
          {relatedProductsDetails.map((product) =>
            product ? (
              <CarouselItem
                key={product._id}
                className="basis-1/4 mx-auto flex justify-center pl-4"
              >
                <SingleProduct singleProduct={product} />
              </CarouselItem>
            ) : (
              <p>something went wrong</p>
            ),
          )}
        </CarouselContent>
        <CarouselPrevious className="bg-maroon-600 hover:bg-maroon-600 hover:text-white border-0 text-white [&_svg]:size-6" />
        <CarouselNext className="bg-maroon-600 hover:bg-maroon-600 hover:text-white border-0 text-white [&_svg]:size-6" />
      </Carousel>
    </>
  );
}
