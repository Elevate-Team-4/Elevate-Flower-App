"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { Product } from "@/lib/types/products";
import { useInfiniteProducts } from "@/hooks/use-Infinite-products";
import { cn } from "@/lib/utils";

export default function LowStockProducts() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteProducts(
    ["low-stock-products"],
    {
      sort: "quantity",
    },
  );

  // Get products from current pages
  const products: Product[] = data?.pages.flatMap((page) => page.products) ?? [];

  // Skeleton Loader
  const SkeletonList = () => (
    <ul className="flex flex-col gap-2 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <li key={i} className="flex justify-between items-center px-2 py-2 rounded-sm bg-gray-100">
          <span className="h-5 w-32 bg-gray-300 rounded"></span>
          <span className="h-5 w-10 bg-gray-300 rounded"></span>
        </li>
      ))}
    </ul>
  );

  // --- Loading and Error States ---
  if (isLoading && products.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-4">Low Stock Products</h2>
        <div className="h-96 overflow-auto pe-3">
          <SkeletonList />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col items-center justify-center h-full min-h-[300px]">
        <h2 className="text-xl font-semibold mb-4">Low Stock Products</h2>
        <div className="text-center text-red-600">Error loading products</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-4">Low Stock Products</h2>
      <div className="h-86 overflow-auto pe-3" id="scrollable-low-stock">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<SkeletonList />}
          endMessage={
            products.length > 0 ? (
              <div className="text-center text-gray-400 py-2 text-sm">No more products to load</div>
            ) : null
          }
          scrollableTarget="scrollable-low-stock"
        >
          <ul className="flex flex-col">
            {products.map((product) => (
              <li
                key={product._id}
                className="flex justify-between items-center py-1.5 border-b-2 px-2"
              >
                <span className="capitalize text-zinc-800 text-sm">{product.title}</span>
                <span
                  className={cn(
                    "font-medium text-sm",
                    product.quantity <= 4 ? "text-red-500" : "text-zinc-800",
                  )}
                >
                  {product.quantity} Products
                </span>
              </li>
            ))}
          </ul>
          {products.length === 0 && !isLoading && !isError && (
            <div className="text-center text-gray-500 py-4">No products found.</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
