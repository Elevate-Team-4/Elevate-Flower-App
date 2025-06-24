import { ForgetPasswordFields } from "@/lib/schemes/forget-password.schema";
import { useMutation } from "@tanstack/react-query";
import forgetPasswordAction from "../_actions/forget-password.action";

export default function useForgetPassword() {
  // Create mutation
  const { isPending, error, mutate } = useMutation({
    // When mutation runs
    mutationFn: async (fileds: ForgetPasswordFields) => {
      const payload = await forgetPasswordAction(fileds);

      // Error
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

  return { isPending, error, forgetPassword: mutate };
}
