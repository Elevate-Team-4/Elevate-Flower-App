import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import useDeleteAddress from "@/hooks/address/use-delete-address";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function AddressDeleteModel({ id }: { id: string }) {
  // Hooks
  const { deleteAddressFn, isPending } = useDeleteAddress();
  // Translation
  const t = useTranslations();
  return (
    <section className="flex-col justify-between flex h-[276px] ">
      <div className="flex items-center flex-col justify-center gap-6">
        <div className="size-[105px] bg-[#2E2E300D] rounded-full flex items-center justify-center ">
          <div className="size-[70px] bg-[#2E2E3026] flex items-center justify-center rounded-full">
            <Trash width={29} height={29} />
          </div>
        </div>
        <p className="font-semibold text-xl text-[#2E2E30] dark:text-zinc-50">{t("delete-msg")}</p>
      </div>
      <div className="flex gap-[10px]">
        <DialogClose className="w-full">
          <Button
            variant="outline"
            className="text-zinc-600 border-zinc-300 hover:bg-zinc-100 w-full"
          >
            {t("cancel")}
          </Button>
        </DialogClose>

        <Button
          className="bg-red-600 text-white hover:bg-red-700 w-full"
          onClick={() => deleteAddressFn(id)}
          disabled={isPending}
        >
          {t("confirm")}
        </Button>
      </div>
    </section>
  );
}
