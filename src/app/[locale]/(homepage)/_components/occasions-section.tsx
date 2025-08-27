import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { Badge } from "@/components/ui/badge";

const OCCASIONS_IMAGES = [
  {
    image: "/assets/occasion-1.png",
    alt: "home-occasions-item-one-alt",
    badge: "home-occasions-item-one-badge",
    title: "home-occasions-item-one-title",
  },
  {
    image: "/assets/occasion-2.png",
    alt: "home-occasions-item-two-alt",
    badge: "home-occasions-item-two-badge",
    title: "home-occasions-item-two-desc",
  },
  {
    image: "/assets/occasion-3.png",
    alt: "home-occasions-item-three-alt",
    badge: "home-occasions-item-three-badge",
    title: "home-occasions-item-three-desc",
  },
];
export default function OccasionsSection() {
  // Translation
  const t = useTranslations();

  return (
    <section className="my-6 flex gap-6 text-white">
      {OCCASIONS_IMAGES.map((occasion, index) => {
        return (
          <Link href="/occasion" key={index} className="w-full">
            <div className="relative h-[271px] w-full overflow-hidden rounded-2xl">
              {/* Image */}
              <Image src={occasion.image} alt={t(occasion.alt)} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              <div className="absolute bottom-6 flex flex-col ltr:left-6 rtl:right-6">
                {/* Badge */}
                <Badge variant="secondary" className="w-fit">
                  {t(occasion.badge)}
                </Badge>
                {/* Title */}
                <h5 className="text-2xl font-semibold">{t(occasion.title)}</h5>
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
