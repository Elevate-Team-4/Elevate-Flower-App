"use client";

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

  const { toast } = useToast();

  useEffect(() => {
    // Fetch checkout session data
    const fetchCheckoutSession = async () => {
      const sessionData = await CheckCreditOrder(address);
      console.log("Checkout Session Data:", sessionData);
      setData(sessionData);
    };

    fetchCheckoutSession();
  }, [checked, address]);

  return (
    <div className="flex flex-col gap-6 h-3/5 py-3">
      {/* Progress Bar */}
      <div className="w-full relative bg-zinc-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
        <div
          className={cn(
            "bg-maroon-600 h-1.5 rounded-full dark:bg-blue-500 transition-all duration-700",
            step === 1 && "w-1/3",
            step === 2 && "w-2/3",
          )}
        />
        <div className="absolute inset-0 -top-[9px] flex justify-evenly">
          <span className="bg-maroon-600 font-semibold text-sm rounded-full text-white w-5 h-5 flex justify-center items-center ">
            1
          </span>
          <span className="bg-maroon-600 font-semibold text-sm rounded-full text-white w-5 h-5 flex justify-center items-center ">
            2
          </span>
        </div>
      </div>

      {/* Title  Shipping Address */}
      <h3 className="font-primary font-semibold text-3xl flex items-center justify-start gap-4">
        <Button
          variant={"subtle"}
          onClick={() => {
            if (step > 1) setStep(step - 1);
          }}
          disabled={step > 1 ? false : true}
          className={cn("w-[80px] border-none text-sm font-semibold", step === 1 && "hidden")}
        >
          <MoveLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        Payment Method
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
            <Image src={CashImg} alt="Cash on Delivery" />
            <h3
              className={cn(
                "text-2xl font-semibold font-primary group-hover:text-maroon-600",
                isActive && checked === "cash" && "text-maroon-600",
              )}
            >
              Cash on Delivery
            </h3>
            <p className="text-zinc-500 text-sm  font-semibold text-center">
              You’ll pay in cash when your order is delivered.
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
            <Image src={CreditImg} alt="Cash on Delivery" />
            <h3
              className={cn(
                "text-2xl font-semibold font-primary group-hover:text-maroon-600",
                isActive && checked === "credit" && "text-maroon-600",
              )}
            >
              Credit Card
            </h3>
            <p className="text-zinc-500 text-sm  font-semibold text-center">
              You’ll be securely redirected to Stripe to complete your payment.
            </p>
          </button>
        </div>
        {/* Checkout */}
        <div className="border-t flex items-center justify-end pt-4">
          {data && "session" in data && data.session?.url ? (
            <Button
              disabled={isActive ? false : true}
              className="w-[200px] flex flex-nowrap"
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
              Checkout
              <MoveRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button disabled className="w-[200px] flex flex-nowrap">
              {data && "error" in data ? data.error : "Loading..."}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
