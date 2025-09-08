import { z } from "zod";
import { useTranslations } from "next-intl";

// Product schema for validating product form inputs
export const useProductSchema = (edit = false) => {
  const t = useTranslations();

  return z.object({
    title: z.string().min(1, t("product.title_required")),
    description: z.string().min(1, t("product.description_required")),
    price: z.number().min(0.01, t("product.price_required")),
    discount: z.number().min(0).max(100).optional(),
    priceAfterDiscount: z.number().optional(),
    quantity: z.number().min(1, t("product.quantity_required")),
    productCover: edit
      ? z.array(z.instanceof(File)).optional()
      : z
          .array(z.instanceof(File))
          .min(1, t("product.product_cover_required"))
          .max(1, t("product.product_cover_max")),
    productGallery: edit
      ? z.array(z.instanceof(File)).optional()
      : z.array(z.instanceof(File)).min(1, t("product.product_gallery_required")),
    category: z.string().min(1, t("product.category_required")),
    occasion: z.string().min(1, t("product.occasion_required")),
  });
};

export type ProductFormValues = z.infer<ReturnType<typeof useProductSchema>>;
