import { getOccasions } from "@/lib/api/occasions.api";
import { getAllCategory } from "@/lib/api/category";
import ProductForm from "../_components/product-form";

export default async function Page() {
  const occasions = await getOccasions();
  const categories = await getAllCategory();

  if (!("occasions" in occasions)) {
    return;
  }

  if (!("categories" in categories)) {
    return;
  }

  return <ProductForm occasions={occasions.occasions} categories={categories.categories} />;
}
