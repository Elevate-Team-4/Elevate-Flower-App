import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import TableBtnActions from "./actions";
import CategoryTableHeader from "./category-table-header";
import { getAllCategories } from "../_apis/all-categories";

export default async function CategoryTable() {
  // All categories
  const payload = await getAllCategories();
  if (payload === undefined) {
    return <p>loading........</p>;
  }

  return (
    <Table className="mt-6 p-5">
      {/* Header */}
      <CategoryTableHeader />
      {/* Body */}
      <TableBody>
        {payload.categories.map((category) => (
          <TableRow
            key={category._id}
            className=" px-5 hover:bg-maroon-50 dark:hover:bg-soft-pink-300 "
          >
            <TableCell className="font-mediu w-[200px]" colSpan={1}>
              {category.name}
            </TableCell>
            <TableCell>{category.productsCount}</TableCell>
            <TableCell className="flex gap-3 justify-end cursor-pointer">
              {/* Btns actions */}
              <TableBtnActions id={category._id} name={category.name} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
