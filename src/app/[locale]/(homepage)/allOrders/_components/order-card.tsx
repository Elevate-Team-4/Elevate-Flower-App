import { Badge } from "@/components/ui/badge";
import { Order } from "@/lib/types/orders";
import { Banknote, Check, CheckCheck, CreditCard, TriangleAlert, Truck } from "lucide-react";
import OrderItemsContainer from "./order-items-container";
import { useFormatter, useTranslations } from "next-intl";

interface orderCardProps {
  order: Order;
}

export default function OrderCard({ order }: orderCardProps) {
  // Translation
  const format = useFormatter();
  const t = useTranslations();

  return (
    <div className="rounded-xl bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="bg-maroon-600 flex justify-between p-4">
        {/* Order number */}
        <h3 className="text-white font-semibold text-2xl">
          {t("order-number")} {order.orderNumber}
        </h3>

        {/* Date */}
        <p className="text-zinc-100">
          {t.rich("created-in", {
            value: format.dateTime(new Date(order.createdAt), "full-date-time-no-day"),
            date: (chunks) => <span className="font-semibold">{chunks}</span>,
          })}
        </p>
      </div>

      {/* Total price & Status*/}
      <div className="flex justify-between m-4 border-b items-center border-zinc-200 pb-4">
        {/* Total price */}
        <div className="text-2xl font-medium">
          {t.rich("total-price", {
            value: format.number(order.totalPrice, "currency-int"),
            price: (chunks) => <span className="text-3xl font-bold me-4">{chunks}</span>,
          })}
          {
            // Paid badge
            order.isPaid && (
              <Badge className="bg-emerald-500 text-white hover:bg-emerald-500 dark:bg-emerald-400 hover:dark:bg-emerald-400 dark:text-zinc-800 dark:border-none">
                <Check size={20} className="me-2" />
                {t("paid")}
              </Badge>
            )
          }
        </div>

        {/* Status */}
        <div className="font-semibold">
          {t("status")}
          {
            // In Progress state
            order.state === "pending" && (
              <Badge className="ms-2 bg-blue-500 hover:bg-blue-500 dark:bg-blue-400 hover:dark:bg-blue-400 text-white">
                {t("in-progress-state")}
              </Badge>
            )
          }
          {
            // Canceled state
            order.state === "canceled" && (
              <Badge className="ms-2 bg-red-600 hover:bg-red-600 dark:bg-red-500 hover:dark:bg-red-500 text-white">
                {t("canceled-state")}
              </Badge>
            )
          }
          {
            // Done state
            order.state === "delivered" && (
              <Badge className="ms-2 bg-emerald-500 hover:bg-emerald-500 dark:bg-emerald-400 hover:dark:bg-emerald-400 text-white">
                {t("done-satate")}
              </Badge>
            )
          }
        </div>
      </div>

      {/* Delivery Status , Payment method & Order items*/}
      <div className="mx-4 mb-4 capitalize font-semibold">
        {/* Payment method */}
        <p className="flex items-center mb-3">
          {t("payment-method")}
          {
            // cash method
            order.paymentType === "cash" ? (
              <>
                <Banknote className="ms-2 me-1 text-zinc-500" size={20} />
                <span className=" text-zinc-500 font-medium">{t("cash")}</span>
              </>
            ) : (
              // Credit method
              <>
                <CreditCard className="ms-2 me-1 text-zinc-500" size={20} />
                <span className=" text-zinc-500 font-medium">{t("credit-card")}</span>
              </>
            )
          }
        </p>

        {/* Delivery Status */}
        <p className="flex items-center mb-3">
          {t("delivery-status")}
          {
            // Pending state
            order.state === "pending" && (
              <>
                <Truck className="ms-2 me-1 text-yellow-600" size={20} />
                <span className=" text-yellow-600 font-medium">{t("pending-delivery-status")}</span>
              </>
            )
          }
          {
            // Canceled state
            order.state === "canceled" && (
              <>
                <TriangleAlert className="ms-2 me-1 text-maroon-500" size={20} />
                <span className=" text-maroon-500 font-medium">
                  {t("canceled-delivery-status")}
                </span>
              </>
            )
          }
          {
            //  Delivered state
            order.state === "delivered" && (
              <>
                <CheckCheck className="ms-2 me-1 text-emerald-600" size={20} />
                <span className=" text-emerald-600 font-medium">
                  {t("delivered-delivery-status")}
                </span>
              </>
            )
          }
        </p>

        {/* Order items */}
        <p className="mb-2">{t("order-items")} </p>
        <OrderItemsContainer orderItems={order.orderItems} />
      </div>
    </div>
  );
}
