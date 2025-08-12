import { useTranslations } from "next-intl";
import { z } from "zod";

export const useAddCategoryFormSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    name: z
      .string()
      .min(1, { message: "Please enter a category name " })
      .max(15, { message: "Category name must be less than 15 characters" }),
    image: z.any(),
    //   .instanceof(File)
    //   .refine((file) => ["image/png", "image/jpeg"].includes(file.type), {
    //     message: "Only PNG and JPG images are allowed",
    //   }),
  });
};
export type AddCategoryFormType = z.infer<ReturnType<typeof useAddCategoryFormSchema>>;
