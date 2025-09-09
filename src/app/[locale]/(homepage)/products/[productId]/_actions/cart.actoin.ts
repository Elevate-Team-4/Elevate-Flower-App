"use server";

import { Cart } from "@/lib/types/cart";
import { getAuthHeader } from "@/lib/utils/auth-header";

type AddToCartResult = {
  message: string;
  numOfCartItems: number;
  cart: Cart;
};

export async function addToCartAction(productId: string, quantity: number = 1) {
  // Get token
  const token = (await getAuthHeader()).token;

  const response = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      product: productId,
      quantity: quantity,
    }),
  });

  const payload: APIResponse<AddToCartResult> = await response.json();

  return payload;
}
