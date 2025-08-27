import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { addProductReview } from "@/lib/actions/add-product-review/add-product-review.action";
import { ProductReviewField } from "@/lib/schema/add-product-review.schema";

export default function useAddProductReview() {
  const { error, isPending, mutate, data } = useMutation({
    mutationFn: async ({
      values,
      productId,
    }: {
      values: ProductReviewField;
      productId: string;
    }) => {
      return await addProductReview({ values, product: productId });
    },

    onSuccess: () => {
      toast.success("Review added successfully");
      localStorage.removeItem("pendingReview");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { error, isPending, addProductReviewFn: mutate, addReviewPayload: data };
}
