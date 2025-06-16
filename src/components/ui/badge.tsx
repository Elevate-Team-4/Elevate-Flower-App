import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border border-zinc-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 dark:border-zinc-800 dark:focus:ring-zinc-300",
  {
    variants: {
      variant: {
        primary:
          "border-transparent rounded-full bg-maroon-600 text-white shadow hover:bg-maroon-700 dark:bg-soft-pink-300 dark:text-zinc-800 dark:hover:bg-soft-pink-400",
        secondary:
          "border-transparent rounded-full bg-maroon-50 text-maroon-600 hover:bg-maroon-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600",
        subtle:
          "border-transparent rounded-full bg-zinc-100 text-zinc-700 shadow hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-600",
        outline: "text-zinc-950 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
