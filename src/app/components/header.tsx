// React & Next.js
import React from "react";
import Image from "next/image";

// Icons
import {
  Bell,
  ClipboardList,
  Gift,
  Headset,
  Heart,
  House,
  Info,
  PartyPopper,
  ShoppingCart,
} from "lucide-react";

import logo from "@assets/logo 1.png";

// Libraries
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

// Navigation
import { Link } from "@/i18n/navigation";

// UI Components
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/mode-toggle";
import LocationHeader from "./location-header";

// Locale Components
import UserDropdown from "./user-dropdown";

export default async function Header() {
  // Navbar object
  const navbar = [
    {
      name: "Home",
      href: "/",
      icons: <House className="w-4 h-4" />,
    },
    {
      name: "Products",
      href: "/products",
      icons: <Gift className="w-5 h-5" />,
    },
    {
      name: "Categories",
      href: "/categories",
      icons: <ClipboardList className="w-5 h-5" />,
    },
    {
      name: "Occasions",
      href: "/occasions",
      icons: <PartyPopper className="w-5 h-5" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icons: <Headset className="w-5 h-5" />,
    },
    {
      name: "About",
      href: "/en/about",
      icons: <Info className="w-5 h-5" />,
    },
  ];

  // Session
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <header className="w-full flex flex-col ">
      {/* Main header */}
      <div className="bg-white dark:bg-zinc-800">
        <div className="text-lg py-5 px-9 flex items-center justify-between gap-4 container mx-auto">
          {/* image logo */}
          <Image src={logo} alt="Logo" className="w-[85px] h-[85px]" />

          {/* address */}
          {session && <LocationHeader />}

          {/* input search */}
          <Input
            type="search"
            className="w-full"
            placeholder="What awesome gift are you looking for?"
          />

          {/* action */}
          <div className="flex items-center gap-4 p-4">
            {/* Authentication Section */}
            {user ? (
              // User is authenticated - display user dropdown menu
              <UserDropdown user={user} />
            ) : (
              // User is not authenticated - display sign in link
              <Link
                href="/auth/login"
                className="text-maroon-700 dark:text-soft-pink-200 font-medium text-base hover:underline whitespace-nowrap"
              >
                Sign In
              </Link>
            )}

            {/* user data */}
            <div className="flex-1 self-stretch flex items-center gap-2 border-r border-zinc-200 pr-4">
              <div className="relative">
                <Heart />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </div>
              <div className="relative">
                <ShoppingCart />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  5
                </span>
              </div>
              <div className="relative">
                <Bell />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  2
                </span>
              </div>
            </div>

            <div className="flex-1 self-stretch flex items-center gap-2">
              <div className="relative">
                <ModeToggle />
              </div>
            </div>

            {/* language */}
            <div className="text-zinc-700 dark:text-white text-base font-normal">
              <p>العربيه</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-maroon-700 dark:bg-soft-pink-200">
        <div className=" text-white dark:text-zinc-800 flex justify-center gap-4 px-4">
          {navbar.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="p-3 text-base font-medium hover:text-soft-pink-200 dark:hover:text-maroon-800 after:content-[' '] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-soft-pink-200 relative after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 font-primary dark:hover:after:bg-maroon-800"
            >
              <div className="flex gap-2 justify-center items-center">
                {item.icons}
                <span className="text-base font-medium font-primary">{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
