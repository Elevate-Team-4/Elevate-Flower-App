import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  error?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[150px] w-full rounded-xl border bg-transparent p-4 text-sm text-zinc-800 shadow-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400 md:text-sm",
          "border-zinc-300 focus-visible:ring-zinc-400 dark:border-zinc-600 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500", // default
          error &&
            "border-red-500 focus-visible:ring-red-500 dark:border-red-500 dark:focus-visible:ring-red-500", // error override
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
