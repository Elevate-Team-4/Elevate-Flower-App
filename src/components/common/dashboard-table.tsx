/**
 * DashboardTable Component
 *
 * A reusable table component for displaying dashboard data like products, occasions, or categories.
 * Supports dynamic columns, localized formatting, and optional rating display.
 *
 * @template T - Must extend `Product`, `occasion`, or `Categories`.
 *
 * @param {Object} props
 * @param {T[]} props.data - The array of data to display in the table.
 * @param {string[]} props.colHeader - Column header labels (translated or static).
 * @param {(keyof T)[]} props.colEndPpoint - Keys from the data type to display as columns (order matters).
 * @param {string} props.editHref - Base URL path for edit links (e.g., `"products"` for `/dashboard/products/:id`).
 * @param {"product" | "occasion" | "category"} props.itemDeleteType - The type of item, passed to the delete dialog.
 * @param {string} props.itemDeleteString - The localized string representing the item for delete confirmation.
 *
 * />
 */

import { Pencil } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/lib/types/products";
import { occasion } from "@/lib/types/occasions";
import { Link } from "@/i18n/navigation";
import { Categories } from "@/lib/types/category";
import { cn } from "@/lib/cn";
import DeleteDialog from "./delete-dialog";

type TableParamType<T extends Product | occasion> = {
  data: T[];
  colHeader: string[];
  colEndPpoint: (keyof T)[];
  editHref: string;
  itemDeleteType: "product" | "occasion" | "category";
  itemDeleteString: string;
};

export default function DashboardTable<T extends Product | occasion | Categories>({
  data,
  colHeader,
  colEndPpoint,
  editHref,
  itemDeleteType,
  itemDeleteString,
}: TableParamType<T>) {
  // Translations
  const format = useFormatter();
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Table
      dir={locale === "ar" ? "rtl" : "ltr"}
      containerClassname="max-h-[60vh] overflow-y-auto relative"
    >
      {/* Header */}
      <TableHeader className="bg-zinc-50 sticky top-0">
        <TableRow>
          {colHeader.map((header) => (
            <TableHead key={header} className="text-zinc-900 ps-5 text-start">
              {header}
            </TableHead>
          ))}
          <TableHead />
        </TableRow>
      </TableHeader>

      {/* Body */}
      <TableBody className="text-zinc-800">
        {data.map((item) => (
          <TableRow key={item._id} className="hover:bg-maroon-50">
            {colEndPpoint.map((endPoint) => {
              // Getting the specefic item in the cell
              const value = item[endPoint];

              // If item type is nmber
              if (typeof value === "number") {
                // Check for enpoint if rateAvg to display rateCount with it
                if (endPoint === "rateAvg") {
                  return (
                    <TableCell key={String(endPoint)} className="ps-5 font-semibold py-4">
                      {format.number(value, { style: "decimal", maximumFractionDigits: 2 })}/5
                      {/* raecount here */}
                      <span className="text-xs ps-1">({(item as Product).rateCount})</span>
                    </TableCell>
                  );
                }

                // If item endpoint is quantity this is for handling negative values and less than 5 stock
                if (endPoint === "quantity") {
                  return (
                    <TableCell
                      key={String(endPoint)}
                      className={cn(value < 5 ? "text-red-600" : "", "ps-5 font-semibold py-4")}
                    >
                      {value < 0 ? t("table-out-of-stock") : value}
                    </TableCell>
                  );
                }

                // This is for formating other numbers like sales
                return (
                  <TableCell key={String(endPoint)} className="ps-5 font-semibold py-4">
                    {format.number(value, { style: "decimal", maximumFractionDigits: 2 })}
                  </TableCell>
                );
              }

              // This is if the value is not a number hence being a string
              return (
                <TableCell key={String(endPoint)} className="ps-5 font-semibold py-4">
                  {String(value)}
                </TableCell>
              );
            })}

            {/* Edit and Delete column */}
            <TableCell className="text-end">
              {/* Edit */}
              <div className="flex justify-end items-center gap-3">
                <Link
                  href={`/dashboard/${editHref}/${item._id}`}
                  className="flex justify-center items-center gap-1 bg-blue-600 bg-opacity-10 w-fit rounded-md px-2 py-1 text-blue-600 font-medium text-xs hover:bg-opacity-100 hover:text-white"
                >
                  <Pencil size={14} /> {t("edit-table-button")}
                </Link>

                {/* Delete */}
                <DeleteDialog
                  itemId={item._id}
                  itemDeleteType={itemDeleteType}
                  itemDeleteString={itemDeleteString}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
