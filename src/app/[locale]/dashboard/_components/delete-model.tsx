import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Trash, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteModel({
  id,
  deleteFn,
  name,
  isPending,
}: {
  id: string;
  deleteFn: (id: string) => void;
  name: string;
  isPending: boolean;
}) {
  // Translation
  const t = useTranslations();

  // States
  const [close, setclose] = useState(false);

  return (
    <Dialog onOpenChange={setclose} open={close}>
      {/* Dialog Trigger */}
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1 rounded-md py-1 px-2 bg-red-600/10 text-red-600 text-[12px] font-medium w-20">
          <Trash2 width={14} height={14} />
          {t("delete")}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[500px] h-[373px] dark:bg-zinc-600 ">
        {/* Dialg Header */}
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* Dialog Content */}
        <section className="flex-col justify-between flex h-[276px] ">
          <div className="flex items-center flex-col justify-center gap-6">
            <div className="size-[105px] bg-[#2E2E300D] rounded-full flex items-center justify-center ">
              <div className="size-[70px] bg-[#2E2E3026] flex items-center justify-center rounded-full">
                <Trash width={29} height={29} />
              </div>
            </div>
            <p className="font-semibold text-xl text-[#2E2E30] dark:text-zinc-50">
              {t("deleteConfirmation", { name })}
            </p>
          </div>
          <div className="flex gap-[10px]">
            {/* Cancel Btn */}
            <DialogClose className="w-full">
              <Button
                variant="outline"
                className="text-zinc-600 border-zinc-300 hover:bg-zinc-100 w-full"
              >
                {t("cancel")}
              </Button>
            </DialogClose>
            {/* Delete Btn */}
            <Button
              className="bg-red-600 text-white hover:bg-red-700 w-full"
              onClick={() => {
                deleteFn(id);
                setTimeout(() => {
                  setclose(false);
                }, 1000);
              }}
              disabled={isPending}
            >
              {t("confirm")}
            </Button>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
