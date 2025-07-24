import SingleProduct from "@/components/common/single-product";
import { getProducts } from "@/lib/apis/products.api";
import { SearchParamProduct } from "@/lib/types/products";

export default async function ProductList({ searchParams }: { searchParams?: SearchParamProduct }) {
  // Functions
  const response = await getProducts(searchParams);

  if ("error" in response) {
    return <p>products not found</p>;
  }

  const { products } = response;

  return (
    <div className="col-span-9 grid grid-cols-9 gap-4">
      {products.map((product) => (
        <div key={product._id} className="col-span-3">
          <SingleProduct singleProduct={product} />
        </div>
      ))}
    </div>
  );
}
