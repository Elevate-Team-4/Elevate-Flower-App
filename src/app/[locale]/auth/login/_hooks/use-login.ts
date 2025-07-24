// React & Next.js
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

// Libraries
import { useMutation } from "@tanstack/react-query";

// Schemas
import { LoginFields } from "@/lib/schemas/auth.schema";

export default function useLogin() {
  const searchParams = useSearchParams();

  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ email, password }: LoginFields) => {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: decodeURIComponent(searchParams.get("callbackUrl") || "/"),
      });

      if (response?.error) throw new Error(response.error);

      return response;
    },
  });

  return { isPending, error, login: mutate };
}
