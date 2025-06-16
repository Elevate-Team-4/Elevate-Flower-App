import Image from "next/image";
import React from "react";
import {
  Bell,
  ChevronDown,
  ClipboardList,
  Gift,
  Headset,
  Heart,
  Home,
  Info,
  LocationEdit,
  PartyPopper,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { SearchInput } from "@/components/ui/search-input";
import logo from "@assets/images/logo 1.png";

export default function Header() {
  // Navbar object
  const navbar = [
    {
      name: "Home",
      href: "/",
      icons: <Home className="w-4 h-4" />,
    },
    {
      name: "Products",
      href: "/products",
      icons: <Gift className="w-4 h-4" />,
    },
    {
      name: "Categories",
      href: "/categories",
      icons: <ClipboardList className="w-4 h-4" />,
    },
    {
      name: "Occasions",
      href: "/occasions",
      icons: <PartyPopper className="w-4 h-4" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icons: <Headset className="w-4 h-4" />,
    },
    {
      name: "About",
      href: "/about",
      icons: <Info className="w-4 h-4" />,
    },
  ];

  return (
    <div className="  flex flex-col ">
      {/* header */}
      <div className="text-lg p-2 flex items-center justify-between gap-4 w-full">
        {/* image logo */}
        <Image src={logo} alt="Logo" className="w-[85px] h-[85px]" />

        {/* address */}
        <div className="flex-1 text-center gap-2 flex flex-col items-center justify-center">
          <p className="text-zinc-500 text-sm font-normal whitespace-nowrap">Deliver to:</p>
          <div className="text-maroon-700 flex flex-nowrap items-center gap-2 justify-center">
            <LocationEdit size={"20px"} />
            <p className="text-maroon-700 font-medium text-base">Cairo</p>
          </div>
        </div>

        {/* input search */}
        <SearchInput className="w-full" placeholder="What awesome gift are you looking for?" />

        {/* action */}
        <div className="flex items-center gap-4 p-4">
          {/* authentication */}
          <div className="flex-1 border-r pr-4">
            <p className="text-zinc-500 text-sm font-normal whitespace-nowrap">hello </p>
            <div className="flex flex-nowrap items-center gap-2">
              <p className="text-maroon-700 font-medium text-base">mahmoud</p>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>

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

          {/* language */}
          <div className="text-zinc-700 text-base font-normal">
            <p>العربيه</p>
          </div>
        </div>
      </div>

      {/* navbar */}
      <nav className="bg-maroon-700 text-white flex justify-center gap-2">
        {navbar.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="p-4 text-base font-medium duration-100 hover:text-soft-pink-200 hover:border-b-2 hover:border-b-soft-pink-200 transition-all"
          >
            <div className="flex gap-2 justify-center items-center">
              {item.icons}
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
