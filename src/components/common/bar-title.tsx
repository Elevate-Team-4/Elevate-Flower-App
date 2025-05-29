import React from "react";
import { cn } from "@/lib/cn";

/**
 * TitleWithBars
 *
 * Displays a title with two decorative bars underneath:
 * - A wide soft background bar.
 * - A smaller bright highlight bar.
 *
 * Bar widths and title style can be customized via props.
 */

interface TitleWithBarsProps {
  title: string;
  mainBarWidth?: string;
  highlightBarWidth?: string;
  titleClassName?: string;
}

export default function BarTitle({
  title,
  mainBarWidth = "w-[70%]",
  highlightBarWidth = "w-1/4",
  titleClassName = "text-4xl",
}: TitleWithBarsProps) {
  return (
    <div className="relative w-fit">
      <p
        className={cn(
          // TODO Change text Color
          "font-inter relative z-20 font-bold text-[#741C21]",
          titleClassName
        )}
      >
        {title}
      </p>
      <div className="relative w-full z-0">
        <div
          className={cn(
            // TODO Change bg Color
            "bg-[#FFE0E7] h-4 rounded-e-full absolute -top-[18px]",
            mainBarWidth
          )}
        />
        <div
          className={cn(
            // TODO Change bg Color
            "bg-[#E65073] h-0.5 absolute -top-0.5",
            highlightBarWidth
          )}
        />
        <div />
      </div>
    </div>
  );
}
