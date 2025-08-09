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
  mainBarWidth = "w-2/3",
  highlightBarWidth = "w-1/4",
  titleClassName = "text-4xl",
}: TitleWithBarsProps) {
  return (
    <p
      className={cn(
        // TODO Change text Color
        "font-inter relative font-bold text-[#741C21]",
        titleClassName,
        // Pseudo-element styles for decorative bars
        "before:content-[''] before:absolute before:z-0 before:bg-[#FFE0E7] before:h-4 before:w-40 before:rounded-e-full before:bottom-0 before:left-0",
        mainBarWidth === "w-2/3" ? "before:w-2/3" : mainBarWidth,
        "after:content-[''] after:absolute after:z-10 after:bg-[#E65073] after:h-0.5 after:w-16 after:bottom-0 after:left-0",
        highlightBarWidth === "w-1/4" ? "after:w-1/4" : highlightBarWidth
      )}
    >
      <span className="relative z-20">{title}</span>
    </p>
  );
}
