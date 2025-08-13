"use client";

/**
 * DeleteDialog component
 *
 * A reusable confirmation dialog for deleting items in the dashboard.
 * Supports multiple delete types (product, occasion, category) with different hooks.
 *
 *
 * @param {string} props.itemId - The ID of the item to delete.
 * @param {"product" | "occasion" | "category"} props.itemDeleteType - The type of item to delete this handles which hook to use.
 * @param {string} props.itemDeleteString - This for making the translation dynamic
 *
 * @description
 * - Shows a delete icon that opens a dialog when clicked.
 * - Displays a warning message and two buttons: "Cancel" and "Confirm".
 * - Uses type-specific delete hooks to handle the deletion.
 * - Currently, only product deletion is implemented; other types are placeholders.
 */

import { Trash, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
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
  itemDeleteType: "product" | "occasion" | "category";
  itemDeleteString: string;
}

export default function DeleteDialog({
  itemId,
  itemDeleteType,
  itemDeleteString,
}: DeletteDialogProbs) {
  // Translation
  const t = useTranslations();

  // Hooks
  const productDelete = useDeleteProduct();
  // const occasionDelete = useDeleteOccasion(); // todo: Examples needs to be handled
  // const categoryDelete = useDeleteCategory(); // todo: Examples needs to be handled

  // Variables
  let isPending = false;
  let deleteFn: (id: string) => void = () => {};

  // Statements
  if (itemDeleteType === "product") {
    const { isPending: pending, deleteProductFn } = productDelete;
    isPending = pending;
    deleteFn = deleteProductFn;
  }

  // if (itemDeleteType === "category") { // todo: Examples needs to be handled
  //   const { isPending: pending, deleteCategoryFn } = occasionDelete;
  //   isPending = pending;
  //   deleteFn = deleteCategoryFn;
  // }

  // if (itemDeleteType === "occasion") { // todo: Examples needs to be handled
  //   const { isPending: pending, deleteOccasionFn } = categoryDelete;
  //   isPending = pending;
  //   deleteFn = deleteOccasionFn;
  // }

  return (
    <Dialog>
      {/* Delete icon */}
      <DialogTrigger asChild>
        <button className="flex justify-center items-center gap-1 bg-maroon-500 bg-opacity-10 w-fit rounded-md px-2 py-1 text-maroon-500 font-medium text-xs hover:bg-opacity-100 hover:text-white">
          <Trash2 size={14} />
          {t("delete")}
        </button>
      </DialogTrigger>

      {/* Content */}
      <DialogContent className="w-fit pt-8">
        <div className="w-full flex flex-col justify-center items-center">
          {/* Trash icon with eclipse */}
          <div className="size-[105px] bg-[#2E2E300D] rounded-full flex items-center justify-center ">
            <div className="size-[70px] bg-[#2E2E3026] flex items-center justify-center rounded-full">
              <Trash size={29} />
            </div>
          </div>

          {/* Warning */}
          <p className="font-semibold text-lg mt-7 text-zinc-800">
            {t("delet-dialog-table")} {itemDeleteString} {t("question-mark")}
          </p>
        </div>

        {/* Footer */}
        <DialogFooter className="pt-14 flex justify-center items-center gap-2">
          {/* Cancel button */}
          <DialogClose asChild>
            <Button variant="outline" className="text-zinc-800 border-zinc-400">
              {t("cancel")}
            </Button>
          </DialogClose>

          {/* Confirm Button */}
          <Button
            onClick={() => deleteFn(itemId)}
            isLoading={isPending}
            className="bg-red-600 px-2 py-1 font-medium"
          >
            {t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
