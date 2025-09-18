"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Products, SearchParamProduct } from "@/lib/types/products";

export const useInfiniteProducts = (
  queryKey: string[],
  params?: SearchParamProduct & { sort?: string; page?: number },
) => {
  return useInfiniteQuery<
    PaginatedResponse<Products>,
    Error,
    PaginatedResponse<Products>,
    string[],
    number
  >({
    // إصلاح queryKey - فلترة القيم undefined
    queryKey: [...queryKey, ...(params?.sort ? [params.sort] : [])],
    queryFn: async ({ pageParam = 1 }) => {
      const query = new URLSearchParams({
        ...Object.fromEntries(Object.entries(params || {})),
        page: String(pageParam),
      });

      const res = await fetch(`/api/products?${query.toString()}`);
      const payload = await res.json();

      if ("error" in payload) throw new Error(payload.error);
      return payload;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage >= lastPage.metadata.totalPages) return undefined;
      return lastPage.metadata.currentPage + 1;
    },
    initialPageParam: 1,
  });
};
