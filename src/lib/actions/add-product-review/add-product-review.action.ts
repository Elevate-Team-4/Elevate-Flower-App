"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { ProductReviewField } from "@/lib/schema/add-product-review.schema";
import { getTokenHeader } from "@/lib/utils/tokenHeader";

type AddProdcutReviewProps = {
  values: ProductReviewField;
  product: string;
};
export async function addProductReview({ values, product }: AddProdcutReviewProps) {
  // Token
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/reviews`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify({
      product: product,
      ...values,
    }),
  });
  const payload: APIResponse<AddProductReviewResponse> = await response.json();
  if ("error" in payload) {
    throw new Error(payload.error);
  }
  return payload;
}
