"use client";
import {
  CalendarHeart,
  ClipboardList,
  EllipsisVertical,
  Flower,
  LayoutDashboard,
  LogOut,
  Package,
  User,
} from "lucide-react";
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
import Image from "next/image";
import logo from "../../../../../public/assets/Images/logo 1.png";

import { Link, usePathname } from "@/i18n/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";

export function AppSidebar() {
  // session
  const { data: session } = useSession();
  // Translations
  const t = useTranslations();

  // Variables
  const firstName = session?.user.firstName ?? "Mohamed";
  const fullName = `${firstName} ${session?.user.lastName ?? "Ali"}`;

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

  // Functions
  // Convert String to colors
  function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  }
  return (
    <Sidebar className="w-80 p-6 ">
      <SidebarContent className="bg-white">
        <SidebarHeader className=" justify-center items-center">
          {/* Logo */}
          <Link className="size-28" href="/">
            <Image alt="rose app logog" src={logo} width={120} height={0} className="w-full" />
          </Link>
          {/* Go to home Btn */}
          <Link
            href="/"
            role="button"
            className="flex items-center justify-center bg-maroon-600 rounded-md p-[10px] w-full text-white gap-2 hover:bg-maroon-700 font-semibold text-base"
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
                <SidebarMenuItem key={item.title} className="w-60 ">
                  <SidebarMenuButton asChild className="">
                    <Link
                      className={`flex gap-[10px] font-bold text-lg space-x-2 ${
                        pathName === item.url ? "bg-maroon-50 text-maroon-600" : ""
                      } `}
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
      <SidebarFooter className="border-t bg-white py-4">
        <div>
          <div className="flex items-center justify-between">
            {/* User Photo */}
            {session?.user.photo ? (
              <div className="size-14 rounded-full ">
                <Image
                  src={session.user.photo}
                  alt={session.user.firstName}
                  width={56}
                  height={0}
                />
              </div>
            ) : (
              // user First Letter
              <div
                className="size-14 flex items-center justify-center text-white  rounded-full"
                style={{ backgroundColor: stringToColor(fullName) }}
              >
                {firstName.slice(0, 1)}
              </div>
            )}

            <div className="flex flex-col">
              <div className="space-x-1">
                <span className="font-bold text-zinc-800 text-sm ">{fullName}</span>
              </div>
              {/* User Email */}
              <span className="font-semibold text-zinc-800 text-xs text-opacity-50">
                {session?.user.email ?? "mohamedali86@gmail.com"}
              </span>
            </div>
            {/* Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
                <EllipsisVertical size={18} color="#71717A" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="shadow-[0 4px 9px 0 #00000040] rounded-xl border w-56 border-zinc-100 p-[5px]  dark:bg-zinc-700"
              >
                {/* User full name */}
                <DropdownMenuItem className="flex cursor-pointer gap-2  py-[11px] px-[13px] border-b text-maroon-700 text-sm font-semibold">
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
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
