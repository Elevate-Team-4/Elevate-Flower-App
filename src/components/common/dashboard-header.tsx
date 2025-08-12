import { Button } from "../ui/button";

export default function DashboardHeader() {
  return (
    <>
      <div className="flex justify-between">
        {/* Title */}
        <h2>All Products</h2>

        {/* Add new button */}
        <Button>  add a new product</Button>
      </div>
    </>
  );
}
