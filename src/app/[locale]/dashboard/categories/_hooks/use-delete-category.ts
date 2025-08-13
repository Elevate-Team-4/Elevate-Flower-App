import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "@/hooks/use-toast";
import { deleteCategory } from "../_actions/delete-category.action";

export default function useDeleteCategory() {
  // Translations
  const t = useTranslations();

  //   Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteCategory(id);
    },
    onSuccess: () => {
      toast({
        title: t("category-had-been-deleted-successfully"),
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });
  return {
    isPending,
    deleteCategoryFn: mutate,
  };
}
