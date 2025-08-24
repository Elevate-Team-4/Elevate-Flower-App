"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { updateCategory } from "../_actions/update-category.action";

export default function useUpdateCategory() {
  // Translations
  const t = useTranslations();

  //Navigation
  const router = useRouter();

  // Queries
  const queryClient = useQueryClient();

  //Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ formData, id }: { formData: FormData; id: string }) => {
      return await updateCategory({ formData, id });
    },
    onSuccess: () => {
      toast.success(t("category-updated-successfully"));
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      router.push("/dashboard/categories");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    updateCategoryPending: isPending,
    updateCategoryFn: mutate,
  };
}
