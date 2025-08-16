import { getOccasions } from "@/lib/api/occasions.api";
import { getAllCategory } from "@/lib/api/category";
import { getProductById } from "@/lib/api/products.api";
import ProductForm from "../_components/product-form";

export default async function Page({ params }: RouteProps) {
  const { productId } = await params;
  const occasions = await getOccasions();
  const categories = await getAllCategory();
  const product = await getProductById(productId || "");
  if (!("occasions" in occasions)) {
    return;
  }

  if (!("categories" in categories)) {
    return;
  }

  return (
    <div className="bg-gray-200  p-10">
      <ProductForm
        edit
        product={product.product}
        occasions={occasions.occasions}
        categories={categories.categories}
      />
    </div>
  );
}
