// import { useTranslations } from "next-intl";
import { Suspense } from "react";
import FstRowSkeleton from "@/components/skeletons/1st-row/fst-row-skelton";
import FirstRow from "./_components/1st-row/first-overview-row";

export default function Page() {
  return (
    <div className="grid grid-cols-12">
      {/* Content */}
      <div className="col-span-12 bg-zinc-50">
        {/* Content */}
        <div className="ms-4 me-6">
          {/* 1st Row */}
          <Suspense fallback={<FstRowSkeleton />}>
            <FirstRow />
          </Suspense>

          {/* 2nd Row */}

          {/* 3rd Row */}
        </div>
      </div>
    </div>
  );
}
