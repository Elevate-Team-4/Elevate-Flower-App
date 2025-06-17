"use client";

import { occasion } from "@/lib/types/occasions";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface occasionParamType {
  occasions: occasion[];
}

export default function TabsTitle({ occasions }: occasionParamType) {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOccasionId = searchParams.get("occasion");

  if (!currentOccasionId) {
    router.replace(`/?occasion=${occasions[0]._id}`);
  }

  return (
    <>
      {occasions.map((occasion) => (
        <TabsTrigger
          onPointerDown={() => router.replace(`/?occasion=${occasion._id}`)}
          className="text-zinc-700 data-[state=active]:text-[#A6252A]"
          value={occasion._id}
          key={occasion._id}
        >
          {occasion.name}
        </TabsTrigger>
      ))}
    </>
  );
}
