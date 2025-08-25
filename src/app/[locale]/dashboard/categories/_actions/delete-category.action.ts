"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { Category } from "@/lib/types/category";
import { getTokenHeader } from "@/lib/utils/token-header";

export async function deleteCategory(id: string) {
  // Token
  const token = await getTokenHeader();

  const respone = await fetch(`${process.env.API}/categories/${id}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token} `,
    },
  });

  const payload: APIResponse<Category> = await respone.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
