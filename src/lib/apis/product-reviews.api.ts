type FetchProductReviewsProps = {
  pageParam: number;
  productId: string;
};
export async function fetchProductReviews({ pageParam, productId }: FetchProductReviewsProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/get-product-reviews/${productId}?page=${pageParam}`,
  );

  const payload: APIResponse<PaginatedResponse<AddProductReviewResponse>> = await response.json();

  if ("error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}
