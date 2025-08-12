import { Input } from "@/components/ui/input";
import HeaderOccasionDashboard from "./header-occasion-dashboard";
import TableOccasionDashboard from "./table-occasion-dashboard";
import PaginationComponents from "./Pagination-components";

export default async function OccasionDashboard() {
  return (
    <div className="flex flex-col gap-6">
      {/* occasions CRUD */}
      <section className="flex flex-col gap-5 p-6">
        {/* Header */}
        <HeaderOccasionDashboard />

        {/* Search */}
        <form action="/search" method="get">
          <Input type="search" placeholder="Search" />
        </form>

        {/* Table */}
        <TableOccasionDashboard />
      </section>

      {/*Pagination */}
      <PaginationComponents />
    </div>
  );
}
