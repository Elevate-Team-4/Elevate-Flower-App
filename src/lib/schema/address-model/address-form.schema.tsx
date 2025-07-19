import z from "zod";
import { useTranslations } from "next-intl";

export const useAddressFormSchema = () => {
  // Translation
  const t = useTranslations();

  return z.object({
    city: z.string().min(1, t("city-is-required")),
    street: z
      .string()
      .min(1, t("address-is-required"))
      .min(10, t("address-must-be-at-least-10-characters")),
    phone: z
      .string()
      .min(10, t("phone-number-must-be-at-least-10-digits"))
      .max(15, t("phone-number-too-long")),
    lat: z.string().min(1, t("location-is-required")),
    long: z.string().min(1, t("location-is-required")),
    username: z.string(),
  });
};
export type AddDressFormType = z.infer<ReturnType<typeof useAddressFormSchema>>;
