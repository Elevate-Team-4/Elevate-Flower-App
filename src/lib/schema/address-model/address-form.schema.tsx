import z from "zod";

export const addressFormSchema = z.object({
  city: z.string().min(1, "City is required"),
  street: z
    .string()
    .min(1, "Address is required")
    .min(10, " Address must be at least 10 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  lat: z.string().min(1, "Location is required"),
  long: z.string().min(1, "Location is required"),
  username:z.string()
});
export type AddDressFormType = z.infer<typeof addressFormSchema>;

// import { useTranslations } from "next-intl";
// import z from "zod";

// export const useAddProductReviewSchema = () => {
//   // Translation
//   const t = useTranslations();

//   return z.object({
//     rating: z
//       .number()
//       .min(1, t("please-select-a-rating"))
//       .max(5, t("rating-cannot-exceed-5-stars")),
//     title: z.string().min(5, t("title-must-be-at-least-10-characters")),
//     comment: z.string().min(20, t("review-must-be-at-least-20-characters")),
//   });
// };

// export type ProductReviewField = z.infer<ReturnType<typeof useAddProductReviewSchema>>;
