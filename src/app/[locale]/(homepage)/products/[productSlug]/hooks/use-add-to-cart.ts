// Libraries
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

// Actions
import { addToCartAction } from "../_actoins/cart.actoin";

export function useAddToCart() {
  // Mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: { productId: string; quantity?: number }) => {
      const response = await addToCartAction(productId, quantity);

      if ("error" in response) {
        throw new Error(response.message || response.error);
      }
      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "Added to cart!",
        description: `${data.numOfCartItems} items in your cart`,
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to add to cart",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return { isPending, error, addToCart: mutate };
}
