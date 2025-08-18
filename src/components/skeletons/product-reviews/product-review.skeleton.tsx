import React from "react";
import { Skeleton } from "../../ui/skeleton";

export default function ProductReviewSkeleton() {
  return (
    <section className="p-5 space-y-[10px] border-b">
      <div className="flex gap-[10px]">
        <Skeleton className="w-11 h-11 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-4 w-6" />
      </div>

      <section className="space-y-[6px]">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-32 w-full" />
      </section>

      <div className="flex gap-[10px]">
        <Skeleton className="w-11 h-11 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Skeleton className="h-5 w-20 rounded" />
        <Skeleton className="h-4 w-6" />
      </div>
    </section>
  );
}
