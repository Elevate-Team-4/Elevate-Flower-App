"use client";
import * as React from "react";
import { Search, Upload } from "lucide-react";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { cn } from "@/lib/utils/cn";
import { Button } from "./button";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    // File Input
    if (type === "file") {
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
    }
    if (type === "password") {
      return (
        <div className="relative">
          {/* Input */}
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-12 w-full rounded-[10px] border border-zinc-300 bg-[#FFFFFF] p-4 text-[14px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm dark:border-zinc-600 dark:bg-zinc-700  dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
              className,
            )}
            ref={ref}
            {...props}
          />
          {/* Toggle visibility */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 rtl:right-auto rtl:left-0 top-0  h-full px-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <VscEyeClosed size={45} color="#949BA5" />
            ) : (
              <VscEye size={45} color="#949BA5" />
            )}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
      );
    }
    // Search Input
    else if (type === "search") {
      return (
        <label htmlFor="SearchInput" className="relative flex items-center justify-center w-full">
          {/* SearchInput */}
          <input
            type={"search"}
            className={cn(
              "flex h-12 w-full rounded-[10px] border border-zinc-300 bg-[#FFFFFF] p-4 ps-10 text-[14px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-400 placeholder:text-[14px] placeholder:font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm dark:border-zinc-600 dark:bg-zinc-700  dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
              className,
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute start-0 p-2 z-10">
            <Search className="text-zinc-400 text-[14px] font-normal" />
          </span>
        </label>
      );
    }
    // Default Input
    else {
      return (
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-[10px] border border-zinc-300 bg-[#FFFFFF] p-4 text-[14px] shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-100 md:text-sm dark:border-zinc-600 dark:bg-zinc-700  dark:file:text-zinc-50 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-500",
            className,
          )}
          ref={ref}
          {...props}
        />
      );
    }
  },
);
Input.displayName = "Input";

export { Input };
