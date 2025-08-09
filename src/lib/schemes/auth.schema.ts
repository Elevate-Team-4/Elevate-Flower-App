import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
  // Translation
  const t = useTranslations();

  return z
    .object({
      firstName: z
        .string({ required_error: t("firstname-required") })
        .min(1, t("firstname-required")),
      lastName: z.string({ required_error: t("lastname-required") }).min(1, t("lastname-required")),
      email: z.string({ required_error: t("email-required") }).email({
        message: t("email-invalid"),
      }),
      phone: z.string({ required_error: t("phone-required") }).min(1, t("phone-required")),
      gender: z.enum(["male", "female"], { required_error: "{t('gender-required')}" }),
      password: z.string({ required_error: t("password-required") }).min(8, {
        message: t("password-min", { min: 8 }),
      }),
      rePassword: z.string(),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("password-mismatch"),
      path: ["rePassword"],
    });
};

export type RegistrationFields = z.infer<ReturnType<typeof useRegisterSchema>>;
