import { useTranslations } from "next-intl";
import { z } from "zod";

export const useRegisterSchema = () => {
  // Translation
  const t = useTranslations();

  return z
    .object({
      firstName: z.string().min(1, { message: t("firstname-required") }),
      lastName: z.string().min(1, { message: t("lastname-required") }),
      email: z
        .string()
        .min(1, { message: t("email-required") })
        .email({
          message: t("email-invalid"),
        }),
      phone: z.string().min(1, { message: t("phone-required") }),
      gender: z.enum(["male", "female"], {
        message: t("gender-required"),
      }),
      password: z
        .string()
        .min(1, { message: t("password-required") })
        .min(8, {
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
