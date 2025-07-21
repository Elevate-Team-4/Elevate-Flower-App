"use client";

import { useLocale, useTranslations } from "next-intl";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import CashImg from "@assets/Cash-on-Delivery.png";
import CreditImg from "@assets/Credit-Card.png";
import { Address } from "@/lib/types/addresses";
import { useToast } from "@/hooks/use-toast";
import { CheckoutSessionTS } from "@/lib/types/checkout-session";
import CheckCreditOrder from "../_actions/checkout-session.action";
import CheckCashOrder from "../_actions/cash-order.action";
// Types
interface AddressStep1Props {
  step: number;
  address: Address;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}
type SortOrder = "cash" | "credit";

export default function AddressStep2({ step, address, setStep }: AddressStep1Props) {
  // hook
  const [checked, setChecked] = useState<SortOrder>("cash");
  const [data, setData] = useState<APIResponse<CheckoutSessionTS> | APIResponse<ErrorResponse>>();
  const [isActive, setIsActive] = useState<boolean>(false);

  // Formatter and translations
  const t = useTranslations();
  const locale = useLocale();

  const { toast } = useToast();

  useEffect(() => {
    // Fetch checkout session data
    const fetchCheckoutSession = async () => {
      const sessionData = await CheckCreditOrder(address);
      setData(sessionData);
    };

    fetchCheckoutSession();
  }, [checked, address]);

  return (
    <>
      {/* Title  Shipping Address */}
      <h3 className="font-primary font-semibold text-3xl flex items-center justify-start gap-4">
        <Button
          variant={"subtle"}
          onClick={() => {
            if (step > 1) setStep(step - 1);
          }}
          disabled={step > 1 ? false : true}
          className={cn(
            "w-auto flex justify-evenly border-none text-sm font-semibold dark:bg-soft-pink-400 dark:text-zinc-800 dark:hover:bg-soft-pink-500",
            step === 1 && "hidden",
          )}
        >
          {locale === "ar" ? (
            <MoveLeft className="w-5 h-5 mr-2 rotate-180" />
          ) : (
            <MoveLeft className="w-5 h-5 mr-2" />
          )}
          {t("checkout.back")}
        </Button>
        {t("checkout.payment-method")}
      </h3>

      {/* content  */}
      <div className="flex flex-col gap-3">
        <div className=" grid grid-cols-2 gap-4 justify-center p-3">
          {/* Cash on Delivery */}
          <button
            onClick={() => {
              setChecked("cash");
              setIsActive(true);
            }}
            className="col-span-1 flex flex-col justify-center items-center gap-3 border rounded-xl p-4 hover:bg-zinc-50 group"
          >
            <Image
              className="dark:bg-slate-500 dark:group-hover:bg-zinc-50 dark:rounded-2xl"
              src={CashImg}
              alt="Cash on Delivery"
            />
            <h3
              className={cn(
                "text-2xl font-semibold font-primary group-hover:text-maroon-600",
                isActive && checked === "cash" && "text-maroon-600",
              )}
            >
              {t("checkout.cash-delivery")}
            </h3>
            <p className="text-zinc-500 text-sm  font-semibold text-center">
              {t("checkout.cash-title")}
            </p>
          </button>

          {/* Credit Card */}
          <button
            onClick={() => {
              setChecked("credit");
              setIsActive(true);
            }}
            className="col-span-1 flex flex-col  justify-center items-center gap-3 border rounded-xl p-4 hover:bg-zinc-50 group"
          >
            <Image
              src={CreditImg}
              alt="Cash on Delivery"
              className="dark:bg-slate-500 dark:group-hover:bg-zinc-50 dark:rounded-2xl"
            />
            <h3
              className={cn(
                "text-2xl font-semibold font-primary group-hover:text-maroon-600",
                isActive && checked === "credit" && "text-maroon-600",
              )}
            >
              {t("checkout.credit-card")}
            </h3>
            <p className="text-zinc-500 text-sm  font-semibold text-center">
              {t("checkout.credit-title")}
            </p>
          </button>
        </div>

        {/* Checkout */}
        <div className="border-t flex items-center justify-end pt-4">
          {data && "session" in data && data.session?.url ? (
            <Button
              disabled={isActive ? false : true}
              className="w-[200px] flex flex-nowrap justify-evenly "
              onClick={() => {
                if (checked === "credit") {
                  window.location.href = data.session.url;
                } else if (checked === "cash") {
                  CheckCashOrder(address).then((response) => {
                    if ("error" in response) {
                    } else {
                      toast({
                        variant: "success",

                        title: "Order Placed",
                        description: "Your order has been placed successfully.",
                      });
                    }
                  });
                }
              }}
            >
              {t("checkout.checkout")}
              {locale === "ar" ? (
                <MoveRight className="w-5 h-5 ml-2 rotate-180" />
              ) : (
                <MoveRight className="w-5 h-5 ml-2" />
              )}
            </Button>
          ) : (
            <Button disabled className="w-[200px] flex flex-nowrap">
              {data && "error" in data ? data.error : "Loading..."}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
