"use client";

import { TicketPercent } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormatter, useLocale } from "use-intl";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Summary() {
  // Translations and formatting
  const t = useTranslations();
  const format = useFormatter();
  const locale = useLocale();

  return (
    <div className="w-[458px] h-[605px] flex flex-col gap-6">
      <h4>{t("summary.summary")}</h4>
      <div className="flex flex-col gap-3 p-4 bg-zinc-50 dark:rounded dark:bg-zinc-800">
        {/* Coupon */}
        <div className="flex gap-3">
          <Input placeholder={t("summary.coupon-code")} />
          <Button className="bg-maroon-500 text-white flex flex-nowrap">
            <TicketPercent className="mr-2" />
            {t("summary.apply-coupon")}
          </Button>
        </div>

        {/* Coupons */}
        <div className="h-60 flex justify-center items-center rounded-lg border dark:border-zinc-500">
          <p className="text-zinc-400 text-base">{t("summary.no-coupons-applied")}</p>
        </div>

        {/* Total */}
        <div className="flex flex-col gap-3 ">
          <div className="flex justify-between">
            <span className="font-medium text-lg text-zinc-800 font-primary dark:text-white">
              {t("summary.subtotal")}
            </span>
            <span className="font-semibold text-xl text-zinc-800 font-primary dark:text-white">
              {format.number(250, {
                style: "currency",
                currency: "EGP",
                numberingSystem: locale === "ar" ? "arab" : "latn",
              })}
            </span>
          </div>

          <div className="relative flex justify-center items-center py-3">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-300"></span>
            </div>
            <span className="bg-zinc-50 absolute -top-4 p-2 w-auto font-semibold text-base font-primary text-zinc-800 dark:bg-zinc-800 dark:text-white">
              {t("price-number-currency-discount", { price: 0.5 })}
            </span>
          </div>
        </div>
      </div>
      {/* total */}
      <div className="flex justify-between">
        <span className="font-medium text-lg text-zinc-800 font-primary dark:text-white">
          {t("summary.total")}
        </span>
        <span className="font-semibold text-xl text-zinc-800 font-primary dark:text-white">
          {format.number(125, {
            style: "currency",
            currency: "EGP",
            numberingSystem: locale === "ar" ? "arab" : "latn",
          })}
        </span>
      </div>
    </div>
  );
}
