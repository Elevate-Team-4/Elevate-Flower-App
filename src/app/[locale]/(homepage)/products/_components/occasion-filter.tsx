"use client";

import { useTranslations } from "next-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ResetComponent from "@/components/common/reset-button";
import { cn } from "@/lib/utils";
import { useRouter } from "@/i18n/navigation";
import { occasion } from "@/lib/types/occasions";
import { getOccasions } from "../_hooks/occasions.action";

export default function OccasionFilter() {
  // variable
  const url_image = process.env.NEXT_PUBLIC_URL_IMAGE;

  // Translation
  const t = useTranslations();

  // hook
  const router = useRouter();
  const searchParams = useSearchParams();
  const value = searchParams.get("occasion");

  // useInfiniteQuery to fetch occasions
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ["occasions"],
    queryFn: ({ pageParam = 1 }) => getOccasions(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.metadata.currentPage === lastPage.metadata.totalPages) return undefined;
      return lastPage.metadata.currentPage + 1;
    },
    initialPageParam: 1,
  });

  const allOccasions = data?.pages.flatMap((page) => page.occasions) ?? [];

  // Handle error & loading ui
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-2.5 pb-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-20 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center"
          >
            <span className="text-gray-500">Loading...</span>
          </div>
        ))}
      </div>
    );
  }
  if (isError) return <p className="text-red-500">{t("error-message")}</p>;

  return (
    <div className="mb-6 border-b-2 border-zinc-100 dark:border-zinc-700 pb-6">
      {/* header occasion filter */}
      <div className="flex justify-between ">
        <h3 className="font-semibold text-lg font-primary">{t("product.occasion")}</h3>
        <ResetComponent paramKey="occasion" />
      </div>
      <InfiniteScroll
        dataLength={allOccasions.length}
        next={fetchNextPage}
        hasMore={hasNextPage || false}
        loader={<h4>Loading more...</h4>}
        height={"277px"}
      >
        <div className="grid grid-cols-2 gap-3 overflow-hidden">
          {allOccasions.map((occasion: occasion) => (
            <div
              key={occasion._id}
              className="relative flex items-center justify-center h-20 rounded-lg"
              onClick={() => router.push(`?occasion=${occasion._id}`)}
            >
              <Button
                className={cn(
                  "absolute rounded-lg z-30 w-full h-full flex justify-center items-center text-white text-base font-medium bg-gradient-to-t from-black to-transparent hover:bg-transparent hover:from-maroon-600 hover:to-transparent hover:from-10% dark:bg-gradient-to-t dark:hover:bg-transparent dark:hover:from-soft-pink-500 dark:text-white dark:hover:from-10%",
                  value === occasion._id && "from-maroon-600 to-transparent",
                )}
              >
                {occasion.name}
              </Button>
              <Image
                src={`${url_image}${occasion.image}`}
                alt={occasion.name}
                width={100}
                height={100}
                className="absolute z-20 rounded-lg object-cover w-full h-full "
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
