import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ShowImagesDialog } from "@/components/common/show-images-dialog";
import { getOccasions } from "@/lib/api/occasions.api";
import { getAllCategory } from "@/lib/api/category";
import { getProductById } from "@/lib/api/products.api";
import ProductForm from "../_components/product-form";

interface ProductIdProbs {
  params: {
    productId: string;
  };
}

export default async function Page({ params }: ProductIdProbs) {
  // Translations
  const t = await getTranslations();

  // Variables
  const { productId } = params;
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
      <ProductForm
        edit
        product={response.product}
        occasions={occasions.occasions}
        categories={categories.categories}
      />

      {/* Images dialogs */}
      <div className="flex justify-end gap-3">
        <ShowImagesDialog
          cover={response.product.imgCover}
          buttonTitleCoverTranslation={t("product-cover")}
        />
        <ShowImagesDialog
          gallary={response.product.images}
          buttonTitleGallaryTranslation={t("product-gallary")}
        />
      </div>
    </div>
  );
}
