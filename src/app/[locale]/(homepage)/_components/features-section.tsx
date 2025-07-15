import { Headset, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
  // Translation
  const t = useTranslations();

  // Features list
  const featureItems = [
    {
      icon: <Truck strokeWidth={0.9} className="size-10" />,
      title: t("home-features-item-one-title"),
      description: t("home-features-item-one-desc", { price: 120 }),
    },
    {
      icon: <RefreshCw strokeWidth={0.9} className="size-10" />,
      title: t("home-features-item-two-title"),
      description: t("home-features-item-two-desc"),
    },
    {
      icon: <ShieldCheck strokeWidth={0.9} className="size-10" />,
      title: t("home-features-item-three-title"),
      description: t("home-features-item-three-desc", { count: 1 }),
    },
    {
      icon: <Headset strokeWidth={0.9} className="size-10" />,
      title: t("home-features-item-four-title"),
      description: t("home-features-item-four-desc"),
    },
  ];

  return (
    <section className="mx-auto my-10 flex w-[1279px] flex-wrap justify-between rounded-2xl bg-maroon-50 p-10 dark:bg-zinc-700">
      {featureItems.map((item, index) => {
        return (
          <div key={index} className="flex flex-wrap gap-4">
            {/* Icon */}
            <div className="flex size-[65px] items-center justify-center rounded-full bg-maroon-600 text-white dark:bg-softpink-200 dark:text-zinc-700">
              {item.icon}
            </div>
            <div className="flex flex-col gap-[5px]">
              <h4 className="text-xl font-semibold dark:text-softpink-200">{item.title}</h4>
              <p className="text-sm font-normal text-zinc-700 dark:text-zinc-300">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
