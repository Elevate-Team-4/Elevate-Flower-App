import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { toast } from "sonner";
import { deleteCategory } from "../_actions/delete-category.action";

export default function useDeleteCategory() {
  // Translations
  const t = useTranslations();

  // Queries
  const queryClient = useQueryClient();

  //   Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteCategory(id);
    },
    onSuccess: () => {
      toast.success(t("category-had-been-deleted-successfully"));
      queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    isPending,
    deleteCategoryFn: mutate,
  };
}
