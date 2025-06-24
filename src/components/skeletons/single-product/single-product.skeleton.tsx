import { Skeleton } from "@/components/ui/skeleton";
/**
 *
 *
 * Single skeleton component inside a grid
 * Pass numbers of skeleton ui you want to use
 *
 */
export default function SingleProductSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="col-span-3">
          <div className="flex flex-col space-y-3 gap-4">
            <Skeleton className="h-72 w-72 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-52" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
