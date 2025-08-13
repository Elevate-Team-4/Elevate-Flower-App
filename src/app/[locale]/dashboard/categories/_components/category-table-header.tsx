import { useTranslations } from "next-intl";
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CategoryTableHeader() {
  // Translations
  const t = useTranslations();

  return (
    <TableHeader className="w-screen bg-zinc-50">
      <TableRow>
        <TableHead className="font-medium text-[13px] text-zinc-900 text-start">
          {t("names")}
        </TableHead>
        <TableHead className="font-medium text-[13px] text-zinc-900 text-start" colSpan={2}>
          {t("products")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
