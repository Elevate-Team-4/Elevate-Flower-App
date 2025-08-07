import { Suspense } from "react";
import SecondRowSkeleton from "@/components/skeletons/overview-2nd-row/2nd-row-skeleton";
import Overview2ndRow from "./_components/2nd-row/overview-2nd-row";

export default async function dashboard() {
  return (
    <div className="w-full h-screen p-4 bg-gray-100 dark:bg-zinc-700">
      {/* 1st Row */}

      {/* 2nd Row */}
      <Suspense fallback={<SecondRowSkeleton />}>
        <Overview2ndRow />
      </Suspense>
      {/* 3rd Row */}
    </div>
  );
}
