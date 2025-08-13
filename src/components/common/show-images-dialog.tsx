"use client";

import Image from "next/image";
import { useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Images } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDotButton } from "@/app/[locale]/(homepage)/_hooks/use-dots";
import { Button } from "@/components/ui/button";

interface ShowImagesDialogProbs {
  gallary?: string[];
  cover?: string;
  itemType: string;
}

export function ShowImagesDialog({ gallary, cover, itemType }: ShowImagesDialogProbs) {
  // Variables
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi);

  if (cover) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-blue-600 border-zinc-200">
            <Images size={18} /> View {itemType} {cover ? "cover" : "gallary"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader></DialogHeader>
          <div className="relative h-[440px] rounded-2xl overflow-hidden">
            <Image src={cover} alt="" fill className="object-cover object-center" />
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-600 border-zinc-200">
          <Images size={18} /> View {itemType} {cover ? "cover" : "gallary"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader></DialogHeader>
        <div>
          <Carousel className="h-[440px] overflow-hidden rounded-[16px]" setApi={setEmblaApi}>
            <CarouselContent className="">
              {gallary?.map((image) => {
                return (
                  <CarouselItem key={image} className="relative h-[440px]">
                    {/* Carousel image */}
                    <Image src={image} alt="" fill className="object-cover object-center" />
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Carousel navigation buttons */}
            <div className="absolute bottom-[30.5px] w-20 ltr:right-8 rtl:left-8">
              <div className="flex h-[35px] w-[74px] justify-between rounded-full rtl:flex-row-reverse">
                <>
                  <CarouselNext className="text-[30px] text-maroon-600 rtl:rotate-180" />
                  <CarouselPrevious className="text-[30px] text-maroon-600 rtl:rotate-180" />
                </>
              </div>
            </div>

            {/* Carousel pagination */}
            <div className="absolute top-[27.5px] flex flex-wrap justify-between gap-2 ltr:right-8 ltr:flex-row rtl:left-8">
              {scrollSnaps.map((_, index) => {
                return (
                  <Button
                    key={index}
                    size={"icon"}
                    onClick={() => {
                      onDotButtonClick(index);
                    }}
                    className={
                      selectedIndex === index
                        ? "h-[10px] w-9 rounded-[46.6px] bg-maroon-600 transition-all duration-300 hover:bg-maroon-600"
                        : "size-[10px] rounded-full bg-maroon-50 transition-all duration-300 hover:bg-maroon-50"
                    }
                  ></Button>
                );
              })}
            </div>
          </Carousel>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
