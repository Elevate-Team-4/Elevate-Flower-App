import * as React from "react"

import { cn } from "@/lib/utils"
import { Upload } from "lucide-react"

const FileInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <label htmlFor="FileInput" className="relative flex items-center justify-center  ">
        {/* FileInput */}
        <input
          type={'file'}
          id="FileInput"
          className={cn(
            "flex h-12 w-full peer rounded-[10px] text-transparent border border-zinc-300 bg-zinc-300 p-4 text-[14px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-transparent placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:border-0  disabled:bg-zinc-100 md:text-sm dark:disabled:bg-transparent dark:disabled:border-2 dark:border-zinc-600 dark:bg-zinc-700  dark:file:text-transparent dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
            className
          )}
          ref={ref}
          {...props}
        />
        <span className="text-sm peer-disabled:bg-zinc-100 dark:peer-disabled:bg-transparent peer-disabled:text-zinc-400 dark:peer-disabled:text-zinc-600 text-maroon-500 absolute end-0 p-2 flex flex-wrap gap-2 justify-center items-center bg-transparent"> <Upload size={'18px'} /> Upload file</span>
      </label>
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
