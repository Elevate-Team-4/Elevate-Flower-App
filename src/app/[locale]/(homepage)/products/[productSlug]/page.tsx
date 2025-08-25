import { getProductById } from "@/lib/api/products.api";
import ProductPage from "./_components/product-page";

export default async function Page({ params }: RouteProps) {
  const { productSlug, locale } = params;
  const product = await getProductById(productSlug);
  return (
    <>
      <ProductPage locale={locale} product={product.product} />
    </>
  );
}
