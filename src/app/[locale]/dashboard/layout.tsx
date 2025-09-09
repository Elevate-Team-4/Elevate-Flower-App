import React from "react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import BreadCrumb from "./_components/bread-crumb";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" grid grid-cols-4 gap-5 dark:bg-zinc-800 w-screen">
      {/* Sidebar */}
      <SidebarProvider>
        <section className="col-span-1">
          <AppSidebar />
        </section>
      </SidebarProvider>

      <section className="h-screen col-span-3 border-s dark:border-s-zinc-50 p-3 ">
        {/* BreadCrumb */}
        <section className=" h-10 flex items-center border-b dark:border-b-zinc-50">
          <BreadCrumb />
        </section>

        {/* DashBoard Pages */}
        {children}
      </section>
    </main>
  );
}
