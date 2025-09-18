"use client";

import React, { useMemo } from "react";
import debounce from "lodash.debounce";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "@/i18n/navigation";
import { useSearchContext } from "@/components/providers/components/search.provider";

export default function Header() {
  // Context
  const { searchCategory, setSearchValue } = useSearchContext();

  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // Form
  const form = useForm({
    defaultValues: {
      searchValue: "",
    },
  });

  // Function
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        searchCategory(value);
      }, 100),
    [searchCategory],
  );

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
        <Input
          type="search"
          placeholder={t("search")}
          {...form.register("searchValue")}
          onChange={(e) => {
            debouncedSearch(e.target.value);
            setSearchValue(e.target.value);
          }}
        />
      </div>
    </section>
  );
}
