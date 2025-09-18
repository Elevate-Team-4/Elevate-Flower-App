import { useTranslations } from "next-intl";
import { z } from "zod";

export const useForgetPasswordSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    email: z
      .string()
      .min(1, { message: t("email-required") })
      .email({ message: t("email-invalid") }),
  });
};

export type ForgetPasswordFields = z.infer<ReturnType<typeof useForgetPasswordSchema>>;
