"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

export default function BreadCrumb() {
  // Navigayion
  const pathname = usePathname();

  // Variables
  const paths = pathname.split("/");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => (
          <div key={path} className="flex items-center gap-2">
            <BreadcrumbItem>
              <Link
                href={`/${paths.slice(0, index + 1).join("/")}`}
                className={cn(
                  paths.slice(0, index + 1).join("/") === pathname
                    ? "text-maroon-600 dark:text-soft-pink-200"
                    : "text-zinc-500 hover:text-maroon-600 dark:text-zinc-700 hover:dark:text-soft-pink-200",
                )}
              >
                {/* Capitalize the first letter */}
                {path
                  .split("-")
                  .map((letter) => letter.charAt(0).toUpperCase() + letter.slice(1))
                  .join(" ")}
              </Link>
            </BreadcrumbItem>
            {/* Spearator not in first and last */}
            {index > 0 && index < paths.length - 1 && <BreadcrumbSeparator />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
