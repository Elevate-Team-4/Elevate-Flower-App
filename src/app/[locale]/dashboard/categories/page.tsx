import React from "react";
// import { useTranslations } from "next-intl";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AllCategory } from "@/lib/types/category";
import Header from "./_components/header";
import Actions from "./_components/actions";

export default async function Page() {
  // Translations
  // const t = useTranslations();
  const option = await fetch("https://flower.elevateegy.com/api/v1/categories", {
    next: {
      tags: ["categories"],
    },
  });
  const payload: APIResponse<AllCategory> = await option.json();
  if ("error" in payload) {
    throw new Error(payload.message);
  }
  if (payload === undefined) {
    return <div>Loading..............</div>;
  }
  console.log(payload);

  return (
    <section className="m-4 p-3 rounded-2xl bg-white">
      <Header />
      <Table className="mt-6 p-5">
        <TableHeader className="w-screen bg-zinc-50">
          <TableRow>
            <TableHead className="font-medium text-[13px] text-zinc-900">Name</TableHead>
            <TableHead className="font-medium text-[13px] text-zinc-900" colSpan={2}>
              Products
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payload.categories.map((category) => (
            <TableRow key={category._id} className=" px-5 hover:bg-maroon-50 ">
              <TableCell className="font-mediu w-[200px]" colSpan={1}>
                {category.name}
              </TableCell>
              <TableCell>{category.productsCount}</TableCell>
              <TableCell className="flex gap-3 justify-end cursor-pointer">
                <Actions id={category._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
