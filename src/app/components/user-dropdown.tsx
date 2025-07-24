"use client";

// React & Next.js
import React from "react";
import { useRouter } from "next/navigation";

// Icons
import { ChevronDown, User, LogOut } from "lucide-react";

// Libraries
import { signOut } from "next-auth/react";

// UI Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
type UserProps = {
  user: ApplicationUser;
};

export default function UserDropdown({ user }: UserProps) {
  // Hooks
  const router = useRouter();

  // Navigate to profile page using
  const handleProfile = () => {
    router.push("/profile");
  };

  // Handle user logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex-1 border-r pr-4 font-primary">
      {/* Greeting text */}
      <p className="text-zinc-500 text-sm font-normal whitespace-nowrap">hello</p>
      {/* User dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-nowrap items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md p-1 transition-colors">
          <p className="text-maroon-700 dark:text-soft-pink-200 font-medium text-base">
            {user?.firstName}
          </p>
          <ChevronDown className="w-5 h-5" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-48">
          {/* Profile menu item */}
          <DropdownMenuItem onClick={handleProfile} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span> My Profile</span>
          </DropdownMenuItem>

          {/* Logout menu item */}
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
