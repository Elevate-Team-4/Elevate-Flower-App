"use server";
import { JSON_HEADER } from "@/lib/constants/api.constant";
import { OrderStatus } from "@/lib/types/statistics";
import { getDecodedToken } from "@/lib/utils/auth-header";

export async function getOrders() {
  const token = await getDecodedToken();

  const response = await fetch(`${process.env.API}/statistics/orders`, {
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token?.token || ""}`,
    },
  });

  if ("code" in response) {
    throw new Error("Error");
  }
  const payload: SuccessfulResponse<OrderStatus> = await response.json();

  return payload;
}
