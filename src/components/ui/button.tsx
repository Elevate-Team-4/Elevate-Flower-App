import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-[14px] font-[600px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        default:
          "w-[181px] bg-maroon-600 dark:bg-soft-pink-300 hover:bg-maroon-700 dark:hover:bg-soft-pink-400 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-zinc-50 dark:text-zinc-800 disabled:text-zinc-500  dark:disabled:text-zinc-600 shadow",
        destructive:
          "w-[181px] bg-maroon-50 dark:bg-zinc-700 hover:bg-maroon-100 dark:hover:bg-zinc-600 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-maroon-600 dark:text-soft-pink-300 disabled:text-zinc-500 dark:disabled:text-zinc-600 shadow",
        outline:
          "w-[181px] bg-[#FFFFFF] dark:bg-zinc-800 hover:bg-maroon-50 dark:hover:bg-zinc-700 disabled:bg-zinc-100 dark:disabled:bg-zinc-800 text-maroon-600 dark:text-soft-pink-300 disabled:text-zinc-400 dark:disabled:text-zinc-600 shadow",
        secondary:
          "w-[181px] bg-zinc-100 text-zinc-900 shadow-sm hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost: "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
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
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
