import { ShowImagesDialog } from "@/components/common/show-images-dialog";
import { getProductDetails } from "@/lib/apis/products.api";

interface ProductIdProbs {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductIdProbs) {
  const { productId } = params;
  // Functions
  const response = await getProductDetails(productId);

  if ("error" in response) {
    return <p>error</p>;
  }

  const { product } = response;
  return (
    <div className="flex flex-col">
      <p>product id : {productId}</p>
      {/* Form */}

      <div className="flex justify-end gap-3">
        <ShowImagesDialog cover={product.imgCover} itemType="product" />
        <ShowImagesDialog gallary={product.images} itemType="product" />
      </div>
    </div>
  );
}
