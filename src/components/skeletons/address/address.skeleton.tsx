export default function AddressSkeleton() {
  return (
    <div className="border rounded-xl p-4 flex items-center justify-between animate-pulse space-x-4 shadow-sm w-full ">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div>
          <div className="h-4 w-20 bg-gray-300 rounded mb-2" />
          <div className="h-4 w-60 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-4 w-24 bg-gray-300 rounded" />
        <div className="flex flex-col gap-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
          <div className="w-6 h-6 bg-gray-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
