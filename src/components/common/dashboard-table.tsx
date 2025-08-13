import { Pencil } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useFormatter } from "next-intl";
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
import DeleteDialog from "./delete-dialog";

type TableParamType<T extends Product | occasion> = {
  data: T[];
  colHeader: string[];
  colEndPpoint: (keyof T)[];
  editHref: string;
  itemDeleteType: string;
};

export default function DashboardTable<T extends Product | occasion>({
  data,
  colHeader,
  colEndPpoint,
  editHref,
  itemDeleteType,
}: TableParamType<T>) {
  const format = useFormatter();

  return (
    <ScrollArea className="h-[50px]">
      <Table className="mt-4">
        <TableHeader className="bg-zinc-50 w-full">
          <TableRow>
            {colHeader.map((header) => (
              <TableHead key={header} className="text-zinc-900 ps-5">
                {header}
              </TableHead>
            ))}
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody className="text-zinc-800">
          {data.map((item) => (
            <TableRow key={item._id} className="hover:bg-maroon-50">
              {colEndPpoint.map((endPoint) => {
                const value = item[endPoint];

                if (typeof value === "number") {
                  if (value <= 0 && endPoint === "quantity") {
                    return (
                      <TableCell key={String(endPoint)} className="ps-5 font-semibold">
                        Out of stock
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={String(endPoint)} className="ps-5 font-semibold">
                      {format.number(value, { style: "decimal", maximumFractionDigits: 2 })}
                    </TableCell>
                  );
                }

                return (
                  <TableCell key={String(endPoint)} className="ps-5 font-semibold">
                    {String(value)}
                  </TableCell>
                );
              })}

              <TableCell className="text-end">
                <div className="flex justify-end items-center gap-3">
                  <Link
                    href={`/dashboard/${editHref}/${item._id}`}
                    className="flex justify-center items-center gap-1 bg-blue-600 bg-opacity-10 w-fit rounded-md px-2 py-1 text-blue-600 font-medium text-xs hover:bg-opacity-100 hover:text-white"
                  >
                    <Pencil size={14} /> Edit
                  </Link>

                  <DeleteDialog itemId={item._id} itemDeleteType={itemDeleteType} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
