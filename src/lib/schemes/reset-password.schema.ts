import { useTranslations } from "next-intl";
import { z } from "zod";

export const resetPasswordSchema = () => {
  // Translation
const t = useTranslations()
  return z
    .object({
      newPassword: z
        .string({ required_error: t('reset-password-please-enter-your-password') })
        .min(8, t('password-must-be-at-least-8-characters-rest-password-zod-error'))
        .max(50, t('password-cannot-exceed-50-characters-reset-password-zod-error'))
        .regex(/[A-Z]/, t('password-must-contain-at-least-one-uppercase-letter-reset-password-zod-error'))
        .regex(/[a-z]/, t('password-must-contain-at-least-one-lowercase-letter-reset-password-zod-error'))
        .regex(/[0-9]/, t('password-must-contain-at-least-one-number-reset-password-zod-error'))
        .regex(/[^A-Za-z0-9]/, t('password-must-contain-at-least-one-special-character-reset-password-zod-error')),

      newRePassword: z.string({ required_error: t('please-confirm-your-password-reset-password-zod-error') }),
    })
    .refine((data) => data.newPassword === data.newRePassword, {
      message: t('passwords-dont-match-reset-password-zod-error'),
      path: ["newRePassword"],
    });
};

export type ResetPasswordFields = z.infer<ReturnType<typeof resetPasswordSchema>>;
