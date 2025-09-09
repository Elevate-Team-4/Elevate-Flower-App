// "use server";

import { Addresses } from "@/lib/types/addresses";
import { getAuthHeader } from "@/lib/utils/auth-header";

export default async function getAddresses() {
  const token = await getAuthHeader();
  const respones = await fetch(`${process.env.NEXT_PUBLIC_API}/get-addresses`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  const payload: APIResponse<Addresses> = await respones.json();
  if ("code" in payload) {
    throw new Error("Error");
  }

  return payload as SuccessfulResponse<Addresses>;
}
