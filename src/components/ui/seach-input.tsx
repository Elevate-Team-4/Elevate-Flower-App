import * as React from "react"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, ...props }, ref) => {
        return (
            <label htmlFor="SearchInput" className="relative flex items-center justify-center w-full">
                {/* SearchInput */}
                <input
                    type={'search'}
                    className={cn(
                        "flex h-12 w-full rounded-[10px] border border-zinc-300 bg-[#FFFFFF] p-4 ps-10 text-[14px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-400 placeholder:text-[14px] placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm dark:border-zinc-600 dark:bg-zinc-700  dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <span className="absolute start-0 p-2 z-10">
                    <Search className="text-zinc-400 text-[14px] font-normal" />
                </span>
            </label>
        )
    }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
