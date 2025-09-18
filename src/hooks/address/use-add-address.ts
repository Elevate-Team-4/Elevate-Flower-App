import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { addAddress } from "@/lib/actions/address/add-address.action";
import { AddDressFormType } from "@/lib/schema/address-model/address-form.schema";
import { toast } from "../use-toast";

export default function useAddAddress() {
  // Translations
  const t = useTranslations();
  //   Queries
  const queryClient = useQueryClient();
  //   Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async (values: AddDressFormType) => {
      return await addAddress({ values });
    },
    onSuccess: () => {
      toast({
        title: t("address-added-successfully"),
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
    addAddressFn: mutate,
  };
}
