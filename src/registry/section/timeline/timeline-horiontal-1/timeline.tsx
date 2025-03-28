"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/registry/components/button/select";
import Badge from "@/registry/components/badge/badge-shadcn/badge";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
  badge?: string;
}

interface TimelineProps {
  heading?: string;
  subheading?: string;
  description?: string;
  items?: TimelineItem[];
  ctaButton?: {
    text: string;
    url: string;
  };
  variant?: "default" | "cards" | "minimal";
  className?: string;
}

const defaultTimelineItems: TimelineItem[] = [
  {
    id: "1",
    date: "2020",
    title: "Company Founded",
    description:
      "Our journey began with a simple idea to transform the industry.",
    isCompleted: true,
    icon: <CheckCircle2 className="h-5 w-5" />,
    badge: "Start",
  },
  {
    id: "2",
    date: "2021",
    title: "First Product Launch",
    description: "We launched our flagship product to critical acclaim.",
    isCompleted: true,
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    id: "3",
    date: "2022",
    title: "Global Expansion",
    description: "Expanded operations to Europe and Asia markets.",
    isCompleted: true,
    icon: <CheckCircle2 className="h-5 w-5" />,
    badge: "Growth",
  },
  {
    id: "4",
    date: "2023",
    title: "Series B Funding",
    description: "Secured $50M to accelerate product development.",
    isActive: true,
    icon: <CheckCircle2 className="h-5 w-5" />,
    badge: "Current",
  },
];

export default function TimelineHorizontal1({
  heading = "Our Journey",
  subheading = "Milestones",
  description = "From humble beginnings to industry leadership, explore the key moments that shaped our path.",
  items = defaultTimelineItems,
  ctaButton,
  variant = "default",
  className,
}: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    // Find the index of the active item or default to the last item
    const activeIdx = items.findIndex((item) => item.isActive);
    return activeIdx >= 0 ? activeIdx : items.length - 1;
  });

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Check if we can scroll in either direction
  useEffect(() => {
    const checkScroll = () => {
      if (timelineRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("resize", checkScroll);
    };
  }, [items]);

  // Scroll to the active item on mount and when activeIndex changes
  useEffect(() => {
    if (timelineRef.current) {
      const itemElements = timelineRef.current.querySelectorAll(
        "[data-timeline-item]"
      );
      if (itemElements[activeIndex]) {
        const itemElement = itemElements[activeIndex] as HTMLElement;
        const containerWidth = timelineRef.current.clientWidth;
        const itemLeft = itemElement.offsetLeft;
        const itemWidth = itemElement.offsetWidth;

        // Center the item in the container
        timelineRef.current.scrollLeft =
          itemLeft - containerWidth / 2 + itemWidth / 2;

        // Check scroll buttons after scrolling
        setTimeout(() => {
          const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current!;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }, 100);
      }
    }
  }, [activeIndex]);

  const handleScroll = (direction: "left" | "right") => {
    if (timelineRef.current) {
      const scrollAmount = timelineRef.current.clientWidth * 0.8;
      const newScrollLeft =
        timelineRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      timelineRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      // Update scroll button states after animation
      setTimeout(() => {
        if (timelineRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = timelineRef.current;
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
        }
      }, 500);
    }
  };

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    controls.start({
      opacity: [0.5, 1],
      y: [10, 0],
      transition: { duration: 0.3 },
    });
  };

  return (
    <section className={cn("py-20 md:py-32 overflow-hidden", className)}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col gap-6 mb-12 text-center items-center">
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-sm font-semibold tracking-wider text-primary uppercase"
            >
              {subheading}
            </motion.p>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="max-w-[800px] text-muted-foreground md:text-xl"
            >
              {description}
            </motion.p>
          )}
        </div>

        <div className="relative">
          {/* Scroll buttons */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full opacity-80 hover:opacity-100"
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full opacity-80 hover:opacity-100"
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Timeline container */}
          <div
            ref={timelineRef}
            className="relative overflow-x-auto pb-8 hide-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />

            {/* Timeline items */}
            <div className="flex min-w-max space-x-16 px-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  data-timeline-item
                  className={cn(
                    "relative pt-16 min-w-[200px] max-w-[300px]",
                    "cursor-pointer transition-all duration-300",
                    activeIndex === index
                      ? "opacity-100"
                      : "opacity-70 hover:opacity-90"
                  )}
                  onClick={() => handleItemClick(index)}
                >
                  {/* Timeline node */}
                  <div
                    className={cn(
                      "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 flex items-center justify-center z-10",
                      item.isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : item.isCompleted
                        ? "border-primary bg-background text-primary"
                        : "border-muted-foreground bg-background text-muted-foreground"
                    )}
                  >
                    {item.icon}
                  </div>

                  {/* Date label */}
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 text-sm font-semibold text-primary">
                    {item.date}
                  </div>

                  {/* Content */}
                  <motion.div
                    animate={activeIndex === index ? controls : {}}
                    className={cn(
                      "text-center",
                      variant === "cards"
                        ? "bg-card border rounded-xl p-6 shadow-sm"
                        : variant === "minimal"
                        ? "p-2"
                        : "p-4"
                    )}
                  >
                    <div className="flex flex-col items-center gap-2 mb-3">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      {item.badge && (
                        <Badge variant="outline" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected item details (optional) */}
        <motion.div
          animate={controls}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          {items[activeIndex] && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{items[activeIndex].title}</h3>
              <p className="text-muted-foreground">
                {items[activeIndex].description}
              </p>
            </div>
          )}
        </motion.div>

        {ctaButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button
              className="gap-2"
              onClick={() => window.open(ctaButton.url, "_blank")}
            >
              {ctaButton.text}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
