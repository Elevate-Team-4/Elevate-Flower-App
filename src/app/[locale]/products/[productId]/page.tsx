import BarTitle from "@/components/common/bar-title";
import { getProductDetails } from "@/lib/apis/products.api";
import Image from "next/image";
import { RealatedProductsCarousel } from "./_components/related-products-carousel";
import ProductThumbnail from "./_components/product-thumbnail";
import { Suspense } from "react";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";

interface ProductDetailsProbs {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductDetailsProbs) {
  // Extracting search params
  const { productId } = params;

  // Functions
  const response = await getProductDetails(productId);

  if ("error" in response) {
    return <p>error</p>;
  }

  const { product } = response;
  // const thumbnailImages = [product.imgCover, ...product.images];

  return (
    <>
      <div className="mt-16 grid grid-cols-12 gap-16">
        {/* Product thumbnail */}
        <div className="col-span-6">
          <ProductThumbnail thumbnailImages={product.images} />
        </div>

        {/* Product descreption */}
        <div className="col-span-6">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati at nesciunt officia
            dolor in? Nam sapiente eligendi corrupti nostrum quidem assumenda iste suscipit, hic
            libero optio quasi, ut saepe tempore. Minima, tempore! Tempore non itaque a corporis
            molestiae fuga quasi atque, quos explicabo expedita nobis, nesciunt sit at! Vero
            recusandae unde in expedita? Soluta itaque laboriosam deleniti cumque aliquam sapiente
            ipsam distinctio veniam doloremque, quaerat aperiam nihil quas officiis iste impedit
            mollitia, magni illo voluptates! Saepe cumque doloribus nihil optio quibusdam excepturi.
            Et dolorem iste temporibus itaque architecto, distinctio dicta corrupti soluta ipsam
            voluptates, neque ullam optio similique, accusantium commodi?
          </p>
        </div>
      </div>

      {/* Realated products */}
      <div className="mt-12">
        {/* Title */}
        <BarTitle title="Related Products" highlightBarWidth="w-[27%]" mainBarWidth="w-9/12" />

        {/* Realated products carousel */}
        <Suspense
          fallback={
            <SingleProductSkeleton
              count={4}
              containerColSpan={12}
              containerGridCols={12}
              skeletonColSpan={3}
            />
          }
          key={product._id}
        >
          <RealatedProductsCarousel productId={productId} />
        </Suspense>
      </div>
    </>
  );
}
