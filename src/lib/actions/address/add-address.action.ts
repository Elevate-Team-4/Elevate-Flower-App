"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { AddDressFormType } from "@/lib/schema/address-model/address-form.schema";
import { getTokenHeader } from "@/lib/utils/token-header";

export async function addAddress({ values }: { values: AddDressFormType }) {
  const token = await getTokenHeader();

  const response = await fetch(`${process.env.API}/addresses`, {
    method: "PATCH",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token.token}`,
    },
    body: JSON.stringify(values),
  });

  const payload: APIResponse<UserAddresses> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
