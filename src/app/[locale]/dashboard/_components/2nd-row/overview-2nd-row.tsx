import { getOrders } from "@/lib/apis/order.api";
import { RevenueChart } from "./revenue-chart";
import { OrdersStatusChart } from "./orders-status-chart";

export default async function Overview2ndRow() {
  const data = await getOrders();
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <OrdersStatusChart ordersByStatus={data.statistics.ordersByStatus} />
      </div>
      <div className="col-span-3">
        <RevenueChart
          monthlyRevenue={data.statistics.monthlyRevenue}
          dailyRevenue={data.statistics.dailyRevenue}
        />
      </div>
    </div>
  );
}
