import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { deleteAddress } from "@/lib/actions/address/delete-address";
import { useTranslations } from "next-intl";

export default function useDeleteAddress() {
  // Translations
  const t = useTranslations();
  //   Queries
  const queryClient = useQueryClient();
  //   Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteAddress(id);
    },
    onSuccess: () => {
      toast({
        title: t("address-deleted-successfully"),
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
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
    deleteAddressFn: mutate,
  };
}
