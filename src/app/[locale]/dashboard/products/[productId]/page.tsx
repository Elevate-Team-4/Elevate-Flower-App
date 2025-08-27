import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ShowImagesDialog } from "@/components/common/show-images-dialog";
import { getProductDetails } from "@/lib/apis/products.api";

interface ProductIdProbs {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductIdProbs) {
  const { productId } = params;

  const t = await getTranslations();

  // Functions
  const response = await getProductDetails(productId);

  if ("error" in response) {
    notFound();
  }

  const { product } = response;

  return (
    <div className="flex flex-col">
      {/* Form */}

      {/* Images dialogs */}
      <div className="flex justify-end gap-3">
        <ShowImagesDialog
          cover={product.imgCover}
          buttonTitleCoverTranslation={t("product-cover")}
        />
        <ShowImagesDialog
          gallary={product.images}
          buttonTitleGallaryTranslation={t("product-gallary")}
        />
      </div>
    </div>
  );
}
