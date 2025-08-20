"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useSearchContext } from "@/components/providers/components/search.provider";
import CategoriesTableSkeleton from "@/components/skeletons/category/categories-table.skeleton";
import CategoryTableHeader from "./category-table-header";
import { useFetchCategories } from "../_hooks/use-fetch-categories";
import CategoryTableBody from "./category-table-body";

export default function CategoryTable() {
  // Context
  const { searchCategoryList, searchValue } = useSearchContext();

  // Translations
  const t = useTranslations();

  // Hooks
  const { categories, isLoading } = useFetchCategories();

  //Check
  if (isLoading) {
    return <CategoriesTableSkeleton />;
  }
  return (
    <Table className="mt-6 p-5">
      {/* Header */}
      <CategoryTableHeader />
      {/* Body */}
      <TableBody>
        {/* Categories */}
        {searchValue ? (
          searchCategoryList.length > 0 ? (
            searchCategoryList.map((category) => (
              <CategoryTableBody key={category._id} category={category} />
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-4 font-semibold text-4xl dark:text-zinc-50"
              >
                {t("no-categories-found")}
              </TableCell>
            </TableRow>
          )
        ) : categories?.categories && categories.categories.length > 0 ? (
          categories.categories.map((category) => (
            <CategoryTableBody key={category._id} category={category} />
          ))
        ) : (
          ""
        )}
      </TableBody>
    </Table>
  );
}
