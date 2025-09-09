"use server";

import { getAuthHeader } from "@/lib/utils/auth-header";

type WishlistCheckResult = {
  inWishlist: boolean;
};

export async function checkWishlistAction(productId: string) {
  // Get token
  const token = (await getAuthHeader()).token;
  const response = await fetch(`${process.env.API}/wishlist/check/${productId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload: APIResponse<WishlistCheckResult> = await response.json();

  return payload;
}

export async function AddToWishlist(productId: string) {
  // Get token
  const token = (await getAuthHeader()).token;
  const response = await fetch(`${process.env.API}/wishlist`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId: productId,
    }),
  });

  const payload: APIResponse<WishlistCheckResult> = await response.json();

  return payload;
}

export async function removeFromWishlist(productId: string) {
  // Get token
  const token = (await getAuthHeader()).token;
  const response = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload: APIResponse<WishlistCheckResult> = await response.json();

  return payload;
}
