import { useTranslations } from "next-intl";
import { z } from "zod";

export const useAddCategoryFormSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    name: z.string().min(1, { message: t("add-category-name") }),
    image: z.any(),
  });
};

export type AddCategoryFormType = z.infer<ReturnType<typeof useAddCategoryFormSchema>>;
