import { useMutation } from "@tanstack/react-query";
import { addProductAction } from "../_actions/product.action";

interface AddProductFields {
  title: string;
  description: string;
  quantity: number;
  price: number;
  discount?: number;
  priceAfterDiscount?: number;
  category: string;
  occasion: string;
  imgCover: File;
  images: File[];
}

export default function useAddProduct() {
  const { isPending, error, mutate, isSuccess, data } = useMutation({
    mutationFn: async (fields: AddProductFields) => {
      // Convert to FormData
      const formData = new FormData();

      formData.append("title", fields.title);
      formData.append("description", fields.description);
      formData.append("quantity", fields.quantity.toString());
      formData.append("price", fields.price.toString());

      if (fields.discount !== undefined) {
        formData.append("discount", fields.discount.toString());
      }

      if (fields.priceAfterDiscount !== undefined) {
        formData.append("priceAfterDiscount", fields.priceAfterDiscount.toString());
      }

      formData.append("category", fields.category);
      formData.append("occasion", fields.occasion);
      formData.append("imgCover", fields.imgCover);

      fields.images.forEach((image) => {
        formData.append("images", image);
      });

      const payload = await addProductAction(formData);

      if ("code" in payload) throw new Error(payload.message);

      return payload;
    },
  });

  return {
    isPending,
    error,
    addProduct: mutate,
    isSuccess,
    data,
  };
}
