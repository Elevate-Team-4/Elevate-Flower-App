import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/apis/orders/get-orders";

export default function GetOrderByStatus() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["orders", "status", "pending"],
    queryFn: getOrders,
  });

  return { isPending, isError, data, error };
}
