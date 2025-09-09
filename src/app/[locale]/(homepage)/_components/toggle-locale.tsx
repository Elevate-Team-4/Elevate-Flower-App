"use client";

import { Locale, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ToggleLocale() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const locale = useLocale();
  const language = {
    en: "English",
    ar: "العربية",
  };

  // Functions
  const toggleLocale = (locale: Locale) => {
    router.push(`${pathname}?${searchParams.toString()}`, {
      locale,
    });
  };

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger className="border-none outline-none dark:text-zinc-50">
        {locale === "ar" ? "العربية" : "English"}
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent>
        {routing.locales.map((locale) => (
          <DropdownMenuItem onClick={() => toggleLocale(locale)} key={locale}>
            {language[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
