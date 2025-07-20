"use client";

import { useQuery } from "@tanstack/react-query";
import { MoveRight, Phone } from "lucide-react";
import { useState } from "react";
import { Address } from "@/lib/types/addresses";
import { cn } from "@/lib/utils";
import LoadingSpin from "@/components/common/loading-spin";
import { Button } from "@/components/ui/button";
import getAddresses from "../_actions/addresses.action";

// Types
interface AddressStep1Props {
  step: number;
  address: Address;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setAddress: React.Dispatch<React.SetStateAction<object>>;
}

export default function AddressStep1({ step, address, setStep, setAddress }: AddressStep1Props) {
  // Hook
  const [isActive, setIsActive] = useState<boolean>(false);

  // Query to fetch addresses
  const { data, error, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  // Handle loading and error states
  if (isLoading) return <LoadingSpin />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {/* Title  Shipping Address */}
      <h3 className="font-primary font-semibold text-3xl">Shipping Address</h3>

      {/* content  */}
      <div className="flex flex-col gap-3 h-[675px] overflow-y-scroll">
        {/* address list */}
        {data?.addresses.map((addressMap: Address) => (
          // Address check button
          <button
            key={addressMap._id}
            onClick={() => {
              setAddress(addressMap);
              setIsActive(true);
            }}
            className={cn(
              "w-full flex flex-col gap-2 rounded-xl border border-zinc-300 relative p-4 hover:dark:bg-maroon-600",
              isActive && address._id === addressMap._id
                ? "bg-maroon-600 text-white"
                : "hover:bg-zinc-50",
            )}
          >
            {/* Header */}
            <div className={cn("flex justify-between items-center")}>
              <h4
                className={cn(
                  "text-zinc-800 font-primary font-semibold text-2xl dark:text-white",
                  isActive && address._id === addressMap._id && "text-white",
                )}
              >
                {addressMap.city}
              </h4>
              <div className="flex justify-between items-center gap-2">
                <span
                  className={cn(
                    "bg-maroon-600 rounded-full flex justify-center items-center gap-3 w-8 h-8 text-white ",
                    isActive && address._id === addressMap._id && "bg-white text-maroon-600",
                  )}
                >
                  <Phone className="w-5 h-5 " />
                </span>
                <span
                  className={cn(
                    "text-zinc-500 font-primary font-medium text-lg",
                    isActive && address._id === addressMap._id && "text-white",
                  )}
                >
                  {addressMap.phone}
                </span>
              </div>
            </div>

            {/* full address */}
            <span
              className={cn(
                "bg-zinc-100 py-1 px-3 max-w-min whitespace-nowrap rounded-xl text-primary text-zinc-800 font-medium text-base   ",
                isActive &&
                  address._id === addressMap._id &&
                  "bg-zinc-800 text-white dark:bg-zinc-800",
              )}
            >
              {addressMap.street}
            </span>
          </button>
        ))}
      </div>

      {/* add address */}
      <div className="flex flex-col gap-5 py-5">
        {/* Or */}
        <div className="w-full relative bg-zinc-100 rounded-full h-[1px] dark:bg-gray-700 text-center">
          <span className="absolute w-auto px-2 -top-3 bg-white text-lg font-semibold text-zinc-500 dark:text-white bg-zinc-800">
            OR
          </span>
        </div>

        {/* Button add address */}
        <Button variant={"secondary"} className="w-full">
          Add a New Address
        </Button>
      </div>

      {/* Next Button */}
      <Button
        onClick={() => {
          if (step < 2) setStep(step + 1);
        }}
        disabled={isActive ? false : true}
        className={cn("self-end w-[152px] disabled:dark:bg-zinc-500 ", step === 2 && "hidden")}
      >
        Next
        <MoveRight className="w-5 h-5 ml-2" />
      </Button>
    </>
  );
}
