import { Star, StarHalf } from "lucide-react";
import { useLocale } from "next-intl";
import React from "react";

type StarsProps = {
  rating: number;
};

export default function Stars({ rating }: StarsProps) {
  // Translations
  const locale = useLocale();

  return (
    <>
      {!Number.isInteger(rating) && locale == "ar" && (
        <StarHalf fill="orange" className="text-orange-400" width={20} hanging={20} />
      )}
      {Array.from({ length: Math.floor(rating) }).map((_, i) => (
        <Star key={i} fill="orange" className="text-orange-400" width={20} hanging={20} />
      ))}
      {!Number.isInteger(rating) && locale == "en" && (
        <StarHalf fill="orange" className="text-orange-400" width={20} hanging={20} />
      )}
    </>
  );
}
