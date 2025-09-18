"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import { useFormatter } from "next-intl";
import { Product } from "@/lib/types/products";
import { useInfiniteProducts } from "@/hooks/use-Infinite-products";
import { cn } from "@/lib/utils";

export default function TopSellingProducts() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteProducts(
    ["top-selling-products"],
    {
      sort: "-sold",
    },
  );

  const tFormat = useFormatter();

  // Get products with type-safe access
  const products: Product[] = (() => {
    if (!data) return [];

    // Type assertion to check for infinite query structure
    const infiniteData = data as any;

    // إذا كان infinite query (يحتوي على pages)
    if (infiniteData.pages && Array.isArray(infiniteData.pages)) {
      return infiniteData.pages.flatMap((page: any) => page.products || []);
    }

    // إذا كان paginated response عادي (يحتوي على products مباشرة)
    const paginatedData = data as any;
    if (paginatedData.products && Array.isArray(paginatedData.products)) {
      return paginatedData.products;
    }

    return [];
  })();

  const gradientStyles = [
    {
      background:
        "linear-gradient(90deg, rgba(223, 172, 22, 0.25) 0%, rgba(223, 172, 22, 0.1) 100%)",
    },
    {
      background:
        "linear-gradient(90deg, rgba(117, 127, 149, 0.25) 0%, rgba(117, 127, 149, 0.1) 100%)",
    },
    {
      background: "linear-gradient(90deg, rgba(145, 68, 0, 0.25) 0%, rgba(145, 68, 0, 0.1) 100%)",
    },
  ];

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

  if (isLoading && products.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        <div className="h-96 overflow-auto pe-3">
          <SkeletonList />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col items-center justify-center h-full min-h-[300px]">
        <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
        <div className="text-center text-red-500">Error loading products</div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-2xl font-semibold mb-4">Top Selling Products</h2>
      <div className="h-86 overflow-auto pe-3" id="scrollable-top-selling">
        <InfiniteScroll
          dataLength={products.length}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<SkeletonList />}
          endMessage={
            products.length > 0 ? (
              <div className="text-center text-gray-400 text-sm">No more products to load</div>
            ) : null
          }
          scrollableTarget="scrollable-top-selling"
        >
          <ul className="flex flex-col gap-2">
            {products.map((product, index) => (
              <li
                key={product._id}
                className={cn(
                  "flex justify-between items-center px-2 py-1 rounded-sm w-full",
                  index >= 3 && "bg-gray-100",
                )}
                style={index < 3 ? gradientStyles[index] : {}}
              >
                {/* Product title  */}
                <span className="capitalize text-sm truncate overflow-hidden whitespace-nowrap max-w-[70%] text-zinc-800">
                  {product.title}
                  {product.price && (
                    <span className="ml-1 text-zinc-800 font-medium ">
                      ({tFormat.number(product.price, "currency-int").replace("EGP", "")}
                      <span className="ml-1 text-xs">EGP</span>)
                    </span>
                  )}
                </span>

                {/* Sales count */}
                <span className="font-bold text-zinc-800 text-sm flex-shrink-0 ml-2">
                  {product.sold ?? 0} <span className="font-medium"> Sales</span>
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
