import React from "react";
import OccasionFilter from "./occasion-filter";
import PriceFilter from "./price-filter";

export default function Filter() {
  return (
    <div className="sticky top-0 h-screen overflow-y-auto col-span-3 flex flex-col pe-6 border-e-2 border-zinc-100 dark:border-zinc-700">
      {/* Categories filter */}
      <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        {/* Add your Categories filter content  here */}
      </div>

      {/* Occasion filter */}
      <OccasionFilter />

      {/* Rating filter  */}
      <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
        <h3 className="font-semibold text-lg font-primary">Rating</h3>
      </div>

      {/* Price filter */}
      <PriceFilter />
    </div>
  );
}
