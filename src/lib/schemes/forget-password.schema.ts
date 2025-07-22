import { useTranslations } from "next-intl";
import { z } from "zod";

export const forgetPasswordSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    email: z
      .string({ required_error: t("email-required") })
      .email(t("email-invalid"))
      .min(1, t("email-zod-error")),
  });
};

export type ForgetPasswordFields = z.infer<ReturnType<typeof forgetPasswordSchema>>;
