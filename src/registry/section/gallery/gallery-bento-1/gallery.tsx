"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/registry/components/button/select";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import { Skeleton } from "@/registry/components/skeleton";
import { AspectRatio } from "@/registry/components/aspect-ratio";

// Types
interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide" | "ultrawide";
  size?: "small" | "medium" | "large" | "featured";
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    avatar?: string;
  };
  date?: string;
  featured?: boolean;
  stats?: {
    likes?: number;
    views?: number;
    downloads?: number;
  };
}

interface GalleryBento1Props {
  items?: GalleryItem[];
  className?: string;
  columns?: 2 | 3 | 4;
  gap?: "small" | "medium" | "large";
  padding?: "small" | "medium" | "large";
  rounded?: "none" | "small" | "medium" | "large";
  hover?: "zoom" | "lift" | "glow" | "border" | "none";
  showCategories?: boolean;
  showTags?: boolean;
  showAuthors?: boolean;
  enableLightbox?: boolean;
  enableFiltering?: boolean;
  enableSorting?: boolean;
  enableSearch?: boolean;
  enableMasonry?: boolean;
  darkMode?: boolean;
  animationVariant?: "fade" | "slide" | "scale" | "none";
}

// Default gallery items for demo purposes
const defaultGalleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "Mountain Landscape",
    description:
      "A beautiful mountain landscape with snow-capped peaks and a clear blue sky.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    aspectRatio: "landscape",
    size: "featured",
    category: "Nature",
    tags: ["mountains", "landscape", "snow"],
    author: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    date: "2023-05-15",
    featured: true,
    stats: {
      likes: 1250,
      views: 5600,
      downloads: 320,
    },
  },
  {
    id: "2",
    title: "Urban Architecture",
    description:
      "Modern city architecture with glass skyscrapers reflecting the clouds.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e",
    aspectRatio: "portrait",
    size: "medium",
    category: "Architecture",
    tags: ["city", "buildings", "modern"],
    author: {
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    date: "2023-06-22",
    stats: {
      likes: 890,
      views: 3200,
      downloads: 145,
    },
  },
  {
    id: "3",
    title: "Coastal Sunset",
    description:
      "A breathtaking sunset over the ocean with silhouettes of palm trees.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    aspectRatio: "wide",
    size: "large",
    category: "Nature",
    tags: ["sunset", "beach", "ocean"],
    author: {
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    date: "2023-04-10",
    stats: {
      likes: 2100,
      views: 8900,
      downloads: 560,
    },
  },
  {
    id: "4",
    title: "Abstract Art",
    description:
      "Colorful abstract painting with geometric shapes and vibrant colors.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab",
    aspectRatio: "square",
    size: "medium",
    category: "Art",
    tags: ["abstract", "colorful", "painting"],
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    date: "2023-07-05",
    stats: {
      likes: 750,
      views: 2800,
      downloads: 95,
    },
  },
  {
    id: "5",
    title: "Wildlife Photography",
    description: "A majestic lion resting on a rock in the African savanna.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
    aspectRatio: "landscape",
    size: "large",
    category: "Wildlife",
    tags: ["lion", "africa", "wildlife"],
    author: {
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    date: "2023-03-18",
    featured: true,
    stats: {
      likes: 1850,
      views: 7200,
      downloads: 410,
    },
  },
  {
    id: "6",
    title: "Minimalist Interior",
    description:
      "Clean, minimalist interior design with natural light and simple furniture.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    aspectRatio: "portrait",
    size: "small",
    category: "Interior",
    tags: ["minimalist", "interior", "design"],
    author: {
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    date: "2023-08-12",
    stats: {
      likes: 920,
      views: 3500,
      downloads: 180,
    },
  },
  {
    id: "7",
    title: "Street Photography",
    description:
      "Busy city street with people walking in the rain under colorful umbrellas.",
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17",
    aspectRatio: "wide",
    size: "medium",
    category: "Urban",
    tags: ["street", "people", "rain"],
    author: {
      name: "Robert Chen",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    date: "2023-09-30",
    stats: {
      likes: 1100,
      views: 4800,
      downloads: 230,
    },
  },
  {
    id: "8",
    title: "Aerial Landscape",
    description:
      "Stunning aerial view of a winding river through a forest valley.",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    aspectRatio: "ultrawide",
    size: "featured",
    category: "Nature",
    tags: ["aerial", "river", "forest"],
    author: {
      name: "Lisa Thompson",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    date: "2023-02-25",
    featured: true,
    stats: {
      likes: 2400,
      views: 9500,
      downloads: 680,
    },
  },
  {
    id: "9",
    title: "Product Photography",
    description:
      "Elegant watch photographed on a dark background with dramatic lighting.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    aspectRatio: "square",
    size: "small",
    category: "Product",
    tags: ["watch", "product", "luxury"],
    author: {
      name: "Thomas Wright",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    date: "2023-10-08",
    stats: {
      likes: 780,
      views: 2900,
      downloads: 120,
    },
  },
  {
    id: "10",
    title: "Food Photography",
    description:
      "Delicious gourmet meal beautifully plated and photographed from above.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    aspectRatio: "landscape",
    size: "medium",
    category: "Food",
    tags: ["food", "gourmet", "culinary"],
    author: {
      name: "Olivia Martinez",
      avatar: "https://i.pravatar.cc/150?img=10",
    },
    date: "2023-11-15",
    stats: {
      likes: 1350,
      views: 5100,
      downloads: 290,
    },
  },
  {
    id: "11",
    title: "Night Sky",
    description:
      "Milky Way galaxy over a mountain landscape with stars filling the night sky.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    aspectRatio: "wide",
    size: "large",
    category: "Astronomy",
    tags: ["stars", "night", "galaxy"],
    author: {
      name: "Kevin Anderson",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    date: "2023-01-20",
    featured: true,
    stats: {
      likes: 3200,
      views: 12000,
      downloads: 950,
    },
  },
  {
    id: "12",
    title: "Macro Photography",
    description:
      "Extreme close-up of a colorful butterfly wing showing intricate patterns.",
    image: "https://images.unsplash.com/photo-1557180295-76eee20ae8aa",
    aspectRatio: "portrait",
    size: "medium",
    category: "Macro",
    tags: ["butterfly", "macro", "insect"],
    author: {
      name: "Natalie Parker",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    date: "2023-12-05",
    stats: {
      likes: 980,
      views: 3700,
      downloads: 210,
    },
  },
];

// Helper components
const ImageSkeleton = ({
  aspectRatio = "square",
}: {
  aspectRatio?: string;
}) => {
  const aspectRatioClass =
    aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : aspectRatio === "landscape"
      ? "aspect-[4/3]"
      : aspectRatio === "wide"
      ? "aspect-[16/9]"
      : aspectRatio === "ultrawide"
      ? "aspect-[21/9]"
      : "aspect-square";

  return (
    <div className={cn("overflow-hidden rounded-md", aspectRatioClass)}>
      <Skeleton className="h-full w-full" />
    </div>
  );
};

const GalleryItemCard = ({
  item,
  onClick,
  hover = "zoom",
  rounded = "medium",
  showCategories = true,
  showTags = false,
  showAuthors = true,
  animationVariant = "fade",
}: {
  item: GalleryItem;
  onClick: () => void;
  hover?: GalleryBento1Props["hover"];
  rounded?: GalleryBento1Props["rounded"];
  showCategories?: boolean;
  showTags?: boolean;
  showAuthors?: boolean;
  animationVariant?: GalleryBento1Props["animationVariant"];
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

  const aspectRatioClass =
    item.aspectRatio === "portrait"
      ? "aspect-[3/4]"
      : item.aspectRatio === "landscape"
      ? "aspect-[4/3]"
      : item.aspectRatio === "wide"
      ? "aspect-[16/9]"
      : item.aspectRatio === "ultrawide"
      ? "aspect-[21/9]"
      : "aspect-square";

  const roundedClass =
    rounded === "none"
      ? "rounded-none"
      : rounded === "small"
      ? "rounded-sm"
      : rounded === "large"
      ? "rounded-xl"
      : "rounded-md";

  const hoverEffectClass =
    hover === "zoom"
      ? "group-hover:scale-110 transition-transform duration-500"
      : hover === "lift"
      ? "group-hover:-translate-y-2 transition-transform duration-300"
      : hover === "glow"
      ? "group-hover:shadow-glow transition-shadow duration-300"
      : hover === "border"
      ? "group-hover:border-primary transition-colors duration-300"
      : "";

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: animationVariant === "slide" ? 20 : 0,
      scale: animationVariant === "scale" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={animationVariant !== "none" ? variants : undefined}
      className={cn(
        "group relative overflow-hidden bg-card",
        roundedClass,
        hover === "glow" && "shadow-lg",
        hover === "border" && "border-2 border-muted"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn("relative overflow-hidden", aspectRatioClass)}>
        {!isLoaded && <ImageSkeleton aspectRatio={item.aspectRatio} />}
        <img
          src={item.image}
          alt={item.title}
          className={cn(
            "h-full w-full object-cover transition-all duration-300",
            hoverEffectClass,
            !isLoaded && "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />

        {/* Overlay with info on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 flex flex-col justify-end",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          )}
        >
          <h3 className="text-white font-medium text-lg line-clamp-2">
            {item.title}
          </h3>
          {item.description && (
            <p className="text-white/80 text-sm mt-1 line-clamp-2">
              {item.description}
            </p>
          )}

          {/* Categories and tags */}
          {(showCategories || showTags) && (
            <div className="flex flex-wrap gap-1 mt-2">
              {showCategories && item.category && (
                <Badge variant="secondary" className="text-xs">
                  {item.category}
                </Badge>
              )}
              {showTags &&
                item.tags &&
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
          {showAuthors && item.author && (
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
          className={cn(
            "absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            "hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          )}
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
      </div>
    </motion.div>
  );
};

// Lightbox component
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

// Filter and sort controls
const GalleryControls = ({
  categories,
  activeCategory,
  setActiveCategory,
  sortOptions,
  activeSort,
  setActiveSort,
  searchQuery,
  setSearchQuery,
}: {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortOptions: { value: string; label: string }[];
  activeSort: string;
  setActiveSort: (sort: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  return (
    <div className="mb-8 space-y-4">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search gallery..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
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

      {/* Sort options */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={activeSort === option.value ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveSort(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component
const GalleryBento1 = ({
  items = defaultGalleryItems,
  className,
  columns = 3,
  gap = "medium",
  padding = "medium",
  rounded = "medium",
  hover = "zoom",
  showCategories = true,
  showTags = false,
  showAuthors = true,
  enableLightbox = true,
  enableFiltering = true,
  enableSorting = true,
  enableSearch = true,
  enableMasonry = true,
  darkMode = false,
  animationVariant = "fade",
}: GalleryBento1Props) => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = Array.from(
    new Set(items.map((item) => item.category).filter(Boolean) as string[])
  );

  // Sort options
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "popular", label: "Most Popular" },
  ];

  // Filter and sort items
  useEffect(() => {
    let filtered = [...items];

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter((item) => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.description &&
            item.description.toLowerCase().includes(query)) ||
          (item.tags &&
            item.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Sort items
    switch (activeSort) {
      case "newest":
        filtered.sort((a, b) => {
          if (!a.date || !b.date) return 0;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        break;
      case "oldest":
        filtered.sort((a, b) => {
          if (!a.date || !b.date) return 0;
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        break;
      case "popular":
        filtered.sort((a, b) => {
          const aLikes = a.stats?.likes || 0;
          const bLikes = b.stats?.likes || 0;
          return bLikes - aLikes;
        });
        break;
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        break;
    }

    setGalleryItems(filtered);
  }, [items, activeCategory, activeSort, searchQuery]);

  // Handle lightbox navigation
  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < galleryItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Gap classes
  const gapClass =
    gap === "small" ? "gap-2" : gap === "large" ? "gap-6" : "gap-4";

  // Padding classes
  const paddingClass =
    padding === "small" ? "p-2" : padding === "large" ? "p-6" : "p-4";

  // Grid columns classes
  const gridColsClass =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  // Masonry layout helper
  const getMasonrySpan = (item: GalleryItem, index: number) => {
    if (!enableMasonry) return {};

    // For featured items or every 5th item in a 3-column layout
    if (item.featured || index % 5 === 0) return { gridColumn: "span 2" };
    return {};
  };

  return (
    <div className={cn("grid", gridColsClass, gapClass, paddingClass)}>
      {galleryItems.map((item, index) => (
        <GalleryItemCard
          key={item.id}
          item={item}
          onClick={() => {
            setCurrentIndex(index);
            setLightboxOpen(true);
          }}
          hover={hover}
          rounded={rounded}
          showCategories={showCategories}
          showTags={showTags}
          showAuthors={showAuthors}
          animationVariant={animationVariant}
        />
      ))}
      {lightboxOpen && (
        <Lightbox
          items={galleryItems}
          currentIndex={currentIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};

export default GalleryBento1;
