import React from "react";
import { AppSidebar } from "./_components/app-sidebar";

export default function dashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className=" flex gap-5">
      {/* Sidebar */}
      <section className="w-80">
        <AppSidebar />
      </section>
      {/* DashBoard Pages */}
      <section>{children}</section>
    </main>
  );
}
