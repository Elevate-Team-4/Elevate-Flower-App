import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AllCategory } from "@/lib/types/category";
import TableBtnActions from "./actions";
import CategoryTableHeader from "./category-table-header";

export default async function CategoryTable() {
  const response = await fetch(`${process.env.API}/categories`, {
    next: {
      tags: ["categories"],
    },
    cache: "no-store",
  });

  const payload: APIResponse<AllCategory> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.message);
  }

  return (
    <Table className="mt-6 p-5">
      {/* Header */}
      <CategoryTableHeader />
      {/* Body */}
      <TableBody>
        {payload.categories.map((category) => (
          <TableRow key={category._id} className=" px-5 hover:bg-maroon-50 ">
            <TableCell className="font-mediu w-[200px]" colSpan={1}>
              {category.name}
            </TableCell>
            <TableCell>{category.productsCount}</TableCell>
            <TableCell className="flex gap-3 justify-end cursor-pointer">
              {/* Btns actions */}
              <TableBtnActions id={category._id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
