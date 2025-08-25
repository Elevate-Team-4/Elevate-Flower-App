import Image from "next/image";
import React from "react";
import MenuItem from "./sidebar-menu";

export default function FooterSidebar({
  photo,
  email,
  firstName,
  fullName,
}: {
  photo: string;
  email: string;
  firstName: string;
  fullName: string;
}) {
  // Functions
  // Convert String to colors
  function stringToHslColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const h = Math.abs(hash) % 360;
    const s = 50 + (Math.abs(hash) % 50);
    const l = 40 + (Math.abs(hash) % 40);

    return `hsl(${h}, ${s}%, ${l}%)`;
  }

  return (
    <div className="flex items-center justify-between">
      {/* User Photo */}
      {photo ? (
        <div className="size-14 rounded-full overflow-hidden">
          <Image src={photo} alt={firstName} width={56} height={0} />
        </div>
      ) : (
        // user First Letter
        <div
          className="size-14 flex items-center justify-center text-white  rounded-full"
          style={{ backgroundColor: stringToHslColor(fullName) }}
        >
          {firstName?.slice(0, 1)}
        </div>
      )}

      <div className="flex flex-col">
        <div className="space-x-1">
          <span className="font-bold text-zinc-800 dark:text-zinc-50 text-sm ">{fullName}</span>
        </div>
        {/* User Email */}
        <span className="font-semibold text-zinc-800 dark:text-zinc-50 text-xs text-opacity-50">
          {email}
        </span>
      </div>
      {/* Menu */}
      <MenuItem fullName={fullName} />
    </div>
  );
}
