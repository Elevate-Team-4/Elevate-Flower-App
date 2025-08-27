import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ShowImagesDialog } from "@/components/common/show-images-dialog";
import { getProductDetails } from "@/lib/apis/products.api";
import { getOccasions } from "@/lib/api/occasions.api";
import { getAllCategory } from "@/lib/api/category";
import { getProductById } from "@/lib/api/products.api";

interface ProductIdProbs {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductIdProbs) {
  // Variables
  const { productId } = params;

  // Translations
  const t = await getTranslations();

  // Functions
  const [occasions, categories, response] = await Promise.all([
    getOccasions(),
    getAllCategory(),
    getProductById(productId || ""),
  ]);

  // Error handling
  if ("error" in response || !("occasions" in occasions) || !("categories" in categories)) {
    notFound();
  }

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
