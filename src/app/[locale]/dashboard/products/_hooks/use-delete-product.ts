"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import deleteProductAction from "../_actions/product.action";
// import { useTranslations } from "next-intl";

export default function useDeleteProduct() {
  //   const t = useTranslations();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteProductAction(id); // server action or API call
    },
    onSuccess: () => {
      toast({
        title: "success",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] }); // refresh products list
    },
    onError: (error) => {
      toast({
        title: error?.message || "something went wrong",
        variant: "destructive",
      });
    },
  });

  return {
    isPending,
    deleteProductFn: mutate,
  };
}
