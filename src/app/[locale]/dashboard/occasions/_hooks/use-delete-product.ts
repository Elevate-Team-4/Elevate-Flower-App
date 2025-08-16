"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import deleteOccasionAction from "../_actions/occasion.action";

// import { useTranslations } from "next-intl";

export default function useDeleteOccasion() {
  //   const t = useTranslations();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteOccasionAction(id); // server action or API call
    },
    onSuccess: () => {
      toast({
        title: "success",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["occasion"] }); // refresh products list
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
