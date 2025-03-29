"use client";

import { useEffect, useState } from "react";
import Button from "@/registry/components/button/button-shadcn/button";
import { Card, CardContent } from "@/registry/components/card/card-shadcn/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/registry/components/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BannerCarousel1() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="relative h-96 max-h-[500px] px-5 mx-auto mt-5 max-w-7xl lg:mt-6">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        className="w-full max-w-7xl h-96 max-h-[500px] z-10"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="bg-muted">
                <CardContent className="flex items-center justify-center h-96 max-h-[500px] p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-3 pointer-events-none">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronLeft className="size-32" strokeWidth={0.5} />
        </Button>
        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronRight className="size-32" strokeWidth={0.5} />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
