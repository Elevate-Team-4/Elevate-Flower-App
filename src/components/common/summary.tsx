import { TicketPercent } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Summary() {
  return (
    <div className="w-[458px] h-[605px] flex flex-col gap-6">
      <h4>Summary</h4>
      <div className="flex flex-col gap-3 p-4 bg-zinc-50">
        {/* Coupon */}
        <div className="flex gap-3">
          <Input placeholder="Coupon Code" />
          <Button className="bg-maroon-500 text-white flex flex-nowrap">
            <TicketPercent className="mr-2" />
            Apply Coupon
          </Button>
        </div>

        {/* Coupons */}
        <div className="h-60 flex justify-center items-center rounded-lg border">
          <p className="text-zinc-400 text-base">No coupons applied</p>
        </div>

        {/* Total */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="font-medium text-lg text-zinc-800 font-primary">Subtotal</span>
            <span className="font-semibold text-xl text-zinc-800 font-primary">250 Egp</span>
          </div>

          <div className="relative flex justify-center items-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-300"></span>
            </div>
            <span className="bg-white absolute -top-4 p-2 w-auto font-semibold text-base font-primary text-zinc-800">
              50% Discount
            </span>
          </div>

          {/* total */}
          <div className="flex justify-between">
            <span className="font-medium text-lg text-zinc-800 font-primary">Total</span>
            <span className="font-semibold text-xl text-zinc-800 font-primary">125 Egp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
