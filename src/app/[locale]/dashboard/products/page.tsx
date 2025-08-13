// import { useTranslations } from "next-intl";
import DashboardHeader from "@/components/common/dashboard-header";
import DashboardTable from "@/components/common/dashboard-table";
import { getProducts } from "@/lib/apis/products.api";

export default async function Page() {
  // Translation
  // const t = useTranslations();

  const response = await getProducts({
    fields: "title,price,quantity,sold,rateAvg,rateCount,imgCover,images",
    limit: 2,
  });
  if ("error" in response) {
    return <p>error</p>;
  }

  const { products } = response;

  return (
    <div className="ms-4 me-5 mt-5 bg-white rounded-2xl p-6">
      <DashboardHeader
        buttonHref="/dashboard/products/add-product"
        buttonTitle="Add a new product"
        title="All Products"
      />
      <DashboardTable
        data={products}
        colHeader={["Name", "Price", "Stock", "Sales", "Ratings"]}
        colEndPpoint={["title", "price", "quantity", "sold", "rateAvg"]}
        editHref="products" // Todo: need to be changed
        itemDeleteType="Product"
      />
    </div>
  );
}
