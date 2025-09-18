import { useTranslations } from "next-intl";
import { z } from "zod";

// Existing schema
export const useAddCategoryFormSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    name: z.string().min(1, { message: t("add-category-name") }),
    image: z.any(),
  });
};

export type AddCategoryFormType = z.infer<ReturnType<typeof useAddCategoryFormSchema>>;

// Add the missing login schema
export const useLoginSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    email: z
      .string()
      .min(1, { message: t("email_required") || "Email is required" })
      .email({ message: t("email_invalid") || "Please enter a valid email address" }),
    password: z
      .string()
      .min(1, { message: t("password_required") || "Password is required" })
      .min(6, { message: t("password_min_length") || "Password must be at least 6 characters" }),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
