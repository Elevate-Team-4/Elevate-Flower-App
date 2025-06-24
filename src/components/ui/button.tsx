import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 w-[181px] px-4 py-3 whitespace-nowrap rounded-xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:bg-zinc-300 disabled:text-zinc-500 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        primary:
          "bg-maroon-600 text-white shadow hover:bg-maroon-700 dark:bg-soft-pink-300 dark:text-zinc-800 dark:hover:bg-soft-pink-400 disabled:dark:bg-zinc-700",
        destructive:
          "bg-red-600 text-white shadow hover:bg-red-700 dark:bg-red-500 dark:text-zinc-50 dark:hover:bg-red-600",
        secondary:
          "bg-maroon-50 text-maroon-600 shadow-sm hover:bg-maroon-100 dark:bg-zinc-700 dark:text-soft-pink-300 dark:hover:bg-zinc-600",
        outline:
          "border border-maroon-600 bg-white text-maroon-600 hover:text-maroon-600 shadow-sm hover:bg-maroon-50  dark:border-soft-pink-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-soft-pink-300 disabled:bg-zinc-100 disabled:border-zinc-300",
        subtle:
          "border border-zinc-400 bg-zinc-50 text-zinc-800 hover:text-zinc-800 shadow-sm hover:bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-50 disabled:bg-zinc-100 disabled:border-zinc-300",
        ghost:
          "hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-700 dark:hover:text-zinc-50 disabled:bg-zinc-100",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={isLoading || props.disabled} // Ensure button is disabled if isLoading or props.disabled
        {...props}
      >
        {isLoading && children ? <span className="ml-2">{children}</span> : children}

        {isLoading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin h-4 w-4 shrink-0 text-current"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : null}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
