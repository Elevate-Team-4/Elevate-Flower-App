"use client";

import React from "react";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import useDeleteCategory from "../_hooks/use-delete-category";
import DeleteModel from "../../_components/delete-model";

export default function TableBtnActions({ id, name }: { id: string; name: string }) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Hooks
  const { deleteCategoryFn, isPending } = useDeleteCategory();

  return (
    <>
      <Button
        variant={"ghost"}
        className="bg-blue-600/10 flex items-center gap-1 rounded-md py-1 px-2 text-blue-600 text-[12px] font-medium w-20"
        onClick={() => {
          router.push(`/dashboard/categories/update-category/${name}?id=${id}`);
        }}
      >
        <Pencil width={14} height={14} /> {t("edit")}
      </Button>

      <DeleteModel deleteFn={deleteCategoryFn} id={id} name={t("category")} isPending={isPending} />
    </>
  );
}
