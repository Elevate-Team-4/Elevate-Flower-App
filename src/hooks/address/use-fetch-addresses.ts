import { useQuery } from "@tanstack/react-query";

export default function useFetchAddresses() {
  const {
    isLoading,
    data: payload,
    error,
    isError,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/get-addresses`);
      const payload: APIResponse<UserAddresses> = await response.json();
      if ("error" in payload) {
        throw new Error(payload.error);
      }
      return payload;
    },
  });
  return {
    isLoading,
    payload,
    isError,
    error,
  };
}
