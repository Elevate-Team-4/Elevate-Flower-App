import { useMutation } from "@tanstack/react-query";
import { updateProductAction } from "../_actions/update-product.action";

interface UpdateProductFields {
  title: string;
  description: string;
  quantity: number;
  price: number;
  discount?: number;
  priceAfterDiscount?: number;
  category: string;
  occasion: string;
}

export default function useUpdateProduct() {
  const { isPending, error, mutate, isSuccess, data } = useMutation({
    mutationFn: async ({
      productId,
      fields,
    }: {
      productId: string;
      fields: UpdateProductFields;
    }) => {
      const Sentdata = {
        title: fields.title,
        description: fields.description,
        quantity: fields.quantity,
        price: fields.price,
        discount: fields.discount,
        priceAfterDiscount: fields.priceAfterDiscount,
        category: fields.category,
        occasion: fields.occasion,
      };
      const payload = await updateProductAction(productId, Sentdata);

      if ("code" in payload) throw new Error(payload.message);

      return payload;
    },
  });

  return {
    isPending,
    error,
    updateProduct: mutate,
    isSuccess,
    data,
  };
}
