// Libraries
import { useMutation } from "@tanstack/react-query";
import { removeFromWishlist } from "../_actions/wishlist.actoin";

// Actions

export function useRemoveFromWishlist() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const response = await removeFromWishlist(productId);

      if ("error" in response) {
        throw new Error(response.message || response.error || "Failed to remove from wishlist");
      }

      return response;
    },
  });

  return { isPending, error, removeFromWishlist: mutate };
}
