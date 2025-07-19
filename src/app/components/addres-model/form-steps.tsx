import { cn } from "@/lib/utils";
import { useFormatter, useTranslations } from "next-intl";
import React from "react";

export default function FormSteps({ steps, address }: { steps: number; address?: Address }) {
  // Translations
  const t = useTranslations();
  const format = useFormatter();
  return (
    <>
      <div className="w-full">
        <h2 className="font-bold text-3xl text-zinc-800 mb-6 dark:text-zinc-50">
          {address ? t("update-address-info") : t("add-a-new-address")}
        </h2>
        <div className="p-3 flex items-center justify-between">
          <div className="w-1/3 relative">
            <div className="h-2 rounded-full bg-maroon-600 dark:bg-soft-pink-300" />
          </div>

          <div className="w-1/3 relative">
            <div
              className={cn(
                "h-2 rounded-full",
                steps >= 2 ? "bg-maroon-600 dark:bg-soft-pink-300" : "bg-gray-100",
              )}
            />
            <div
              className={cn(
                "w-8 h-8 absolute top-0",
                "start-0 rtl:translate-x-1/2 -translate-x-1/2",
                "-translate-y-1/2 text-white bg-maroon-600 dark:bg-soft-pink-300 rounded-full border-2 border-gray-200 flex items-center justify-center",
              )}
            >
              {format.number(1, "number-base")}
            </div>
          </div>

          <div className="w-1/3 relative">
            <div className={cn("h-2 rounded-full bg-gray-100")} />
            <div
              className={cn(
                `w-8 h-8 absolute top-0`,
                "start-0 rtl:translate-x-1/2 -translate-x-1/2",
                `-translate-y-1/2 rounded-full border-2 border-gray-200 flex items-center text-black justify-center`,
                steps === 2 ? "bg-maroon-600 dark:bg-soft-pink-300 text-white" : "bg-gray-100",
              )}
            >
              {format.number(2, "number-base")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
