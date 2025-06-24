import { useMutation } from "@tanstack/react-query";
import resetPasswordAction from "../_actions/reset-password.action";
import { ResetPassword } from "@/lib/types/rest-password";

export default function useResetPassword() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fileds: ResetPassword) => {
      const payload = await resetPasswordAction(fileds);

      if ("error" in payload) throw new Error(payload.error);

      return payload;
    },

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return { isPending, error, resetPassword: mutate };
}
