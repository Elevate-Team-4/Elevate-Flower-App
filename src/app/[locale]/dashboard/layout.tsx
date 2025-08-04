import React from "react";
import { AppSidebar } from "./_components/app-sidebar";

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" flex gap-5 dark:bg-zinc-800 w-screen">
      {/* Sidebar */}
      <section className="w-80 ">
        <AppSidebar />
      </section>

      {/* DashBoard Pages */}
      <section dir="" className=" h-screen w-3/4 ">
        {children}
      </section>
    </main>
  );
}
