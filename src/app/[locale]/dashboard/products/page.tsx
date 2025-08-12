import { useTranslations } from "next-intl";
import DashboardHeader from "@/components/common/dashboard-header";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <div className="grid grid-cols-12">
      {/* Side bar */}
      <div className="bg-soft-pink-500 col-span-3">Side Bar</div>

      {/* Content */}
      <div className="col-span-9 bg-zinc-50">
        {/* Page title */}
        <p className="text-gray-500 font-medium py-6 ps-4 mb-6 border border-b-zinc-200">
          {t("dashboard-title")}
        </p>

        {/* Content */}
        <div className="ms-4 me-5 mt-5 bg-white rounded-2xl p-6">
          <DashboardHeader />
        </div>
      </div>
    </div>
  );
}
