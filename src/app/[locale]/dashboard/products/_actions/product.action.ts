"use server";

import { revalidatePath } from "next/cache";
import { getAuthHeader } from "@/lib/utils/auth-header";
import { Products } from "@/lib/types/products";

export default async function deleteProductAction(productId: string) {
  const headers = await getAuthHeader();

  const response = await fetch(`${process.env.API}/products/${productId}`, {
    method: "DELETE",
    headers,
  });

  const payload: APIResponse<Products> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  // Revalidate so the UI updates without a manual refresh
  revalidatePath("/dashboard/products");

  return payload;
}