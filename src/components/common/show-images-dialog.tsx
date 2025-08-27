"use client";

/**
 * ShowImagesDialog component
 *
 * Displays either a single cover image or an interactive image gallery in a dialog.
 * Uses Embla Carousel for gallery navigation and supports RTL/LTR based on locale.
 *
 * @param {string[]} [props.gallary] - Array of image URLs for the gallery view.
 * @param {string} [props.cover] - URL of the single cover image.
 * @param {string} [props.buttonTitleCoverTranslation] - Button text for cover image mode.
 * @param {string} [props.buttonTitleGallaryTranslation] - Button text for gallery mode.
 *
 * @description
 * - If `cover` is provided, shows a button to open a dialog with a single image.
 * - If `gallary` is provided instead, opens a carousel with navigation arrows and pagination dots.
 * - RTL/LTR direction is automatically applied based on the current locale.
 */

import Image from "next/image";
import { useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import { Images } from "lucide-react";
import { useLocale } from "next-intl";
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
import { cn } from "@/lib/cn";

interface ShowImagesDialogProbs {
  gallary?: string[];
  cover?: string;
  buttonTitleCoverTranslation?: string;
  buttonTitleGallaryTranslation?: string;
}

export function ShowImagesDialog({
  gallary,
  cover,
  buttonTitleCoverTranslation,
  buttonTitleGallaryTranslation,
}: ShowImagesDialogProbs) {
  const locale = useLocale();
  // Hooks
  const [emblaApi, setEmblaApi] = useState<EmblaCarouselType | undefined>(undefined);
  const { onDotButtonClick, scrollSnaps, selectedIndex } = useDotButton(emblaApi);

  // Conditions
  if (cover) {
    // If cover is provided
    return (
      <Dialog>
        {/* Dialog button */}
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-blue-600 border-zinc-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <Images size={18} /> {buttonTitleCoverTranslation}
          </Button>
        </DialogTrigger>

        {/* Image */}
        <DialogContent className="min-w-[650px]">
          <DialogHeader></DialogHeader>
          <div className="relative h-[440px] rounded-2xl overflow-hidden border">
            <Image src={cover} alt="" fill className="object-contain" />
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog>
      {/* Dialog button */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-blue-600 border-zinc-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Images size={18} /> {buttonTitleGallaryTranslation}
        </Button>
      </DialogTrigger>

      {/* Carousel */}
      <DialogContent className="min-w-[650px]">
        <div>
          <Carousel
            opts={locale === "ar" ? { direction: "rtl" } : { direction: "ltr" }}
            className="border rounded-2xl"
            setApi={setEmblaApi}
          >
            {/* Carousel content */}
            <CarouselContent className="rounded-2xl">
              {gallary?.map((image) => {
                return (
                  <CarouselItem
                    key={image}
                    className="relative h-[440px] max-w-[605px] rounded-2xl"
                  >
                    {/* Carousel image */}
                    <Image src={image} alt="" fill className="object-contain rounded-2xl" />
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Carousel navigation buttons */}
            <div className="absolute -bottom-[30.5px] w-6 end-3">
              <div className="flex bg-blue-400 rounded-full rtl:flex-row-reverse">
                <CarouselPrevious className="text-maroon-600 size-3 p-3" />
                <CarouselNext size={"icon"} className="text-maroon-600 size-3 p-3" />
              </div>
            </div>

            {/* Carousel pagination */}
            <div className="absolute -bottom-[30.5px] start-0 flex flex-wrap justify-between gap-2 ltr:flex-row">
              {scrollSnaps.map((_, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      onDotButtonClick(index);
                    }}
                    className={cn(
                      selectedIndex === index ? "bg-maroon-600" : "bg-zinc-300  hover:bg-maroon-50",
                      "size-[10px] rounded-full transition-all duration-300 hover:bg-maroon-300",
                    )}
                  ></button>
                );
              })}
            </div>
          </Carousel>
        </div>

        {/* Footer for spacing */}
        <DialogFooter className="py-3"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
