"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";

export default function Header() {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  return (
    <section className="space-y-4">
      <section className="flex justify-between">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
          {t("all-categories")}
        </h2>
        <Button
          onClick={() => {
            router.push("/dashboard/categories/add-category");
          }}
        >
          <Plus />
          {t("add-a-new-category")}
        </Button>
      </section>
      <div>
        <Input type="search" placeholder={t("search")} />
      </div>
    </section>
  );
}
