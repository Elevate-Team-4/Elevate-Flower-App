"use client";

import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";

// Types
type ResetFilterProps = {
  paramKey: string | string[];
  onResetFormValues?: () => void;
};

export default function ResetComponent({ paramKey, onResetFormValues }: ResetFilterProps) {
  // Translation
  const t = useTranslations();

  // Hooks
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check search params in url for active
  const hasSearchParams = searchParams.toString().length > 0;

  // Functions
  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Check if the prop string or array
    if (Array.isArray(paramKey)) {
      paramKey.forEach((key) => params.delete(key));
    } else {
      params.delete(paramKey);
    }

    // Change the url
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl);
    if (onResetFormValues) onResetFormValues();
  };

  return (
    // Reset button
    <Button
      variant={"ghost"}
      className="justify-end w-auto text-red-500 disabled:text-black"
      disabled={!hasSearchParams}
      onClick={handleReset}
    >
      <X className="size-4" />
      <p className="text-sm">{t("reset")}</p>
    </Button>
  );
}
