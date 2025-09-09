/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAuthHeader } from "@/lib/utils/auth-header";

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

export async function updateProductAction(productId: string, fields: UpdateProductFields) {
  const response = await fetch(`${process.env.API}/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(fields),
    headers: {
      ...(await getAuthHeader()),
      "Content-Type": "application/json",
    },
  });
  const payload: APIResponse<any> = await response.json();

  return payload;
}
