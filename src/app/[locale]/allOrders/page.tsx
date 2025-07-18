import { getOrders } from "@/lib/apis/orders.api";
import OrderCard from "./_components/order-card";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  // Translations
  const t = await getTranslations();

  // Functions
  const response = await getOrders();

  if ("error" in response) {
    return <p>error</p>;
  }
  const { orders } = response;

  // If there are no orders
  if (orders.length === 0) {
    return (
      <div className="text-maroon-500 font-semibold text-center text-2xl mt-16 dark:text-soft-pink-300">
        {t("no-orders")}
      </div>
    );
  }

  return (
    <>
      {/* Heading */}
      <h2 className="text-5xl mt-16 font-bold text-zinc-800 mb-6 dark:text-zinc-100">{t('orders-page-title')}</h2>

      {/* Order card */}
      <div className="flex flex-col gap-4 mb-16">
        {orders.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    </>
  );
}
