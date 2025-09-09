"use client";

import { CalendarHeart, ClipboardList, Flower, LayoutDashboard, Package } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import logo from "../../../../../public/assets/Images/logo 1.png";
import FooterSidebar from "./footer-sidebar";

export function AppSidebar() {
  // session
  const { data: session } = useSession();

  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Variables
  const firstName = session?.user.firstName;
  const fullName = `${firstName} ${session?.user.lastName}`;

  // Menu items.
  const items = [
    {
      title: t("overview"),
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: t("categories"),
      url: "/dashboard/categories",
      icon: ClipboardList,
    },
    {
      title: t("occasions"),
      url: "/dashboard/occasions",
      icon: CalendarHeart,
    },
    {
      title: t("products"),
      url: "/dashboard/products",
      icon: Package,
    },
  ];
  // PathName
  const pathName = usePathname();

  return (
    <Sidebar
      side={locale === "ar" ? "right" : "left"}
      className="w-[360px] p-6 dark:bg-zinc-800 dark:border-zinc-600 border-none"
    >
      <SidebarContent className="bg-white dark:bg-zinc-800">
        <SidebarHeader className=" justify-center items-center">
          {/* Logo */}
          <Link className="size-28" href="/">
            <Image alt="rose app logo" src={logo} width={120} className="w-full" />
          </Link>
          {/* Go to home Btn */}
          <Link
            href="/"
            role="button"
            className="flex items-center justify-center bg-maroon-600 dark:bg-soft-pink-200 dark:text-zinc-800 rounded-md p-[10px] w-full text-white gap-2 hover:bg-maroon-700 font-semibold text-base"
          >
            <Flower size={25} />
            <span>{t("preview-website")}</span>
          </Link>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {/* Navigation */}
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-60">
                  <SidebarMenuButton asChild>
                    <Link
                      className={cn(
                        "flex gap-[10px] font-bold text-lg space-x-2",
                        pathName === item.url ? "bg-maroon-50 text-maroon-600" : "",
                      )}
                      href={item.url}
                    >
                      <div>{item.icon && <item.icon size={25} />}</div>
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-white dark:bg-zinc-800 py-4 dark:border-t-zinc-600">
        <FooterSidebar
          email={session?.user.email ?? "user123@gmail.com"}
          firstName={firstName ?? "user"}
          fullName={fullName}
          photo={session?.user.photo ?? ""}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
