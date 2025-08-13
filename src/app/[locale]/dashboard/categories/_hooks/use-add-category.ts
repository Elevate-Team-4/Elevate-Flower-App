"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/navigation";
import { AddCategory } from "../_actions/add-category.action";

export function useAddCategory() {
  // Translations
  const t = useTranslations();

  //Navigation
  const router = useRouter();

  // Queries
  const queryClient = useQueryClient();

  // Mutaions
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      return await AddCategory(formData);
    },
    onSuccess: () => {
      toast({
        title: t("category-added-successfully"),
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
      router.push("/dashboard/categories");
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  return { addCategoryFn: mutate, addPending: isPending, error };
}
