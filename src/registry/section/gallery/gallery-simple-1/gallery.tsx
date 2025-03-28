"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/registry/components/button/select";

// Types
interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

interface GallerySimpleProps {
  title?: string;
  subtitle?: string;
  items?: GalleryItem[];
  columns?: 2 | 3 | 4;
  gap?: "small" | "medium" | "large";
  rounded?: "none" | "small" | "medium" | "large";
  aspectRatio?: "square" | "video" | "portrait" | "auto";
  className?: string;
}

// Default gallery items
const defaultGalleryItems: GalleryItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
    alt: "Architecture",
    title: "Modern Architecture",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    alt: "Landscape",
    title: "Mountain Lake",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    alt: "Nature",
    title: "Sunset Valley",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df",
    alt: "City",
    title: "City Skyline",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
    alt: "Nature",
    title: "Forest Path",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1543877087-ebf71fde2be1",
    alt: "Abstract",
    title: "Colorful Patterns",
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e",
    alt: "Beach",
    title: "Ocean Waves",
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
    alt: "Street",
    title: "Urban Street",
  },
];

// Lightbox Component
const Lightbox = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}) => {
  if (!isOpen) return null;

  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentItem.src}
              alt={currentItem.alt}
              className="max-h-[85vh] max-w-full object-contain"
            />

            {currentItem.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <h3 className="text-lg font-medium">{currentItem.title}</h3>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>

            {currentIndex > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("prev");
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {currentIndex < items.length - 1 && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("next");
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Component
const GallerySimple = ({
  title = "Gallery",
  subtitle = "A collection of beautiful images",
  items = defaultGalleryItems,
  columns = 3,
  gap = "medium",
  rounded = "medium",
  aspectRatio = "square",
  className,
}: GallerySimpleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Handle lightbox navigation
  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Gap classes
  const gapClass =
    gap === "small" ? "gap-2" : gap === "large" ? "gap-6" : "gap-4";

  // Grid columns classes
  const gridColsClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  // Rounded classes
  const roundedClass =
    rounded === "none"
      ? ""
      : rounded === "small"
      ? "rounded-sm"
      : rounded === "large"
      ? "rounded-xl"
      : "rounded-md";

  // Aspect ratio classes
  const aspectRatioClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "video"
      ? "aspect-video"
      : aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : "";

  return (
    <section className="py-12 md:py-16">
      <div className={cn("container px-4", className)}>
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={cn("grid", gridColsClass, gapClass)}>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -5 }}
              className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div
                className={cn(
                  "cursor-pointer overflow-hidden bg-muted",
                  roundedClass,
                  aspectRatioClass
                )}
                onClick={() => {
                  setCurrentIndex(index);
                  setLightboxOpen(true);
                }}
              >
                <div className="h-full w-full relative group">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {item.title && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <h3 className="text-white font-medium">{item.title}</h3>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Lightbox
          items={items}
          currentIndex={currentIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={handleNavigate}
        />
      </div>
    </section>
  );
};

export default GallerySimple;
