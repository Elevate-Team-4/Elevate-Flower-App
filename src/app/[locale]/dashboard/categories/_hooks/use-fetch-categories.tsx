"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../_apis/all-categories";

export function useFetchCategories() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Categories"],
    queryFn: async () => {
      const payload = await getAllCategories();

      return payload;
    },
  });
  return { isLoading, error, categories: data };
}
