"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MockupItemProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  containerClassName?: string;
}

export function MockupItem({
  children,
  className,
  delay = 0,
  containerClassName,
}: MockupItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay }}
      className={cn(
        "group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 shadow-md",
        containerClassName
      )}
    >
      {children || (
        <>
          <div className="mb-3 h-3 w-10 rounded-full bg-primary/30"></div>
          <div className={cn("space-y-2", className)}>
            <div className="h-2 w-full rounded-full bg-white/10"></div>
            <div className="h-2 w-4/5 rounded-full bg-white/10"></div>
            <div className="h-2 w-2/3 rounded-full bg-white/10"></div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export interface UIMockupProps {
  title?: string;
  children?: ReactNode;
  windowClassName?: string;
  contentClassName?: string;
  showWindowControls?: boolean;
  showBrowserChrome?: boolean;
  bgGradient?: string;
  itemsContainerClassName?: string;
  mockupItems?: ReactNode[];
  itemsPerRow?: number;
  gridClassName?: string;
  baseDelay?: number;
}

export default function UIMockup({
  title,
  children,
  windowClassName,
  contentClassName,
  showWindowControls = true,
  showBrowserChrome = true,
  bgGradient = "bg-gradient-to-br from-neutral-900 to-neutral-950",
  itemsContainerClassName,
  mockupItems,
  itemsPerRow = 4,
  gridClassName,
  baseDelay = 0.8,
}: UIMockupProps) {
  // Grid columns configuration based on itemsPerRow
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const gridColsClass =
    gridCols[itemsPerRow as keyof typeof gridCols] || gridCols[4];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card p-2 shadow-2xl",
        windowClassName
      )}
    >
      <div className="rounded-md bg-black/80 shadow-sm">
        {showBrowserChrome && (
          <div className="flex h-8 items-center border-b border-white/10 px-4">
            {showWindowControls && (
              <div className="flex space-x-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            )}
            {title && (
              <div className="flex flex-1 justify-center">
                <div className="text-xs text-white/50">{title}</div>
              </div>
            )}
          </div>
        )}

        <div className="overflow-hidden">
          <div
            className={cn(
              bgGradient,
              "px-8 py-16 text-center",
              contentClassName
            )}
          >
            {children ? (
              children
            ) : (
              <div
                className={cn(
                  "mx-auto grid max-w-6xl gap-6",
                  gridColsClass,
                  gridClassName
                )}
              >
                {mockupItems
                  ? mockupItems.map((item, i) => <div key={i}>{item}</div>)
                  : Array.from({ length: 8 }).map((_, i) => (
                      <MockupItem key={i} delay={baseDelay + i * 0.1} />
                    ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
