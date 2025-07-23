import { Link } from "@/i18n/navigation";
import { OrderItemType } from "@/lib/types/orders";
import { Star } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Image from "next/image";

interface OrderItemParams {
  orderItem: OrderItemType;
}

export default function OrderItemCard({ orderItem }: OrderItemParams) {
  // Translations
  const format = useFormatter();
  const t = useTranslations();

  return (
    <div className="col-span-1 flex bg-zinc-50 dark:bg-zinc-700 rounded-lg overflow-hidden">
      {/* Cover Image */}
      <Link href={`/products/${orderItem.product._id}`}>
        <div className="h-36 w-28 relative">
          <Image
            src={orderItem.product.imgCover}
            fill={true}
            alt={orderItem.product.title}
            className="object-cover"
          />
        </div>
      </Link>

      {/* Details */}
      <div className=" flex flex-col justify-between p-2">
        <div>
          {/* Title */}
          <Link href={`/products/${orderItem.product._id}`}>
            <p className="text-maroon-700 dark:text-soft-pink-300 text-lg font-semibold">
              {orderItem.product.title}
            </p>
          </Link>

          {/* Rateings */}
          <p className="flex items-center">
            <Star fill="#FBA707" size={20} strokeWidth={0} className="me-1" />

            {/* Rate */}
            <span className="me-1 font-medium">
              <span className="font-normal">{t("rating")}</span> {orderItem.product.rateAvg}/5
            </span>

            {/* Reviews */}
            <Link
              href={`/products/${orderItem.product._id}`}
              className="lowercase text-blue-500 dark:text-blue-300 font-medium"
            >
              {t("ratings-count", { count: orderItem.product.rateCount })}
            </Link>
          </p>
        </div>

        {/* Price & count */}
        <div>
          <span className="lowercase text-sm text-maroon-600 dark:text-soft-pink-200  font-medium me-1">
            {t("quantity", { count: orderItem.quantity })}
          </span>
          <span className="text-2xl font-bold me-1">
            {format.number(orderItem.price, "currency-int")}
          </span>
        </div>
      </div>
    </div>
  );
}
