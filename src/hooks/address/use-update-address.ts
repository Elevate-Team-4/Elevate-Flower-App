import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { updateAddress } from "@/lib/actions/address/update-address.action";
import { AddDressFormType } from "@/lib/schema/address-model/address-form.schema";
import { toast } from "../use-toast";

export default function useUpdateAddress() {
  // Translations
  const t = useTranslations();
  //Queries
  const queryClient = useQueryClient();
  //Mutations
  const { isPending, mutate } = useMutation({
    mutationFn: async ({ values, id }: { values: AddDressFormType; id: string }) => {
      return await updateAddress({ values, id });
    },
    onSuccess: () => {
      toast({
        title: t("address-updated-successfully"),
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
    },
    onError: (error: any) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });
  return {
    updateAddressPending: isPending,
    updateAddressFn: mutate,
  };
}
