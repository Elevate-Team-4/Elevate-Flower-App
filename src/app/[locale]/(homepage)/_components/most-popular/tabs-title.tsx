"use client";

import { useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { occasion } from "@/lib/types/occasions";

interface TabsTitleProps {
  occasions: occasion[];
}

export default function TabsTitle({ occasions }: TabsTitleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentOccasionId = searchParams.get("occasion");

  useEffect(() => {
    if (!currentOccasionId && occasions.length > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("occasion", occasions[0]._id);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [currentOccasionId, occasions, pathname, router, searchParams]);

  const handleClick = useCallback(
    (occasionId: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("occasion", occasionId);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  if (!occasions || occasions.length === 0) {
    return null;
  }

  return (
    <>
      {occasions.map((occasion) => (
        <TabsTrigger
          key={occasion._id}
          value={occasion._id}
          onClick={() => handleClick(occasion._id)}
          className="text-zinc-700 data-[state=active]:text-[#A6252A] transition-colors duration-200 hover:text-[#A6252A]/80"
        >
          {occasion.name}
        </TabsTrigger>
      ))}
    </>
  );
}
