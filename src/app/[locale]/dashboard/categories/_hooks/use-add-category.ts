import { useMutation } from "@tanstack/react-query";
import { AddCategoryFormType } from "@/lib/schemas/categories/add-categories.schema";
import { toast } from "@/hooks/use-toast";
import { AddCategory } from "../_actions/add-category.action";

export function useAddCategory() {
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async ({ values }: { values: AddCategoryFormType }) => {
      return await AddCategory({ values });
    },
    onSuccess: () => {
      toast({
        title: "Category added successfully",
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
  return { AddCategoryFn: mutate, isPending, isError };
}
