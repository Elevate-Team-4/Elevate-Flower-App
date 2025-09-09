import Image from "next/image";
import { useTranslations } from "next-intl";
import lockSheild from "@/../public/assets/Images/lock-shield.webp";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  // Translation
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image src={lockSheild} alt="servers down" width={300} height={0} />
      <h3 className="font-semibold text-3xl pb-3">{t("header-no-permission")}</h3>
      <p className="text-zinc-400">{t("desc-co-permission")}</p>
      <Separator className="w-80 my-3" />
      <Link href={"/"}>
        <Button
          variant={"outline"}
          className="text-zinc-800 font-semibold border-zinc-100 hover:bg-zinc-50 hover:text-zinc-800 "
        >
          {t("go-to-homepage")}
        </Button>
      </Link>
    </div>
  );
}
