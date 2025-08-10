"use server";

import { OrderStatus } from "@/lib/types/statistics";
import { getAuthHeader } from "@/lib/utils/auth-header";

export async function getOrders() {
  const response = await fetch(`${process.env.API}/statistics/orders`, {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  if ("error" in response) {
    throw new Error("Error");
  }
  const payload: SuccessfulResponse<OrderStatus> = await response.json();

  return payload;
}
