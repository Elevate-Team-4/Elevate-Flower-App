"use client";

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationComponents() {
  const [page, setPage] = useState(1);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
            />
          </PaginationItem>

          {[1, 2, 3].map((num) => (
            <PaginationItem key={num}>
              <PaginationLink
                href="#"
                isActive={page === num}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(num);
                }}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem> */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
