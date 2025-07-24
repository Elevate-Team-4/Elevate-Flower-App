import { ForgetPasswordFields } from "@/lib/schemes/forget-password.schema";
import { useMutation } from "@tanstack/react-query";
import forgetPasswordAction from "../_actions/forget-password.action";
import { toast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";

export default function useForgetPassword() {
  // Translation
  const t = useTranslations();

  // Create mutation
  const { isPending, error, mutate } = useMutation({
    // When mutation runs
    mutationFn: async (fileds: ForgetPasswordFields) => {
      const payload = await forgetPasswordAction(fileds);

      // Error
      if ("error" in payload) throw new Error(payload.error);

      return payload;
    },

    onSuccess: () => {
      // On success toest
      toast({
        title: t("otp-sent"),
        description: t("descreption-toast-forgetpassword"),
      });
    },
    onError: () => {
      // On Error toest
      toast({
        title: t("email-not-found-error-toast"),
        description: t("descreption-error-toast-forgetpassword"),
        variant: "destructive",
      });
    },
  });

  return { isPending, error, forgetPassword: mutate };
}
