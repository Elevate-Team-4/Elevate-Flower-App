import { z } from "zod";
import { useTranslations } from "next-intl";

// Login schema for validating login form inputs
export const useLoginSchema = () => {
  const t = useTranslations("validation");

  return z.object({
    email: z.string({ required_error: t("email_required") }).email({ message: t("email_invalid") }),
    password: z
      .string({ required_error: t("password_required") })
      .min(8, { message: t("password_min_length") })
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        t("password_complexity"),
      ),
  });
};

export type LoginFields = z.infer<ReturnType<typeof useLoginSchema>>;
