import OccasionFilter from "./_components/occasion-filter";
import PriceFilter from "./_components/price-filter";
// Remove useSearchParams import, not needed in server components

export default async function products() {
  return (
    <div className="flex flex-nowrap gap-4 p-6">
      {/* sidebar */}
      <div className="w-[301px] flex flex-col pr-6 border-r-[1px] border-zinc-100">
        {/* Categories filter */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          {/* Add your Categories filter content  here */}
        </div>

        {/* Occasion filter */}
        <OccasionFilter />

        {/* Rating filter  */}
        <div className="mb-6 border-b-[1px] border-zinc-100 pb-6">
          <h3 className="font-semibold text-lg font-primary">Rating</h3>
          {/* Add your Rating filter content here */}
          <div className="flex gap-2 mt-4">
            {/* Example rating buttons */}
            <button className="px-3 py-1 bg-gray-200 rounded">1 Star</button>
            <button className="px-3 py-1 bg-gray-200 rounded">2 Stars</button>
            <button className="px-3 py-1 bg-gray-200 rounded">3 Stars</button>
            <button className="px-3 py-1 bg-gray-200 rounded">4 Stars</button>
            <button className="px-3 py-1 bg-gray-200 rounded">5 Stars</button>
          </div>
        </div>

        {/* Price filter */}
        <PriceFilter />
      </div>

      {/* Products grid */}
      {/* add your product list */}
    </div>
  );
}
