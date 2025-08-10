import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { RegistrationFields } from "@/lib/schemes/auth.schema";
import { registerAction } from "../_action/register.action";

export default function useRegister() {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (fields: RegistrationFields) => await registerAction(fields),
    onSuccess: () => {
      // Redirect to the login page upon successful registration
      router.push(`/auth/login?${searchParams.toString()}`);
    },
  });

  return { isPending, error, register: mutate };
}
