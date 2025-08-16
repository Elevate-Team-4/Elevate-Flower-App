/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getAuthHeader } from "@/lib/utils/auth-header";

export async function addProductAction(formData: FormData) {
  const response = await fetch(`${process.env.API}/products`, {
    method: "POST",
    body: formData,
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload: APIResponse<any> = await response.json();

  return payload;
}
