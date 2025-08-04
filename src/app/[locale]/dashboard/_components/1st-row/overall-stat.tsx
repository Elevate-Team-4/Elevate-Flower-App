import { CircleDollarSign, ClipboardList, Package, ReceiptText } from "lucide-react";
import { StatisticsCard } from "./overall-stat-card";
import { getOverallStatistics } from "@/lib/apis/statistics.api";
import { useFormatter, useTranslations } from "next-intl";

export default async function OverAllStat() {
  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Functions
  const respone = await getOverallStatistics();
  if ("error" in respone) {
    return <p>error</p>;
  }
  const { statistics } = respone;

  // Variables
  const totalProducts = format.number(statistics.totalProducts, "number-format");
  const totalOrders = format.number(statistics.totalOrders, "number-format");
  const totalCategories = format.number(statistics.totalCategories, "number-format");
  const totalRevenue = format.number(statistics.totalRevenue, "currency-int");

  return (
    <div className="col-span-5 grid grid-cols-2 bg-white p-6 rounded-2xl gap-4">
      {/* Total products */}
      <StatisticsCard
        icon={Package}
        bgColor="bg-maroon-50"
        iconColor="text-maroon-600"
        numberColor="text-maroon-600"
        textColor="text-zinc-800"
        number={totalProducts}
        label={t("total-products-label")}
      />

      {/* Total orders */}
      <StatisticsCard
        icon={ReceiptText}
        bgColor="bg-blue-50/70"
        iconColor="text-blue-600"
        numberColor="text-blue-600"
        textColor="text-zinc-800"
        number={totalOrders}
        label={t("total-orders-label")}
      />

      {/* Total categories */}
      <StatisticsCard
        icon={ClipboardList}
        bgColor="bg-purple-50/70"
        iconColor="text-purple-700"
        numberColor="text-purple-700"
        textColor="text-zinc-800"
        number={totalCategories}
        label={t("total-categories-label")}
      />

      {/* Total revenue */}
      <StatisticsCard
        icon={CircleDollarSign}
        bgColor="bg-emerald-50/70"
        iconColor="text-emerald-600"
        numberColor="text-emerald-600"
        textColor="text-zinc-800"
        number={totalRevenue}
        label={t("total-revenue-label")}
      />
    </div>
  );
}
