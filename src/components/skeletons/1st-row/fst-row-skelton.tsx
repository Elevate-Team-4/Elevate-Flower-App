import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
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
      <div className="col-span-5 grid grid-cols-2 p-6 rounded-2xl">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="col-span-1 flex flex-col gap-3 p-4 rounded-2xl">
            <Skeleton className="h-28 w-full rounded-xl bg-zinc-200" />
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="col-span-7 p-6 rounded-2xl flex flex-col gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className={cn(i === 0 ? "h-8" : "h-5", "w-full rounded-xl bg-zinc-200")} />
        ))}
      </div>
    </div>
  );
}
