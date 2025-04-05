"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Button from "@/registry/components/button/button-shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/components/select";
import { cn } from "@/lib/utils";

export type UsePageSelectProps<T = any> = {
  pages: { component: T; id: string; name: string }[];
  initialPageId?: string;
};

export type UsePageSelectReturn<T = any> = {
  selectedPage: { component: T; id: string; name: string };
  selectPage: (pageId: string) => void;
  availablePages: { component: T; id: string; name: string }[];
};

// Custom hook for page selection logic
export function usePageSelect<T = any>({
  pages,
  initialPageId,
}: UsePageSelectProps<T>): UsePageSelectReturn<T> {
  const [selectedPageId, setSelectedPageId] = useState<string>(
    initialPageId || pages[0]?.id || ""
  );

  const selectPage = useCallback((pageId: string) => {
    setSelectedPageId(pageId);
  }, []);

  const selectedPage = pages.find((p) => p.id === selectedPageId) || pages[0];

  return {
    selectedPage,
    selectPage,
    availablePages: pages,
  };
}

// Types for the PageSelect component
export type PageSelectProps<T = any> = {
  disabled?: boolean;
  pages: { component: T; id: string; name: string }[];
  initialPageId?: string;
  children?: (component: T) => ReactElement;
  className?: string;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center" | "center-right" | "center-left";
};

// Main component for page selection
export function PageSelect<T = any>({
  disabled = false,
  pages,
  initialPageId,
  className = "",
  children,
  position = "top-right",
}: PageSelectProps<T>) {
  const { selectedPage, selectPage, availablePages } = usePageSelect({
    pages,
    initialPageId,
  });

  const component = children ? children(selectedPage.component) : null;

  return (
    <div className={cn("relative w-full min-h-[100vh]", className)}>
      <PageSelector
        disabled={disabled}
        position={position}
        availablePages={availablePages}
        selectedPage={selectedPage}
        selectPage={selectPage}
      />
      <div className="w-full h-full">{component}</div>
    </div>
  );
}

// Page Selector Component
export function PageSelector({
  disabled,
  availablePages,
  selectedPage,
  selectPage,
  position = "top-right",
}: {
  disabled?: boolean;
  availablePages: { component: any; id: string; name: string }[];
  selectedPage: { component: any; id: string; name: string };
  selectPage: (pageId: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center" | "center-right" | "center-left";
}) {
  const positionClasses = {
    "top-right": "fixed top-4 right-4 z-10",
    "top-left": "fixed top-4 left-4 z-10",
    "bottom-right": "fixed bottom-4 right-4 z-10",
    "bottom-left": "fixed bottom-4 left-4 z-10",
    "top-center": "fixed top-4 left-1/2 transform -translate-x-1/2 z-10",
    "bottom-center": "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10",
    "center-right": "fixed top-1/2 right-4 transform -translate-y-1/2 z-10",
    "center-left": "fixed top-1/2 left-4 transform -translate-y-1/2 z-10",
  };

  if (!availablePages || !selectPage) {
    return null;
  }

  return (
    <div className={cn("z-999", positionClasses[position])}>
      <Select
        value={selectedPage.id}
        onValueChange={selectPage}
        disabled={disabled}
      >
        <SelectTrigger className="w-[180px] bg-background">
          <SelectValue placeholder="Select page" />
        </SelectTrigger>
        <SelectContent>
          {availablePages.map((page) => (
            <SelectItem key={page.id} value={page.id}>
              {page.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
