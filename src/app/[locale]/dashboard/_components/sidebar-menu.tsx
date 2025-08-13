import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";

import { EllipsisVertical, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

export default function MenuItem({ fullName }: { fullName: string }) {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
        <EllipsisVertical size={18} color="#71717A" />
        <span className="sr-only">Toggle menu</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={locale === "ar" ? "end" : "start"}
        className="shadow-[0 4px 9px 0 #00000040] rounded-xl border w-56 border-zinc-100 p-[5px]  dark:bg-zinc-700"
      >
        {/* User full name */}
        <DropdownMenuItem className="flex cursor-pointer gap-2  py-[11px] px-[13px] border-b text-maroon-700 dark:text-soft-pink-200 text-sm font-semibold">
          {fullName}
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer gap-2 p-[5px] border-b">
          {/* Go to Account Page */}
          <Link
            href={"/dashboard/account"}
            className="flex items-center py-2 px-[6px] justify-center gap-2 font-medium"
          >
            <User width={16} height={16} /> {t("account")}
          </Link>
        </DropdownMenuItem>

        {/* Logout Btn */}
        <DropdownMenuItem className="flex cursor-pointer gap-2 ">
          <Button
            className="w-full justify-start p-0  font-medium  "
            variant={"ghost"}
            onClick={() => {
              signOut();
            }}
          >
            <LogOut /> {t("log-out")}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
