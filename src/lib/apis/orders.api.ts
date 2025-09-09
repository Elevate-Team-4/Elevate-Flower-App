import { Orders } from "../types/orders";
import { getAuthHeader } from "../utils/auth-header";

// Get user orders
export const getOrders = async () => {
  // Declareing user orders API
  const url = new URL(`${process.env.API}/orders`);

  const response = await fetch(url.toString(), {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  // Returning the results
  const payload: APIResponse<PaginatedResponse<Orders>> = await response.json();

  return payload;
};
