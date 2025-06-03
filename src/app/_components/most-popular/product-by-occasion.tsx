import { getProducts } from "@/lib/apis/products.api";
import SingleProduct from "../../../components/common/single-product";

// OccasionId Type
interface OccasionId {
  occasionId: string;
}

export default async function ProductsByOccasion({ occasionId }: OccasionId) {
  // Functions
  const response = await getProducts({ occasion: occasionId });
  if ("error" in response) {
    return <p>error</p>;
  }

  const { products } = response;

  // If There Are No Products In Occasion
  if (products.length === 0) {
    return (
      <div className="min-h-52 flex justify-center items-center">
        <p className="font-bold text-center text-4xl text-[#A6252A]">
          Coming soon...
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {products.map((product) => (
        <div key={product._id} className="col-span-3">
          <SingleProduct singleProduct={product} />
        </div>
      ))}
    </div>
  );
}
