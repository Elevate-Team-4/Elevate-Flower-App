import LowStockProducts from "./low-stock-products";
import TopSellingProducts from "./top-selling-products";

export default function ThirdRow() {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
        <TopSellingProducts />
        <LowStockProducts />
      </div>
    </div>
  );
}
