import { Address } from "@/lib/types/addresses";
import { getAuthHeader } from "@/lib/utils/auth-header";

export default async function CheckCashOrder(shippingAddress: Address) {
  const response = await fetch("https://flower.elevateegy.com/api/v1/orders", {
    method: "POST",
    headers: {
      ...(await getAuthHeader()),
    },
    body: JSON.stringify({
      shippingAddress: {
        street: shippingAddress.street,
        phone: shippingAddress.phone,
        city: shippingAddress.city,
        lat: shippingAddress.lat,
        long: shippingAddress.long,
      },
    }),
  });

  const payload = await response.json();

  if ("code" in payload) {
    throw new Error("Error");
  }

  return payload;
}
