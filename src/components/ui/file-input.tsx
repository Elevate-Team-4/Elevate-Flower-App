import * as React from "react";

import { Upload } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const FileInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex border gap-2 shadow-sm rounded-[10px] border-zinc-300 bg-[#FFFFFF] dark:border-zinc-600 dark:bg-zinc-700 ">
        <input
          id="FileInput"
          type="file"
          className={cn(
            "flex peer rounded-[10px] file:w-0 file:opacity-0 h-12 w-full text-[14px] bg-transparent  file:border-0 file:h-full file:text-sm file:font-medium file:text-zinc-800 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:bg-zinc-100 disabled:text-zinc-400   md:text-sm dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor="FileInput"
          className="group flex items-center justify-center gap-2 rounded-[10px] border-zinc-300 bg-[#FFFFFF] dark:border-zinc-600 dark:bg-zinc-700 peer-disabled:cursor-not-allowed peer-disabled:bg-zinc-100 peer-disabled:text-zinc-400  dark:peer-disabled:bg-zinc-700 dark:peer-disabled:text-zinc-400 "
        >
          <span className="flex gap-4 w-[150px] justify-center items-center text-sm dark:peer-disabled:bg-transparent  text-maroon-500 bg-transparent dark:text-soft-pink-400">
            <Upload size={"18px"} />
            <p>Upload file</p>
          </span>
        </label>
      </div>
    );
  },
);
FileInput.displayName = "FileInput";

export { FileInput };
