import { JSON_HEADER } from "@/lib/constants/api.constant";
import { Address } from "@/lib/types/addresses";
import { CheckoutSessionTS } from "@/lib/types/checkout-session";

export default async function CheckCreditOrder(shippingAddress: Address) {
  // Waiting for merge auth pages for login
  // const token = await getDecodedToken();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjc4YTc4M2QzYzM3OTc0OTI3NDdjOGU2Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzcxMjc5OTd9.ey-sIWm8Z9QpiUNEfK5U-Ma5lzB2NxI7-DbKZfH1wfM";

  const response = await fetch(
    "https://flower.elevateegy.com/api/v1/orders/checkout?url=http://localhost:3000",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...JSON_HEADER,
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
