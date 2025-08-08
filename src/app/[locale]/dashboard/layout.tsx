import React from "react";
import { AppSidebar } from "./_components/app-sidebar";

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" grid grid-cols-4 gap-5 dark:bg-zinc-800 w-screen">
      {/* Sidebar */}
      <section className="col-span-1">
        <AppSidebar />
      </section>

      {/* DashBoard Pages */}
      <section className="h-screen col-span-3">{children}</section>
    </main>
  );
}
