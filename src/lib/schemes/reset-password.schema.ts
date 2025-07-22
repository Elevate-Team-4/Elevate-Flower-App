import { useTranslations } from "next-intl";
import { z } from "zod";

export const resetPasswordSchema = () => {
  // Translation
  const t = useTranslations();
  return z
    .object({
      newPassword: z
        .string({ required_error: t("password-requred-reset-password") })
        .min(8, t("password-min"))
        .max(50, t("password-max"))
        .regex(/[A-Z]/, t("password-upercase"))
        .regex(/[a-z]/, t("password-lowercase"))
        .regex(/[0-9]/, t("password-number"))
        .regex(/[^A-Za-z0-9]/, t("password-special")),

      newRePassword: z.string({ required_error: t("confirm-password-required") }),
    })
    .refine((data) => data.newPassword === data.newRePassword, {
      message: t("password-mismatch"),
      path: ["newRePassword"],
    });
};

export type ResetPasswordFields = z.infer<ReturnType<typeof resetPasswordSchema>>;
