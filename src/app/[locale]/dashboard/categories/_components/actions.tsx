"use client";

import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export default function Actions({ id }: { id: string }) {
  const router = useRouter();
  return (
    <>
      <div
        className="bg-blue-600/10 flex items-center gap-1 rounded-md py-1 px-2 text-blue-600 text-[12px] font-medium"
        onClick={() => {
          router.push(`/dashboard/categories/update-category/${id}`);
        }}
      >
        <Pencil width={14} height={14} /> Edit
      </div>
      <div className="flex items-center gap-1 rounded-md py-1 px-2 bg-red-600/10 text-red-600 text-[12px] font-medium">
        <Trash2 width={14} height={14} /> Delete
      </div>
    </>
  );
}
