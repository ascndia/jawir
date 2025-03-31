"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarSection } from "./types";
import { UniversalSidebarItem } from "./sidebar-item";
import { useUniversalSidebar } from "./sidebar-context";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/components/collapsible";

export function UniversalSidebarSection({ section }: { section: SidebarSection }) {
  const { isOpen: sidebarIsOpen, isMobile, collapsible } = useUniversalSidebar();
  const [isOpen, setIsOpen] = useState(section.defaultOpen !== false);
  const collapsed = !sidebarIsOpen && !isMobile && collapsible === "icon";
  
  // If there's no title or the section is not collapsible, just render items
  if (!section.title || !section.collapsible || collapsed) {
    return (
      <div className={cn("space-y-1 py-2", section.className)}>
        {section.title && (
          <div className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {section.title}
          </div>
        )}
        {section.items.map((item) => (
          <UniversalSidebarItem key={item.id} item={item} />
        ))}
      </div>
    );
  }
  
  // For custom section title rendering
  if (section.renderCustomTitle) {
    return section.renderCustomTitle({
      section,
      isOpen,
      toggle: () => setIsOpen(!isOpen)
    });
  }

  // Default collapsible section
  return (
    <div className={cn("py-2", section.className)}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center">
          <CollapsibleTrigger asChild>
            <button
              className="flex items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors w-full"
              type="button"
            >
              {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              <span>{section.title}</span>
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="mt-1 space-y-1">
            {section.items.map((item) => (
              <UniversalSidebarItem key={item.id} item={item} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}