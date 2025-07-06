"use client";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import ResetComponent from "@/components/common/reset-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter } from "@/i18n/navigation";

// Types
type PriceForm = {
  priceFrom: string;
  priceTo: string;
};

export default function PriceFilter() {
  // Hooks
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Form
  const { register, watch, reset } = useForm<PriceForm>({
    defaultValues: {
      priceFrom: "",
      priceTo: "",
    },
  });
  const priceFrom = watch("priceFrom");
  const priceTo = watch("priceTo");

  // change URL when any change in form
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Add or remove priceFrom
    if (priceFrom) params.set("price[gt]", priceFrom);
    else params.delete("price[gt]");

    // Add or remove priceTo
    if (priceTo) params.set("price[lt]", priceTo);
    else params.delete("price[lt]");

    // Change the url
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(newUrl);
  }, [priceFrom, priceTo, pathname, router, searchParams]);

  return (
    <div className="mb-6 border-b-[1px] border-zinc-100 pb-6">
      {/* header occasion filter */}
      <div className="flex justify-between ">
        <h3 className="font-semibold text-lg font-primary">Price</h3>
        <ResetComponent
          paramKey={["price[gt]", "price[lt]"]}
          onResetFormValues={() => reset({ priceFrom: "", priceTo: "" })}
        />
      </div>

      {/* price filter component */}
      <div className="grid grid-cols-2 gap-2">
        {/* from input  */}
        <div className="flex flex-col gap-2 col-span-1">
          <Label className="">from</Label>
          <Input {...register("priceFrom")} type="number" placeholder="0" />
        </div>

        {/* to input */}
        <div className="flex flex-col gap-2 col-span-1">
          <Label className="">to</Label>
          <Input {...register("priceTo")} type="number" placeholder="10000" />
        </div>
      </div>
    </div>
  );
}
