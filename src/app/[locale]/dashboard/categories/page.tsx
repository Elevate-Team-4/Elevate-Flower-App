import React from "react";
import Header from "./_components/header";
import CategoryTable from "./_components/category-table";

export default async function Page() {
  return (
    <section className="rounded-2xl bg-white dark:bg-zinc-700">
      {/* Page Header */}
      <Header />
      {/* Categories Table */}
      <CategoryTable />
    </section>
  );
}
