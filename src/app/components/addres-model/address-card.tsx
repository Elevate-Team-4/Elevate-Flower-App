import { LocationEdit, PenLine, Phone, Trash2 } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddressDeleteModel from "./address-delete-model";
import AdrdessForm from "./address-form";
import FormSteps from "./form-steps";
import { useTranslations } from "next-intl";

export default function Addresscard({
  steps,
  setSteps,
  setOpenDialog,
  address,
}: {
  steps: number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  address: Address;
}) {
  // Translations
  const t = useTranslations();

  return (
    <section>
      <div className="border border-zinc-300 pt-6 pb-5 pe-9 ps-4 space-y-4 rounded-xl relative ">
        <div className="bg-white dark:bg-zinc-950 w-fit absolute -translate-y-1/2 top-0">
          <span className="font-semibold text-2xl text-maroon-600 dark:text-soft-pink-300">
            {t("work")}
          </span>
        </div>
        <div className="absolute start-full space-y-2 -translate-x-1/2 rtl:translate-x-1/2">
          <Dialog>
            {/* Edit Dialog */}
            <DialogTrigger>
              <Button className=" bg-zinc-50 size-9 rounded-full flex items-center justify-center border border-zinc-400 cursor-pointer">
                <PenLine className="text-zinc-800" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[850px]">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              {/* Form */}
              <FormSteps steps={steps} address={address} />
              <AdrdessForm
                setOpenDialog={setOpenDialog}
                setSteps={setSteps}
                steps={steps}
                address={address}
              />
            </DialogContent>
          </Dialog>

          {/* Delete Dialog */}

          <Dialog>
            <DialogTrigger asChild>
              <Button className=" bg-red-600 dark:bg-soft-pink-300 size-9 rounded-full flex items-center justify-center top-20">
                <Trash2 className="text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[500px] h-[373px] ">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <AddressDeleteModel id={address._id} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-[10px] col-span-1">
            <LocationEdit
              width={33}
              height={33}
              fill="#fff"
              className="bg-emerald-500 rounded-full p-[5px]"
            />
            <span className="font-semibold text-2xl text-zinc-800 dark:text-zinc-50">
              {address.city}
            </span>
          </div>
          <div className="flex items-center gap-[10px] col-span-1">
            <Phone width={33} height={33} className="p-1" />
            <span className="font-medium text-lg text-zinc-600 dark:text-zinc-50">
              {address.phone}
            </span>
          </div>
        </div>
        <div className="bg-zinc-100 py-1 px-3 w-fit rounded-md">
          <span className="font-medium text-base text-zinc-800 ">{address.street}</span>
        </div>
      </div>
    </section>
  );
}
