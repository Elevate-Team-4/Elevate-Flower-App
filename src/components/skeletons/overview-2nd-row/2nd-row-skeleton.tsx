import { Skeleton } from "@/components/ui/skeleton";

export default function SecondRowSkeleton() {
  return (
    <div className="w-full grid grid-cols-3 gap-5">
      {/* Orders Status */}
      <div className="bg-white p-4 shadow-sm col-span-1 rounded-xl h-full">
        <h2 className="text-center text-lg font-semibold mb-4">Orders Status</h2>

        <Skeleton className="w-full h-[380px] " />
      </div>

      {/* Revenue */}
      <div className="bg-white p-4 shadow-sm col-span-2 rounded-xl h-full">
        <h2 className="text-lg font-semibold mb-4">Revenue</h2>

        <Skeleton className="w-full h-[380px] " />
      </div>
    </div>
  );
}
