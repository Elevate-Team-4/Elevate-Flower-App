import Filter from "./_components/filter";
// Remove useSearchParams import, not needed in server components

export default async function products() {
  return (
    <div className="grid grid-cols-12 gap-6 mb-32 mt-16">
      {/* Filters */}
      <Filter />

      {/* Products List */}
      {/* add your product list */}
      <div className="col-span-9 bg-red-500 h-[11000px]"></div>
    </div>
  );
}
