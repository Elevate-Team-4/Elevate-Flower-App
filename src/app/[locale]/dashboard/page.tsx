import { useTranslations } from "next-intl";
import { Suspense } from "react";
import FstRowSkeleton from "@/components/skeletons/1st-row/fst-row-skelton";
import FirstRow from "./_components/1st-row/first-overview-row";
import SecondRowSkeleton from "@/components/skeletons/overview-2nd-row/2nd-row-skeleton";
import Overview2ndRow from "./_components/2nd-row/overview-2nd-row";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <div className="grid grid-cols-12">
      {/* Side bar */}
      <div className="bg-soft-pink-500 col-span-3">Side Bar</div>

      {/* Content */}
      <div className="col-span-9 bg-zinc-50">
        {/* Page title */}
        <p className="text-gray-500 font-medium py-6 ps-4 mb-6 border border-b-zinc-200">
          {t("dashboard-title")}
        </p>

        {/* Content */}
        <div className="ms-4 me-6">
          {/* 1st Row */}
          <Suspense fallback={<FstRowSkeleton />}>
            <FirstRow />
          </Suspense>

          {/* 2nd Row */}
          <Suspense fallback={<SecondRowSkeleton />}>
            <Overview2ndRow />
          </Suspense>
          {/* 3rd Row */}
        </div>
      </div>
    </div>
  );
}
