"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/i18n/navigation";

export default function ToggleLocale() {
  // Navigation
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale();

  // Dropdown Menu languages - إصلاح النوع
  const languages: Record<(typeof routing)["locales"][number], string> = {
    en: "English",
    ar: "العربية",
  };

  return (
    <DropdownMenu>
      {/* // Trigger */}
      <DropdownMenuTrigger>
        {languages[currentLocale as keyof typeof languages]}
      </DropdownMenuTrigger>

      {/* // Content */}
      <DropdownMenuContent>
        {routing.locales.map((locale) => (
          <Link key={locale} locale={locale} href={`${pathname}?${searchParams.toString()}`}>
            <DropdownMenuItem className={cn(locale === "ar" ? "font-zain" : "", " text-zinc-700")}>
              {languages[locale]}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
