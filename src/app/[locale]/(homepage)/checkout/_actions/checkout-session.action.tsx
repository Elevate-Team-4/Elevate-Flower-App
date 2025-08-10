import { Address } from "@/lib/types/addresses";
import { CheckoutSessionTS } from "@/lib/types/checkout-session";
import { getAuthHeader } from "@/lib/utils/auth-header";

export default async function CheckCreditOrder(shippingAddress: Address) {
  const response = await fetch(
    "https://flower.elevateegy.com/api/v1/orders/checkout?url=http://localhost:3000",
    {
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
    },
  );

  const payload = await response.json();

  if ("error" in payload) {
    return payload as APIResponse<ErrorResponse>;
  }

  return payload as APIResponse<CheckoutSessionTS>;
}
