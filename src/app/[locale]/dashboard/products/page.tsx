import { getTranslations } from "next-intl/server";
import DashboardHeader from "@/components/common/dashboard-header";
import DashboardTable from "@/components/common/dashboard-table";
import { getProducts } from "@/lib/apis/products.api";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Translation
  const t = await getTranslations();

  // Variables
  const { search } = searchParams;

  // Functions
  const response = await getProducts({
    fields: "title,price,quantity,sold,rateAvg,rateCount",
    ...(search ? { search: search as string } : {}),
  });

  if ("error" in response) {
    return (
      <div className="col-span-5 bg-white p-6 rounded-2xl gap-4 text-maroon-500 flex justify-center items-center">
        <h2 className="text-center">Something Went Wrong!</h2>
      </div>
    );
  }

  const { products } = response;

  return (
    <div className="ms-4 me-5 mt-5 bg-white rounded-2xl p-6">
      <DashboardHeader
        buttonHref="/dashboard/products/add"
        buttonTitle={t("header-title-dashbord")}
        title={t("all-products-header-dashboard")}
      />

      {products.length === 0 ? (
        <p className="text-center text-2xl font-semibold !">{t("not-found-table")}</p>
      ) : (
        <DashboardTable
          data={products}
          colHeader={[
            t("table-name"),
            t("table-price"),
            t("table-stock"),
            t("table-sales"),
            t("table-ratings"),
          ]}
          colEndPpoint={["title", "price", "quantity", "sold", "rateAvg"]}
          editHref="products" // Todo: need to be changed
          itemDeleteType="product"
          itemDeleteString={t("product-delete-dialog")}
        />
      )}
    </div>
  );
}
