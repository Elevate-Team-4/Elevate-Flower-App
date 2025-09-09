"use client";

import React, { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type PaginationComponentsProps = {
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  metadata?: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
    nextPage?: number | undefined;
  };
};
export default function PaginationComponents({
  setPage,
  page,
  metadata,
}: PaginationComponentsProps) {
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

          {metadata &&
            Array.from({ length: metadata.totalPages }, (_, i) => i + 1).map((number) => (
              <PaginationItem key={number}>
                <PaginationLink
                  href="#"
                  isActive={page === number}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(number);
                  }}
                >
                  {number}
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
                if (page < (metadata?.totalPages ?? 1)) {
                  e.preventDefault();
                  setPage(page + 1);
                } else {
                  e.preventDefault();
                  setPage(1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
