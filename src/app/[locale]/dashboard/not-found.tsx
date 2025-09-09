import Image from "next/image";
import { useTranslations } from "next-intl";
import notFoundImage from "@/../public/assets/Images/9-404-error-illustration-2048x908-vp03fkyu 1.webp";

export default function DashboardNotFound() {
  // Translation
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Image src={notFoundImage} alt="servers down" width={400} height={0} />
      <h3 className="font-semibold text-3xl pb-3">{t("header-not-found")}.</h3>
      <p className="text-zinc-400">{t("desc-not-found")}</p>
    </div>
  );
}
