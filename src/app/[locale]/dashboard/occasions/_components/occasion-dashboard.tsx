"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { occasions } from "@/lib/types/occasions";
import { getOccasions } from "@/lib/apis/occasions.api";
import { Input } from "@/components/ui/input";
import PaginationComponents from "@/components/common/Pagination-components";
import HeaderOccasionDashboard from "./header-occasion-dashboard";
import TableOccasionDashboard from "./table-occasion-dashboard";

export default function OccasionDashboard() {
  const [page, setPage] = useState(1);
  const [occasion, setOccasion] = useState<APIResponse<PaginatedResponse<occasions>>>();

  const searchParams = useSearchParams();
  const nameParam = searchParams.get("search") ?? undefined; // phone

  useEffect(() => {
    async function fetchData() {
      const response = await getOccasions({ limit: 10, page: page, search: nameParam });
      setOccasion(response);
    }
    fetchData();
  }, [page]);

  if (occasion && "error" in occasion) {
    return <p>error while fetching data</p>;
  }
  return (
    <div className="flex flex-col gap-6">
      {/* occasions CRUD */}
      <section className="flex flex-col gap-5 p-6">
        {/* Header */}
        <HeaderOccasionDashboard />

        {/* Search */}
        <form action="occasions" method="get">
          <Input type="search" name="search" placeholder="Search" />
        </form>

        {/* Table */}
        <TableOccasionDashboard occasions={occasion?.occasions ?? []} />
      </section>

      {/*Pagination */}
      <PaginationComponents
        setPage={setPage}
        page={page}
        metadata={occasion?.metadata ?? undefined}
      />
    </div>
  );
}
