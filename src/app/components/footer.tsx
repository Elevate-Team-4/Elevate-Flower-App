import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@assets/images/logo 1.png";

export default function Footer() {
  // Navgation object
  const navigation = [
    "Home",
    "Products",
    "Categories",
    "Occasions",
    "Contact",
    "About",
    "Terms & Conditions",
    "Privacy Policy",
    "FAQs",
  ];

  return (
    <div className="p-10 bg-zinc-800 text-white grid grid-cols-4 gap-4">
      {/* Logo */}
      <div className="col-span-1 flex flex-col items-center justify-center gap-2">
        <Image src={logo} alt="logo" />
        <h2 className="text-soft-pink-300 font-semibold text-lg whitespace-nowrap">
          Rose E-Commerce App
        </h2>
        <p className="text-zinc-100 text-sm font-normal">
          All rights reserved | {new Date().getFullYear()}
        </p>
      </div>

      {/* Navigation */}
      <div className="col-span-2">
        <ul className="flex flex-col items-start justify-start gap-2 text-zinc-100 text-base font-medium">
          <li className="text-soft-pink-300 font-semibold text-lg">Discover our website</li>
          {navigation.map((item, index) => (
            <li
              key={index}
              className="hover:text-soft-pink-300 transition-colors duration-300 cursor-pointer"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Discount */}
      <div className="col-span-1">
        <p className="font-semibold text-xl text-soft-pink-300">
          Get <span className="text-maroon-50">20%</span> Off Discount Coupon
        </p>
        <p className="text-zinc-500 font-normal text-sm">By subscribing to our newsletter</p>
        <div className="flex items-center justify-between gap-2 mt-4 relative">
          <Input
            placeholder="Enter your email"
            className="bg-zinc-600 text-white border-none ps-4 w-[375px] h-9 rounded-[30px]"
          />
          <Button className="bg-maroon-50 absolute inset-y-0 h-full w-[121px] end-0 text-maroon-700 font-medium text-sm hover:bg-soft-pink-400 rounded-full px-4 py-[10px]">
            Subscribe <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
