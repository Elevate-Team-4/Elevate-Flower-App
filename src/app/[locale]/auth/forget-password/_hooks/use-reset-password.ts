import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { ResetPassword } from "@/lib/types/rest-password";
import { toast } from "@/hooks/use-toast";
import resetPasswordAction from "../_actions/reset-password.action";

export default function useResetPassword() {
  // Translation
  const t = useTranslations();

  // Create mutation
  const { isPending, error, mutate } = useMutation({
    // When mutation runs
    mutationFn: async (fileds: ResetPassword) => {
      const payload = await resetPasswordAction(fileds);

      // Error
      if ("error" in payload) throw new Error(payload.error);

      return payload;
    },

    onSuccess: () => {
      // On success toest
      toast({
        description: t("reset-success"),
      });
    },
    onError: () => {
      // On error toast
      toast({
        description: t("reset-error"),
        variant: "destructive",
      });
    },
  });

  return { isPending, error, resetPassword: mutate };
}
