import { useTranslations } from "next-intl";
import { z } from "zod";

export const forgetPasswordSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    email: z
      .string({ required_error: t("please-enter-youre-email-zod-error") })
      .email(t("please-enter-a-valid-email-zod-error"))
      .min(1, t("please-enter-your-email-zod-error")),
  });
};

export type ForgetPasswordFields = z.infer<ReturnType<typeof forgetPasswordSchema>>;
