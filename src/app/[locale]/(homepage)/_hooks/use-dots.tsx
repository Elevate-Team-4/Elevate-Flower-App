import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

// this hook requires the emblaApi from useEmblaCarousel
export const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
  // The selected carousel index ex. (1)
  const [selectedIndex, setSelectedIndex] = useState(0);
  // List of the available slides ex. [0,1,2,3]
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // When clicking a dot (pagination) this useCallback() function will be invoked
  // by passing the clicked dot's index, it will scroll to it
  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  // Initially, set the scrollSnaps to the number
  // of the slides
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  // When selecting a dot pagination
  // change the selected slide index to the dot index
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    // When the active event is "reInit" call the onInit
    // if it's "select" call the onSelect
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);
  // If any of (emblaApi, onInit or onSelect) value change
  // reassign their values again

  // return the values from the custom hook
  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};
