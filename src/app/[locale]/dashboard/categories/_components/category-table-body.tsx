import React from "react";
import { useTranslations } from "next-intl";
import { Categories } from "@/lib/types/category";
import { TableCell, TableRow } from "@/components/ui/table";
import TableBtnActions from "./actions";

export default function CategoryTableBody({ category }: { category: Categories }) {
  const t = useTranslations();
  return (
    <TableRow className=" px-5 hover:bg-maroon-50 dark:hover:bg-soft-pink-300 ">
      <TableCell className="font-mediu w-[200px]" colSpan={1}>
        {category.name}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {category.productsCount} <span>{t("products-0")}</span>
        </div>
      </TableCell>
      <TableCell className="flex gap-3 justify-end">
        {/* Btns actions */}
        <TableBtnActions id={category._id} name={category.name} />
      </TableCell>
    </TableRow>
  );
}
