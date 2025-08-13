"use client";

import { Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteProduct from "@/app/[locale]/dashboard/products/_hooks/use-delete-product";

interface DeletteDialogProbs {
  itemId: string;
  itemDeleteType: string;
}

export default function DeleteDialog({ itemId, itemDeleteType }: DeletteDialogProbs) {
  const { isPending, deleteProductFn } = useDeleteProduct();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="flex justify-center items-center gap-1 bg-maroon-500 bg-opacity-10 w-fit rounded-md px-2 py-1 text-maroon-500 font-medium text-xs hover:bg-opacity-100 hover:text-white">
            <Trash2 size={14} />
            Delete
          </button>
        </DialogTrigger>
        <DialogContent className="w-fit pt-8">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="size-[105px] bg-[#2E2E300D] rounded-full flex items-center justify-center ">
              <div className="size-[70px] bg-[#2E2E3026] flex items-center justify-center rounded-full">
                <Trash size={29} />
              </div>
            </div>
            <p className="font-semibold text-lg mt-7 text-zinc-800">
              Are you sure you want to delete this {itemDeleteType}?
            </p>
          </div>
          <DialogFooter className="pt-14 flex justify-center items-center">
            <DialogClose asChild>
              <Button variant="outline" className="text-zinc-800 border-zinc-400">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() => deleteProductFn(itemId)}
              isLoading={isPending}
              className="bg-red-600 px-2 py-1 font-medium"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
