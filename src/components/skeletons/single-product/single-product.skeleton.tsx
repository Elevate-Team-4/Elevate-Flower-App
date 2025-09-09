import { Skeleton } from "@/components/ui/skeleton";

/**
 * SingleProductSkeleton Component
 *
 * Displays a customizable grid of skeleton loaders,
 *
 * Props:
 * - count: Number of skeleton product cards to render (default: 4)
 * - containerColSpan: Tailwind col-span for the outer container (default: 12)
 * - containerGridCols: Number of grid columns in the container (default: 12)
 * - skeletonColSpan: Tailwind col-span for each individual skeleton card (default: 3)
 */

export default function SingleProductSkeleton({
  count = 4,
  containerColSpan = 12,
  containerGridCols = 12,
  skeletonColSpan = 3,
}) {
  return (
    // Outer container with responsive column span and grid layout
    <div className={`my-3 col-span-${containerColSpan} grid grid-cols-${containerGridCols} gap-6`}>
      {Array.from({ length: count }, (_, i) => (
        // Individual skeleton product card
        <div key={i} className={`col-span-${skeletonColSpan}`}>
          <div className="flex flex-col space-y-3 gap-5">
            {/* Image placeholder */}
            <Skeleton className="h-72 w-72 rounded-xl" />

            {/* Text lines placeholder */}
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
