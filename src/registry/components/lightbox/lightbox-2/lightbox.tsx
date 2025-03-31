"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/registry/components/dialog";
import { Button } from "@/registry/components/button/select";
import { Skeleton } from "@/registry/components/skeleton";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Download,
  Info,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCw,
  Grid3X3,
  Image as ImageIcon,
  Play,
  Pause,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/registry/components/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/components/tabs";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import { FadeIn, SlideIn } from "@/registry/components/framer";
import { VisuallyHidden } from "../../visually-hidden/visually-hidden-1/visually-hidden";

// Types
export interface MediaItem {
  id: string;
  type: "image" | "video";
  src: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  alt?: string;
  width?: number;
  height?: number;
  tags?: string[];
  metadata?: {
    capturedAt?: string;
    location?: string;
    camera?: string;
    exposure?: string;
    aperture?: string;
    iso?: string;
    focalLength?: string;
    [key: string]: string | undefined;
  };
  author?: {
    name: string;
    avatar?: string;
    url?: string;
  };
}

export interface LightboxProps {
  items: MediaItem[];
  initialIndex?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  thumbnailsPosition?: "bottom" | "right" | "none";
  showThumbnails?: boolean;
  showControls?: boolean;
  showInfo?: boolean;
  showZoom?: boolean;
  showRotate?: boolean;
  showFullscreen?: boolean;
  showSlideshow?: boolean;
  showDownload?: boolean;
  showShare?: boolean;
  showLike?: boolean;
  slideInterval?: number;
  enableKeyboardNavigation?: boolean;
  enableSwipe?: boolean;
  enableMouseWheel?: boolean;
  enablePinchZoom?: boolean;
  darkMode?: boolean;
  renderCustomControls?: (props: {
    currentIndex: number;
    totalItems: number;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
  }) => React.ReactNode;
  onIndexChange?: (index: number) => void;
  onLike?: (item: MediaItem) => void;
  onShare?: (item: MediaItem) => void;
  onDownload?: (item: MediaItem) => void;
}

// Helper components
const MediaViewer = ({
  item,
  zoom,
  rotation,
  onLoad,
  onError,
  isActive,
}: {
  item: MediaItem;
  zoom: number;
  rotation: number;
  onLoad: () => void;
  onError: () => void;
  isActive: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Reset position when item changes
  useEffect(() => {
    if (isActive) {
      x.set(0);
      y.set(0);
      setIsLoaded(false);
    }
  }, [item.id, isActive, x, y]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  if (item.type === "video") {
    return (
      <>
        {!isLoaded && (
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        )}
        <video
          src={item.src}
          controls
          className={cn(
            "max-h-full max-w-full transition-opacity duration-300",
            !isLoaded && "opacity-0"
          )}
          onLoadedData={handleLoad}
          onError={onError}
        />
      </>
    );
  }

  return (
    <>
      {!isLoaded && (
        <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
      )}
      <motion.div
        style={{
          x,
          y,
        }}
        drag={zoom > 1}
        dragConstraints={{
          top: -1000,
          right: 1000,
          bottom: 1000,
          left: -1000,
        }}
        className="h-full w-full flex items-center justify-center"
      >
        <motion.img
          src={item.src}
          alt={item.alt || item.title || "Image"}
          style={{
            scale: zoom,
            rotate: rotation,
          }}
          className={cn(
            "max-h-full max-w-full object-contain transition-opacity duration-300",
            !isLoaded && "opacity-0"
          )}
          onLoad={handleLoad}
          onError={onError}
          draggable={false}
        />
      </motion.div>
    </>
  );
};

const Thumbnail = ({
  item,
  isActive,
  onClick,
}: {
  item: MediaItem;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-16 w-16 overflow-hidden rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary",
        isActive
          ? "ring-2 ring-primary"
          : "opacity-70 hover:opacity-100 focus:opacity-100"
      )}
    >
      <img
        src={item.thumbnail || item.src}
        alt={item.alt || item.title || "Thumbnail"}
        className="h-full w-full object-cover"
      />
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Play className="h-4 w-4 text-white" />
        </div>
      )}
    </button>
  );
};

const InfoPanel = ({ item }: { item: MediaItem }) => {
  if (!item) return null;

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        {item.title && <h3 className="text-lg font-medium">{item.title}</h3>}

        {item.author && (
          <div className="mt-2 flex items-center">
            {item.author.avatar && (
              <img
                src={item.author.avatar}
                alt={item.author.name}
                className="mr-2 h-6 w-6 rounded-full"
              />
            )}
            <span className="text-sm text-muted-foreground">
              By{" "}
              {item.author.url ? (
                <a
                  href={item.author.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {item.author.name}
                </a>
              ) : (
                item.author.name
              )}
            </span>
          </div>
        )}

        {item.description && (
          <p className="mt-4 text-sm text-muted-foreground">
            {item.description}
          </p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="mt-4">
            <h4 className="mb-2 text-sm font-medium">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {item.metadata && Object.keys(item.metadata).length > 0 && (
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium">Details</h4>
            <div className="rounded-md border">
              <div className="grid grid-cols-2 gap-2 p-3">
                {item.metadata.capturedAt && (
                  <>
                    <div className="text-xs text-muted-foreground">Date</div>
                    <div className="text-xs">{item.metadata.capturedAt}</div>
                  </>
                )}
                {item.metadata.location && (
                  <>
                    <div className="text-xs text-muted-foreground">
                      Location
                    </div>
                    <div className="text-xs">{item.metadata.location}</div>
                  </>
                )}
                {item.metadata.camera && (
                  <>
                    <div className="text-xs text-muted-foreground">Camera</div>
                    <div className="text-xs">{item.metadata.camera}</div>
                  </>
                )}
                {item.metadata.exposure && (
                  <>
                    <div className="text-xs text-muted-foreground">
                      Exposure
                    </div>
                    <div className="text-xs">{item.metadata.exposure}</div>
                  </>
                )}
                {item.metadata.aperture && (
                  <>
                    <div className="text-xs text-muted-foreground">
                      Aperture
                    </div>
                    <div className="text-xs">{item.metadata.aperture}</div>
                  </>
                )}
                {item.metadata.iso && (
                  <>
                    <div className="text-xs text-muted-foreground">ISO</div>
                    <div className="text-xs">{item.metadata.iso}</div>
                  </>
                )}
                {item.metadata.focalLength && (
                  <>
                    <div className="text-xs text-muted-foreground">
                      Focal Length
                    </div>
                    <div className="text-xs">{item.metadata.focalLength}</div>
                  </>
                )}
                {/* Render any additional metadata */}
                {Object.entries(item.metadata)
                  .filter(
                    ([key]) =>
                      ![
                        "capturedAt",
                        "location",
                        "camera",
                        "exposure",
                        "aperture",
                        "iso",
                        "focalLength",
                      ].includes(key)
                  )
                  .map(([key, value]) => (
                    <React.Fragment key={key}>
                      <div className="text-xs text-muted-foreground">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </div>
                      <div className="text-xs">{value}</div>
                    </React.Fragment>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

// Main component
const Lightbox = ({
  items,
  initialIndex = 0,
  open = false,
  onOpenChange,
  className,
  thumbnailsPosition = "bottom",
  showThumbnails = true,
  showControls = true,
  showInfo = true,
  showZoom = true,
  showRotate = true,
  showFullscreen = true,
  showSlideshow = true,
  showDownload = true,
  showShare = true,
  showLike = true,
  slideInterval = 5000,
  enableKeyboardNavigation = true,
  enableSwipe = true,
  enableMouseWheel = true,
  enablePinchZoom = true,
  darkMode = false,
  renderCustomControls,
  onIndexChange,
  onLike,
  onShare,
  onDownload,
}: LightboxProps) => {
  const [isOpen, setIsOpen] = useState(open);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with external open state
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Sync with external index
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Notify parent of index changes
  useEffect(() => {
    onIndexChange?.(currentIndex);
  }, [currentIndex, onIndexChange]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen || !enableKeyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          navigateToPrev();
          break;
        case "ArrowRight":
          navigateToNext();
          break;
        case "Escape":
          handleClose();
          break;
        case "+":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "r":
          handleRotate();
          break;
        case "f":
          toggleFullscreen();
          break;
        case " ": // Space
          toggleSlideshow();
          e.preventDefault();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, enableKeyboardNavigation, zoom]);

  // Handle mouse wheel zoom
  useEffect(() => {
    if (!isOpen || !enableMouseWheel) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          handleZoomIn();
        } else {
          handleZoomOut();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isOpen, enableMouseWheel, zoom]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Slideshow functionality
  useEffect(() => {
    if (isSlideshowPlaying) {
      slideshowTimerRef.current = setTimeout(() => {
        if (currentIndex < items.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setIsSlideshowPlaying(false);
        }
      }, slideInterval);
    }

    return () => {
      if (slideshowTimerRef.current) {
        clearTimeout(slideshowTimerRef.current);
      }
    };
  }, [isSlideshowPlaying, currentIndex, items.length, slideInterval]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setZoom(1);
      setRotation(0);
      setIsInfoOpen(false);
      setIsSlideshowPlaying(false);
      setError(null);
    }
  }, [isOpen]);

  // Navigation handlers
  const navigateToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setZoom(1);
      setRotation(0);
      setIsLoading(true);
    }
  }, [currentIndex]);

  const navigateToNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setZoom(1);
      setRotation(0);
      setIsLoading(true);
    }
  }, [currentIndex, items.length]);

  // Zoom handlers
  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  // Rotation handler
  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  // Fullscreen handler
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Slideshow handler
  const toggleSlideshow = useCallback(() => {
    setIsSlideshowPlaying((prev) => !prev);
  }, []);

  // Close handler
  const handleClose = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  // Media handlers
  const handleMediaLoad = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const handleMediaError = useCallback(() => {
    setIsLoading(false);
    setError("Failed to load media");
  }, []);

  // Action handlers
  const handleLike = useCallback(() => {
    setIsLiked((prev) => !prev);
    if (onLike && items[currentIndex]) {
      onLike(items[currentIndex]);
    }
  }, [currentIndex, items, onLike]);

  const handleShare = useCallback(() => {
    if (onShare && items[currentIndex]) {
      onShare(items[currentIndex]);
    }
  }, [currentIndex, items, onShare]);

  const handleDownload = useCallback(() => {
    if (onDownload && items[currentIndex]) {
      onDownload(items[currentIndex]);
    } else {
      // Default download behavior
      const item = items[currentIndex];
      if (!item) return;

      const link = document.createElement("a");
      link.href = item.src;
      link.download = item.title || `download-${item.id}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [currentIndex, items, onDownload]);

  // Current item
  const currentItem = items[currentIndex];

  if (!currentItem) {
    return null;
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) handleClose();
      }}
    >
      <DialogPortal>
        <DialogOverlay
          className={cn(
            "bg-background/90 backdrop-blur-sm",
            darkMode && "bg-black/90"
          )}
        />
        <DialogContent
          ref={containerRef}
          className={cn(
            "max-w-full max-h-full h-screen w-screen p-0 border-none",
            darkMode ? "bg-black text-white" : "bg-background",
            className
          )}
        >
          <VisuallyHidden>
            <DialogTitle>Lightbox</DialogTitle>
          </VisuallyHidden>
          <div className="flex flex-col h-full">
            {/* Top controls */}
            {showControls && (
              <div
                className={cn(
                  "flex justify-between items-center p-4",
                  darkMode ? "bg-black/50" : "bg-background/50 backdrop-blur-sm"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {currentIndex + 1} / {items.length}
                  </span>
                  {currentItem.title && (
                    <h3 className="text-lg font-medium hidden sm:block">
                      {currentItem.title}
                    </h3>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <TooltipProvider>
                    {showLike && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleLike}
                            className={cn(isLiked && "text-red-500")}
                          >
                            <Heart
                              className="h-5 w-5"
                              fill={isLiked ? "currentColor" : "none"}
                            />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{isLiked ? "Unlike" : "Like"}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {showShare && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleShare}
                          >
                            <Share2 className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Share</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {showDownload && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDownload}
                          >
                            <Download className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    {showInfo && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsInfoOpen(!isInfoOpen)}
                            className={cn(isInfoOpen && "bg-primary/10")}
                          >
                            <Info className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Info</p>
                        </TooltipContent>
                      </Tooltip>
                    )}

                    <DialogClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </DialogClose>
                  </TooltipProvider>
                </div>
              </div>
            )}

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
              {/* Main content */}
              <div className="relative flex-1 flex items-center justify-center">
                {error ? (
                  <div className="text-center p-8">
                    <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">{error}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setError(null)}
                    >
                      Retry
                    </Button>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentItem.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <MediaViewer
                        item={currentItem}
                        zoom={zoom}
                        rotation={rotation}
                        onLoad={handleMediaLoad}
                        onError={handleMediaError}
                        isActive={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Navigation buttons */}
                {showControls && items.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/30 hover:bg-background/50 dark:bg-black/30 dark:hover:bg-black/50"
                      onClick={navigateToPrev}
                      disabled={currentIndex === 0}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/30 hover:bg-background/50 dark:bg-black/30 dark:hover:bg-black/50"
                      onClick={navigateToNext}
                      disabled={currentIndex === items.length - 1}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}
              </div>

              {/* Info panel */}
              {showInfo && isInfoOpen && (
                <div
                  className={cn(
                    "w-80 border-l",
                    darkMode
                      ? "bg-black/50 border-white/10"
                      : "bg-background/50 border-border"
                  )}
                >
                  <InfoPanel item={currentItem} />
                </div>
              )}
            </div>

            {/* Bottom controls */}
            {showControls && (
              <div
                className={cn(
                  "p-4",
                  darkMode ? "bg-black/50" : "bg-background/50 backdrop-blur-sm"
                )}
              >
                <div className="flex justify-between items-center">
                  {/* Zoom and rotate controls */}
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      {showZoom && (
                        <>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomOut}
                                disabled={zoom <= 0.5}
                              >
                                <ZoomOut className="h-5 w-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Zoom Out</p>
                            </TooltipContent>
                          </Tooltip>

                          <span className="text-sm font-mono w-12 text-center">
                            {Math.round(zoom * 100)}%
                          </span>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleZoomIn}
                                disabled={zoom >= 3}
                              >
                                <ZoomIn className="h-5 w-5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Zoom In</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      )}

                      {showRotate && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={handleRotate}
                            >
                              <RotateCw className="h-5 w-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Rotate</p>
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {showFullscreen && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={toggleFullscreen}
                            >
                              {isFullscreen ? (
                                <Minimize2 className="h-5 w-5" />
                              ) : (
                                <Maximize2 className="h-5 w-5" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}

                      {showSlideshow && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={toggleSlideshow}
                            >
                              {isSlideshowPlaying ? (
                                <Pause className="h-5 w-5" />
                              ) : (
                                <Play className="h-5 w-5" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {isSlideshowPlaying
                                ? "Pause Slideshow"
                                : "Play Slideshow"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TooltipProvider>
                  </div>

                  {/* Custom controls */}
                  {renderCustomControls &&
                    renderCustomControls({
                      currentIndex,
                      totalItems: items.length,
                      onNext: navigateToNext,
                      onPrev: navigateToPrev,
                      onClose: handleClose,
                    })}
                </div>

                {/* Thumbnails */}
                {showThumbnails && thumbnailsPosition === "bottom" && (
                  <div className="mt-4">
                    <ScrollArea className="w-full">
                      <div className="flex gap-2 pb-2">
                        {items.map((item, index) => (
                          <Thumbnail
                            key={item.id}
                            item={item}
                            isActive={index === currentIndex}
                            onClick={() => {
                              setCurrentIndex(index);
                              setZoom(1);
                              setRotation(0);
                              setIsLoading(true);
                            }}
                          />
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            )}

            {/* Right thumbnails */}
            {showThumbnails && thumbnailsPosition === "right" && (
              <div
                className={cn(
                  "w-20 border-l overflow-auto",
                  darkMode
                    ? "bg-black/50 border-white/10"
                    : "bg-background/50 border-border"
                )}
              >
                <div className="flex flex-col gap-2 p-2">
                  {items.map((item, index) => (
                    <Thumbnail
                      key={item.id}
                      item={item}
                      isActive={index === currentIndex}
                      onClick={() => {
                        setCurrentIndex(index);
                        setZoom(1);
                        setRotation(0);
                        setIsLoading(true);
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default Lightbox;
