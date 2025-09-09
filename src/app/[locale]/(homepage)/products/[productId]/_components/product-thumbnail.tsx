"use client";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

// Probs
interface ThumbnailImagesProbs {
  thumbnailImages: string[];
}

export default function ProductThumbnail({ thumbnailImages }: ThumbnailImagesProbs) {
  // Hooks
  const [mainCarouselAPI, setMainCarouselAPI] = useState<CarouselApi | null>(null);
  const [secondaryCarouselAPI, setSecondaryCarouselAPI] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // On select to insure both carousels are synced
  const onSelect = useCallback(() => {
    // Insure values of carousels are not null
    if (!mainCarouselAPI || !secondaryCarouselAPI) return;

    setSelectedIndex(mainCarouselAPI.selectedScrollSnap());
    secondaryCarouselAPI.scrollTo(mainCarouselAPI.selectedScrollSnap());
  }, [mainCarouselAPI, secondaryCarouselAPI, selectedIndex]);

  // Scroll to for the main carousel on click on the secondary carousel
  const scrollTo = useCallback(
    (index: number) => {
      // Insure values of carousels are not null
      if (!mainCarouselAPI || !secondaryCarouselAPI) return;

      // scrolls tha main carousal on the clicked image on secondary carousel
      mainCarouselAPI.scrollTo(index);
    },
    [mainCarouselAPI, secondaryCarouselAPI],
  );

  // This keeps every thing in sync at initialization or on changing
  useEffect(() => {
    // Insure values of carousels are not null
    if (!mainCarouselAPI || !secondaryCarouselAPI) return;

    onSelect();

    mainCarouselAPI.on("select", onSelect).on("reInit", onSelect);
  }, [mainCarouselAPI, onSelect]);

  return (
    <div>
      {/* main carousel */}
      <Carousel opts={{ loop: true, align: "start" }} setApi={setMainCarouselAPI} className="mb-2">
        <CarouselContent>
          {thumbnailImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative max-w-[605px] h-[402px]">
                <Image
                  src={image}
                  alt="Product Image"
                  fill={true}
                  className="object-cover rounded-xl"
                  quality={90}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* secondry carousel */}
      <div>
        <Carousel setApi={setSecondaryCarouselAPI} className="flex justify-center">
          <CarouselContent className="-ml-2">
            {thumbnailImages.map((image, index) => (
              <CarouselItem key={image} className="pl-2 flex-none ">
                <Image
                  alt="Product Image"
                  src={image}
                  width={91}
                  height={111}
                  className={cn(
                    index === selectedIndex ? "brightness-100" : "brightness-75",
                    "w-24 h-28 rounded-lg object-cover hover:brightness-90 ease-in-out duration-300",
                  )}
                  onClick={() => scrollTo(index)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
