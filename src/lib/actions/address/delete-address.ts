"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { getTokenHeader } from "@/lib/utils/token-header";

export async function deleteAddress(id: string) {
  const token = await getTokenHeader();

  const respone = await fetch(`${process.env.API}/addresses/${id}`, {
    method: "DELETE",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token} `,
    },
  });

  const payload: APIResponse<UserAddresses> = await respone.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
