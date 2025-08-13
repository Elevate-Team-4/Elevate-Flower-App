import React, { Suspense } from "react";
import CategoriesTableSkeleton from "@/components/skeletons/category/categories-table.skeleton";
import Header from "./_components/header";
import CategoryTable from "./_components/category-table";

export default async function Page() {
  return (
    <section className="m-4 p-3 rounded-2xl bg-white">
      {/* Page Header */}
      <Header />
      {/* Categories Table */}
      <Suspense fallback={<CategoriesTableSkeleton />}>
        <CategoryTable />
      </Suspense>
    </section>
  );
}
