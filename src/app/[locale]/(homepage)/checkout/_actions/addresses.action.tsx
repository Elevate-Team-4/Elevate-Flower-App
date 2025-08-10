// "use server";

import { Addresses } from "@/lib/types/addresses";
import { getAuthHeader } from "@/lib/utils/auth-header";

export default async function getAddresses() {
  const respones = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses`, {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload: APIResponse<Addresses> = await respones.json();
  if ("code" in payload) {
    throw new Error("Error");
  }

  return payload as SuccessfulResponse<Addresses>;
}
