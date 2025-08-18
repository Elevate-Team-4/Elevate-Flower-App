import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductReviews } from "@/lib/apis/product-reviews.api";

export function useFetchProductReview({ productId }: { productId: string }) {
  const {
    data: payload,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["Product Reviewa", productId],
    queryFn: async ({ pageParam }) => {
      return await fetchProductReviews({ pageParam, productId });
    },
    initialPageParam: 1,
    getNextPageParam: (LastPage) => {
      if (LastPage.metadata.currentPage === LastPage.metadata.totalPages) return undefined;
      return LastPage.metadata.currentPage + 1;
    },
  });

  return {
    payload,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
