"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import serverDownImage from "@/../public/assets/Images/server-down 1.webp";

export default function Error() {
  // Translation
  const t = useTranslations();

  return (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Image src={serverDownImage} alt="servers down" width={300} height={0} />
      <h3 className="font-semibold text-3xl pb-3">{t("header-error")}</h3>
      <p className="text-zinc-400">{t("desc-error")}</p>
    </div>
  );
}
