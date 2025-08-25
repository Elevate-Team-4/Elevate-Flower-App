// Libraries
import { useMutation } from "@tanstack/react-query";
import { AddToWishlist } from "../_actoins/wishlist.actoin";

export function useAddToWishlist() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await AddToWishlist(productId);

      if ("error" in response) {
        throw new Error(response.message || response.error || "Failed to add to wishlist");
      }
      return response;
    },
  });

  return { isPending, error, addToWishlist: mutate };
}
