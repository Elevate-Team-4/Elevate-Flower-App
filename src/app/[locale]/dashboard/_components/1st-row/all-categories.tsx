import { ScrollArea } from "@/components/ui/scroll-area";
import { getCategoryStatistics } from "@/lib/apis/statistics.api";
import { useFormatter, useTranslations } from "next-intl";

export default async function AllCategories() {
  // Translation
  const t = useTranslations();
  const format = useFormatter();

  // Functions
  const response = await getCategoryStatistics();
  if ("error" in response) {
    return <p>error</p>;
  }

  const { statistics } = response;

  return (
    <div className="col-span-7 bg-white p-6 rounded-2xl flex flex-col">
      {/* Title */}
      <h2 className="text-zinc-800 font-semibold text-2xl mb-4">{t("all-categories-title")}</h2>

      {/* Category & Products number */}
      <ScrollArea className="h-56">
        <ul className="flex flex-col gap-3 pe-3">
          {statistics.map((category) => (
            <li key={category._id} className="flex justify-between pb-2 border-b border-b-zinc-200">
              {/* Category name */}
              <span className="capitalize text-zinc">{category.name}</span>

              {/* Product number */}
              <span className="bg-zinc-100 rounded-lg px-2 py-1 text-sm font-medium">
                {category.totalProducts === 0
                  ? t("no-products")
                  : `${t("number-of-products", { count: format.number(category.totalProducts, "number-format") })}`}
              </span>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
