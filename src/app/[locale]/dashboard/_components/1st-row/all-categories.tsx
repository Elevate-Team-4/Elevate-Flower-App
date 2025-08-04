"use client";

import { AllCategory, Categories } from "@/lib/types/category";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFormatter, useTranslations } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllCategories() {
  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Functions (fetching from route /api/categories)
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery<PaginatedResponse<AllCategory>>({
    queryKey: ["categories"], // Refetch when this changes
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/categories?page=${pageParam}&limit=5`); // Fetching from route handler
      if (!response.ok) throw new Error("Failed to fetch categories");
      return response.json();
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage >= lastPage.metadata.totalPages) return undefined; // Stop paginating
      return lastPage.metadata.currentPage + 1; // return next page number
    },
    initialPageParam: 1,
  });

  // Variables
  const allCategories: Categories[] = data?.pages.flatMap((page) => page.categories) ?? []; // Empty array during loading

  // Statements
  if (isLoading) {
    // loading state
    return (
      <div className="col-span-7 bg-white p-6 rounded-2xl flex flex-col">
        <h2 className="text-zinc-800 font-semibold text-2xl mb-4">{t("all-categories-title")}</h2>
        <ul className="flex flex-col gap-3 pe-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full rounded-xl bg-zinc-200" />
          ))}
        </ul>
      </div>
    );
  }

  if (isError) return <p className="text-maroon-600">{t("error-message")}</p>; // Error State

  return (
    <div className="col-span-7 bg-white p-6 rounded-2xl flex flex-col">
      {/* Heading */}
      <h2 className="text-zinc-800 font-semibold text-2xl mb-4">{t("all-categories-title")}</h2>

      {/* Categories */}
      <div className="h-56 overflow-auto pe-3" id="scrollable-categories">
        <InfiniteScroll
          dataLength={allCategories.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<Skeleton className="h-5 w-full rounded-xl bg-zinc-200" />}
          scrollableTarget="scrollable-categories"
        >
          <ul className="flex flex-col gap-3">
            {allCategories.map((category) => (
              <li
                key={category._id}
                className="flex justify-between pb-2 border-b border-b-zinc-200"
              >
                {/* Category name */}
                <span className="capitalize text-zinc-800">{category.name}</span>

                {/* Number of products */}
                <span className="bg-zinc-100 rounded-lg px-2 py-1 text-sm font-medium">
                  {category.productsCount === 0
                    ? t("no-products")
                    : t("number-of-products", {
                        count: format.number(category.productsCount, "number-format"),
                      })}
                </span>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </div>
  );
}
