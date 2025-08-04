import { useTranslations } from "next-intl";
import React from "react";

export default function page() {
  // Translations
  const t = useTranslations();

  return (
    <div className="text-center p-6 text-5xl font-bold text-maroon-600 dark:text-soft-pink-200">
      <h1>{t("dashboard-occasions")}</h1>
    </div>
  );
}
