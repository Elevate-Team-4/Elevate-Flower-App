import { Skeleton } from "@/components/ui/skeleton";
/**
 *
 *
 * Single skeleton component inside a grid
 * Pass numbers of skeleton ui you want to use
 *
 */
export default function FstRowSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left Section */}
      <div className="col-span-5 grid grid-cols-2 bg-white p-6 rounded-2xl gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="col-span-1 flex flex-col gap-3 p-4 rounded-2xl">
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="col-span-7 bg-white p-6 rounded-2xl flex flex-col gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className={`${i === 0 ? "h-10" : "h-8"} w-full rounded-xl`} />
        ))}
      </div>
    </div>
  );
}
