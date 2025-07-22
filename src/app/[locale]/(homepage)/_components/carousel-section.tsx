import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import HomeCarousel from "./home-carousel";

export default function CarouselSection() {
  // Translation
  const t = useTranslations();
  return (
    <section className="container flex h-[441px]  flex-wrap justify-between gap-3 text-white">
      {/* Static image */}
      <div className="relative h-[439px] w-[301px] gap-[10px]">
        {/* Image */}
        <Image
          src="/assets/home-section-1-static.png"
          className="rounded-2xl"
          fill
          alt="red presents"
        />

        {/* Title and button */}
        <div className="absolute bottom-[10px] start-[10px] flex flex-col p-6">
          {/* Badge */}
          <Badge className="w-fit" variant="secondary">
            {t("home-carousel-badge", { price: 10.99 })}
          </Badge>
          {/* Title */}
          <h4 className="my-2 text-2xl font-semibold">{t("home-carousel-title")}</h4>
          {/* Button */}
          <Link
            href="/products"
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "px-rounded-2xl w-[130px] py-[10px]",
            )}
          >
            {t("home-section-one-button")} <ArrowRight className="rtl:rotate-180" />
          </Link>
        </div>
      </div>

      {/* Carousel */}
      <HomeCarousel />
    </section>
  );
}
