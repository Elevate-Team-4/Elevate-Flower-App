import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { AddCategoryFormType } from "@/lib/schemas/categories/add-categories.schema";
import { updateCategory } from "../_actions/update-category.action";

export default function useUpdateCategory() {
  // Translations
  //   const t = useTranslations();

  //Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ values, id }: { values: AddCategoryFormType; id: string }) => {
      return await updateCategory({ values, id });
    },
    onSuccess: () => {
      toast({
        title: "Category updated successfully",
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
    updateCategoryPending: isPending,
    updateCategoryFn: mutate,
  };
}
