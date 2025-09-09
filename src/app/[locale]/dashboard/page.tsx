// import { useTranslations } from "next-intl";
import { Suspense } from "react";
import FstRowSkeleton from "@/components/skeletons/1st-row/fst-row-skelton";
import SecondRowSkeleton from "@/components/skeletons/overview-2nd-row/2nd-row-skeleton";
import FirstRow from "./_components/1st-row/first-overview-row";
import Overview2ndRow from "./_components/2nd-row/overview-2nd-row";
import ThirdRow from "./_components/third-row";

export default function Page() {
  return (
    <div className="grid grid-cols-12">
      {/* Content */}
      <div className="col-span-12 bg-zinc-50">
        {/* Content */}
        <div className="flex flex-col gap-6 ms-4 me-6">
          {/* 1st Row */}
          <Suspense fallback={<FstRowSkeleton />}>
            <FirstRow />
          </Suspense>

          {/* 2nd Row */}
          <Suspense fallback={<SecondRowSkeleton />}>
            <Overview2ndRow />
          </Suspense>
          {/* 3rd Row */}
          <ThirdRow />
        </div>
      </div>
    </div>
  );
}
