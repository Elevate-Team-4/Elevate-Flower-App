"use server";

import { JSON_HEADER } from "@/lib/constants/api.constant";
import { AddCategoryFormType } from "@/lib/schemas/categories/add-categories.schema";
import { Category } from "@/lib/types/category";
import { getTokenHeader } from "@/lib/utils/token-header";

export async function AddCategory({ values }: { values: AddCategoryFormType }) {
  const token = await getTokenHeader();

  const respone = await fetch(`${process.env.API}/categories`, {
    method: "POST",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token} `,
    },
    body: JSON.stringify(values),
  });

  const payload: APIResponse<Category> = await respone.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
