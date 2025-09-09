"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { OrderItemType } from "@/lib/types/orders";
import OrderItemCard from "./order-items-card";

interface OrderItemContaienrParams {
  orderItems: OrderItemType[];
}

export default function OrderItemsContainer({ orderItems }: OrderItemContaienrParams) {
  // Translations
  const t = useTranslations();

  // Hooks
  const [showAll, setShowAll] = useState(false);

  // Functions
  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  return (
    <div
      className={cn(
        !showAll && "max-h-64 relative",
        "p-4 grid grid-cols-2 bg-white dark:bg-zinc-800 rounded-lg gap-3 overflow-hidden",
      )}
    >
      {/* Order item cards */}
      {orderItems.map((item) => (
        <OrderItemCard orderItem={item} key={item._id} />
      ))}

      {/* Show all button (only showed if orderItems array length > 2) */}
      {orderItems.length > 2 && (
        <div
          className={cn(
            showAll
              ? "col-span-2 pt-3"
              : "absolute bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-black to-transparent",
            "w-full flex justify-center items-end pb-3",
          )}
        >
          <Button
            onClick={() => handleShowAll()}
            className="[&_svg]:size-6 flex flex-col gap-1 w-fit text-maroon-600 bg-transparent border-none shadow-none hover:bg-transparent dark:bg-transparent dark:text-soft-pink-400 dark:hover:bg-transparent dark:border-none"
          >
            <span className="font-medium text-base">
              {showAll ? <>{t("hide")}</> : <>{t("show")}</>}
            </span>
            {showAll ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      )}
    </div>
  );
}
