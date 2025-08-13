import { useTranslations } from "next-intl";
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CategoryTableHeader() {
  // Translations
  const t = useTranslations();

  return (
    <TableHeader className="w-screen bg-zinc-50 dark:bg-zinc-600">
      <TableRow>
        <TableHead className="font-medium text-[13px] text-zinc-900 dark:text-zinc-50 text-start">
          {t("names")}
        </TableHead>
        <TableHead
          className="font-medium text-[13px] text-zinc-900 text-start dark:text-zinc-50"
          colSpan={2}
        >
          {t("products")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
