import AllCategories from "./all-categories";
import OverAllStat from "./overall-stat";

export default function FirstRow() {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Over All stat */}
      <OverAllStat />

      {/* All Categories */}
      <AllCategories />
    </div>
  );
}
