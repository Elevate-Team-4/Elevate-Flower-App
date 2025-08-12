"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";

export default function Header() {
  const router = useRouter();
  return (
    <section className="space-y-4">
      <section className="flex justify-between">
        <h2 className="text-2xl font-semibold">All Categories</h2>
        <Button
          onClick={() => {
            router.push("/dashboard/categories/add-category");
          }}
        >
          <Plus />
          Add a new category
        </Button>
      </section>
      <div>
        <Input type="search" placeholder="search..." />
      </div>
    </section>
  );
}
