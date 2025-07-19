"use client";

import React, { useState } from "react";
import { LocationEdit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AdrdessForm from "./addres-model/address-form";
import useFetchAddresses from "@/hooks/address/use-fetch-addresses";
import AddressSkeleton from "@/components/skeletons/address/address.skeleton";
import Addresscard from "./addres-model/address-card";
import FormSteps from "./addres-model/form-steps";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";

export default function LocationHeader() {
  // Hooks
  const { isLoading, payload } = useFetchAddresses();

  // States
  const [steps, setSteps] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);

  // Translations
  const t = useTranslations();

  // session
  const { data: seesion } = useSession();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-0  text-center gap-2 flex flex-col items-center justify-center hover:bg-transparent"
        >
          <p className="text-zinc-500 text-sm font-normal whitespace-nowrap font-primary">
            {t("deliver-to")}
          </p>
          <div className="text-maroon-700 dark:text-soft-pink-200 flex flex-nowrap items-center gap-2 justify-center">
            <LocationEdit size={"20px"} />
            <p className=" font-medium text-base font-primary">
              {seesion?.user.addresses[0].city || t("cairo")}
            </p>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] space-y-6">
        <DialogHeader></DialogHeader>
        <div className="flex items-center justify-between ">
          <h2 className="font-bold text-3xl text-zinc-800 dark:text-zinc-50">
            {t("my-addresses")}
          </h2>

          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button variant="secondary">{t("add-a-new-address")}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[850px] ">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <FormSteps steps={steps} />
              <section>
                <AdrdessForm setSteps={setSteps} steps={steps} setOpenDialog={setOpenDialog} />
              </section>
            </DialogContent>
          </Dialog>
        </div>
        <section className="py-2 space-y-6">
          {/* overflow-y-scroll */}
          {/* Addresses */}
          {isLoading ? (
            <>
              <AddressSkeleton />
              <AddressSkeleton />
              <AddressSkeleton />
            </>
          ) : payload?.addresses.length === 0 ? (
            <div className="flex items-center justify-center h-96">
              <p className="text-2xl font-semibold text-zinc-800">{t("no-addresses-to-show")}</p>
            </div>
          ) : (
            payload?.addresses.map((address) => (
              <Addresscard
                address={address}
                key={address._id}
                setSteps={setSteps}
                steps={steps}
                setOpenDialog={setOpenDialog}
              />
            ))
          )}
        </section>
      </DialogContent>
    </Dialog>
  );
}
