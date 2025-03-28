"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Info,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/registry/components/dialog";
import { Button } from "@/registry/components/button/select";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Skeleton } from "@/registry/components/skeleton";

// Types
interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar?: string;
  };
  featured?: boolean;
}

interface GalleryMasonry1Props {
  title?: string;
  description?: string;
  items?: GalleryItem[];
  columns?: 2 | 3 | 4;
  gap?: "small" | "medium" | "large";
  className?: string;
  showInfo?: boolean;
  enableLightbox?: boolean;
  enableFiltering?: boolean;
}

// Default gallery items
const defaultGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Mountain Landscape",
    description:
      "A beautiful mountain landscape with snow-capped peaks and a clear blue sky.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    category: "Nature",
    tags: ["mountains", "landscape", "snow"],
    author: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    featured: true,
  },
  {
    id: "2",
    title: "Urban Architecture",
    description:
      "Modern city architecture with glass skyscrapers reflecting the clouds.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e",
    category: "Architecture",
    tags: ["city", "buildings", "modern"],
    author: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    id: "3",
    title: "Coastal Sunset",
    description:
      "A breathtaking sunset over the ocean with silhouettes of palm trees.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    category: "Nature",
    tags: ["sunset", "beach", "ocean"],
    author: {
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    featured: true,
  },
  {
    id: "4",
    title: "Abstract Art",
    description:
      "Colorful abstract painting with geometric shapes and vibrant colors.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
    category: "Art",
    tags: ["abstract", "colorful", "painting"],
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  },
  {
    id: "5",
    title: "Wildlife Photography",
    description: "A majestic lion resting on a rock in the African savanna.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
    category: "Wildlife",
    tags: ["lion", "africa", "wildlife"],
    author: {
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    id: "6",
    title: "Minimalist Interior",
    description:
      "Clean, minimalist interior design with natural light and simple furniture.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    category: "Interior",
    tags: ["minimalist", "interior", "design"],
    author: {
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
  },
  {
    id: "7",
    title: "Street Photography",
    description:
      "Busy city street with people walking in the rain under colorful umbrellas.",
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17",
    category: "Urban",
    tags: ["street", "people", "rain"],
    author: {
      name: "Robert Chen",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    featured: true,
  },
  {
    id: "8",
    title: "Aerial Landscape",
    description:
      "Stunning aerial view of a winding river through a forest valley.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    category: "Nature",
    tags: ["aerial", "river", "forest"],
    author: {
      name: "Lisa Thompson",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
  },
  {
    id: "9",
    title: "Product Photography",
    description:
      "Elegant watch photographed on a dark background with dramatic lighting.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Product",
    tags: ["watch", "product", "luxury"],
    author: {
      name: "Thomas Wright",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
  },
];

// Gallery Item Component
const GalleryItem = ({
  item,
  onClick,
  showInfo = true,
}: {
  item: GalleryItem;
  onClick: () => void;
  showInfo?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg"
    >
      {!isLoaded && (
        <div className="w-full h-full bg-muted">
          <Skeleton className="h-full w-full" />
        </div>
      )}
      <img
        src={item.image}
        alt={item.title}
        className={cn(
          "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
          !isLoaded && "opacity-0"
        )}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Overlay with info on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-medium text-lg">{item.title}</h3>
        {item.description && showInfo && (
          <p className="text-white/80 text-sm mt-1 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Categories and tags */}
        {item.category && showInfo && (
          <div className="flex flex-wrap gap-1 mt-2">
            <Badge variant="secondary" className="text-xs">
              {item.category}
            </Badge>
            {item.tags &&
              item.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs text-white/80 border-white/30"
                >
                  #{tag}
                </Badge>
              ))}
          </div>
        )}

        {/* Author info */}
        {item.author && showInfo && (
          <div className="flex items-center mt-3">
            {item.author.avatar && (
              <img
                src={item.author.avatar}
                alt={item.author.name}
                className="w-6 h-6 rounded-full mr-2 border border-white/30"
              />
            )}
            <span className="text-white/90 text-xs">{item.author.name}</span>
          </div>
        )}
      </div>

      {/* Expand button */}
      <button
        onClick={onClick}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Expand image"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      {/* Featured badge */}
      {item.featured && (
        <div className="absolute top-2 left-2 px-2 py-1 bg-primary/90 text-primary-foreground rounded-md text-xs font-medium">
          Featured
        </div>
      )}
    </motion.div>
  );
};

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
  const currentItem = items[currentIndex];
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isOpen, onClose, onNavigate]);

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
        <DialogContent className="max-w-7xl w-full h-[90vh] border-none bg-transparent shadow-none flex flex-col">
          <div className="flex justify-between items-center p-4 text-white">
            <div className="flex flex-col">
              <h2 className="text-xl font-medium">{currentItem.title}</h2>
              {currentItem.author && (
                <p className="text-sm text-white/70">
                  by {currentItem.author.name}
                </p>
              )}
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Download className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <Info className="w-5 h-5" />
              </Button>
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </DialogClose>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center p-4">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="w-full max-w-4xl h-[70vh] rounded-md" />
              </div>
            )}
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className={cn(
                "max-h-full max-w-full object-contain rounded-md",
                !isLoaded && "opacity-0"
              )}
              onLoad={() => setIsLoaded(true)}
            />

            {/* Navigation buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10"
              onClick={() => onNavigate("prev")}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10"
              onClick={() => onNavigate("next")}
              disabled={currentIndex === items.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Image details */}
          {currentItem.description && (
            <div className="p-4 bg-black/50 text-white mt-auto rounded-b-md">
              <p className="text-sm">{currentItem.description}</p>
              {currentItem.tags && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {currentItem.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs text-white/80 border-white/30"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

// Filter Component
const GalleryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={activeCategory === "all" ? "default" : "outline"}
        size="sm"
        onClick={() => setActiveCategory("all")}
        className="rounded-full"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

// Main Component
const GalleryMasonry1 = ({
  title = "Our Gallery",
  description = "Explore our collection of stunning images from various categories",
  items = defaultGalleryItems,
  columns = 3,
  gap = "medium",
  className,
  showInfo = true,
  enableLightbox = true,
  enableFiltering = true,
}: GalleryMasonry1Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState(items);

  // Extract unique categories
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean) as string[])
  );

  // Filter items by category
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory, items]);

  // Handle lightbox navigation
  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      direction === "next" &&
      currentIndex < filteredItems.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Gap classes
  const gapClass =
    gap === "small" ? "gap-2" : gap === "large" ? "gap-6" : "gap-4";

  // Grid columns classes
  const gridColsClass =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-16 md:py-24">
      <div className={cn("container mx-auto px-4", className)}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {enableFiltering && categories.length > 0 && (
          <GalleryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}

        <div className={cn("masonry-grid", gapClass)}>
          <div className={cn("grid grid-cols-1", gridColsClass, gapClass)}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "masonry-item mb-4",
                  item.featured ? "row-span-2" : ""
                )}
                style={{
                  height: item.featured
                    ? "auto"
                    : `${Math.floor(Math.random() * 150) + 200}px`,
                }}
              >
                <GalleryItem
                  item={item}
                  onClick={() => {
                    if (enableLightbox) {
                      setCurrentIndex(index);
                      setLightboxOpen(true);
                    }
                  }}
                  showInfo={showInfo}
                />
              </div>
            ))}
          </div>
        </div>

        {enableLightbox && lightboxOpen && (
          <Lightbox
            items={filteredItems}
            currentIndex={currentIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </section>
  );
};

export default GalleryMasonry1;
