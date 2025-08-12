import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";

export default function TableOccasionDashboard() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-10 hover:bg-zinc-50">
          <TableHead className="w-[160px]">Name</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="text-end"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 6 }).map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell className="text-end">
                <div className="flex justify-end items-center gap-3">
                  <Link
                    href={"/dashboard/occasions/edit"}
                    className="flex justify-center items-center gap-1 bg-blue-600 bg-opacity-10 w-fit rounded-md px-2 py-1 text-blue-600 font-medium text-xs hover:bg-opacity-100 hover:text-white"
                  >
                    <Pencil width={14} height={14} /> Edit
                  </Link>
                  {/* Delete */}

                  <button className="flex justify-center items-center gap-1 bg-maroon-500 bg-opacity-10 w-fit rounded-md px-2 py-1 text-maroon-500 font-medium text-xs hover:bg-opacity-100 hover:text-white">
                    <Trash2 width={14} height={14} />
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
