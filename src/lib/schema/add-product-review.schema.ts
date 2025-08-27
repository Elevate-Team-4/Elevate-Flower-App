import { useTranslations } from "next-intl";
import z from "zod";

export const useAddProductReviewSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    rating: z
      .number()
      .min(1, t("please-select-a-rating"))
      .max(5, t("rating-cannot-exceed-5-stars")),
    title: z.string().min(5, t("title-must-be-at-least-10-characters")),
    comment: z.string().min(20, t("review-must-be-at-least-20-characters")),
  });
};

export type ProductReviewField = z.infer<ReturnType<typeof useAddProductReviewSchema>>;
