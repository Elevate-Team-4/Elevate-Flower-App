import { Pencil } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "@/i18n/navigation";
import { occasion } from "@/lib/types/occasions";
import DeleteDialog from "@/components/common/delete-dialog";

export default function TableOccasionDashboard({ occasions }: { occasions: occasion[] }) {
  return (
    <div className="h-auto">
      <Table className="rounded-xl">
        <TableHeader className="bg-zinc-50">
          <TableRow className="h-10 hover:bg-zinc-50">
            <TableHead className="text-zinc-900">Name</TableHead>
            <TableHead className="text-zinc-900">Product</TableHead>
            <TableHead className="text-end text-zinc-900"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {occasions.map((occasion) => {
            return (
              <TableRow key={occasion._id} className="h-[60px] hover:bg-maroon-50">
                <TableCell className="font-medium ps-5 text-zinc-800">{occasion.name}</TableCell>
                <TableCell className="text-zinc-800">{occasion.productsCount} Product</TableCell>
                <TableCell className="text-end text-zinc-800">
                  <div className="flex justify-end items-center gap-3">
                    <Link
                      id={occasion._id}
                      href={`/dashboard/occasions/${occasion._id}`}
                      className="flex justify-center items-center gap-1 bg-blue-600 bg-opacity-10 w-fit rounded-md px-2 py-1 text-blue-600 font-medium text-xs hover:bg-opacity-100 hover:text-white"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                    {/* Delete */}

                    <DeleteDialog
                      itemId={occasion._id}
                      itemDeleteType={"occasion"}
                      itemDeleteString={"itemDeleteString"}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
