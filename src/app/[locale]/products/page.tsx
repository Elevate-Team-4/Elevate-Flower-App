import { SearchParamProduct } from "@/lib/types/products";
import Filter from "./_components/filter";
import ProductList from "./_components/product-list";
import SingleProductSkeleton from "@/components/skeletons/single-product/single-product.skeleton";
import { Suspense } from "react";

export default function Page({ searchParams }: { searchParams?: SearchParamProduct }) {
  return (
    <div className="grid grid-cols-12 gap-6 mb-32 mt-16">
      {/* Filters */}
      <Filter />

      {/* Porduct list */}
      <Suspense
        fallback={
          <SingleProductSkeleton
            count={6}
            containerColSpan={9}
            containerGridCols={9}
            skeletonColSpan={3}
          />
        }
        key={searchParams?._id}
      >
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
