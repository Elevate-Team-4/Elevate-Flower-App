"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
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
      toast({
        title: t("category-updated-successfully"),
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

  return {
    updateCategoryPending: isPending,
    updateCategoryFn: mutate,
  };
}
