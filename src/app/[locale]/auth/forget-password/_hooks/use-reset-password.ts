import { useMutation } from "@tanstack/react-query";
import resetPasswordAction from "../_actions/reset-password.action";
import { ResetPassword } from "@/lib/types/rest-password";

export default function useResetPassword() {
  // Create mutation
  const { isPending, error, mutate } = useMutation({
    // When mutation runs
    mutationFn: async (fileds: ResetPassword) => {
      const payload = await resetPasswordAction(fileds);

      // Error
      if ("error" in payload) throw new Error(payload.error);

      return payload;
    },

    onSuccess: (data) => {},
    onError: (error) => {},
  });

  return { isPending, error, resetPassword: mutate };
}
