"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SidebarItem,
  SidebarLinkItem,
  SidebarButtonItem,
  SidebarDropdownItem,
  SidebarDividerItem,
  SidebarCustomItem,
} from "./types";
import { useUniversalSidebar } from "./sidebar-context";
import { Button } from "@/registry/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/components/collapsible";
import { Separator } from "@/registry/components/separator";

export function UniversalSidebarItem({ item }: { item: SidebarItem }) {
  const { isOpen, onItemClick, collapsible, isMobile } = useUniversalSidebar();
  const collapsed = !isOpen && !isMobile && collapsible === "icon";
  
  // Handle the item click (for tracking or analytics)
  const handleItemClick = useCallback((e: React.MouseEvent) => {
    if (onItemClick && "type" in item) {
      onItemClick(item, e);
    }
  }, [item, onItemClick]);

  // Render different item types
  if (!("type" in item)) return null;
  
  switch (item.type) {
    case "link":
      return <LinkItem item={item as SidebarLinkItem} collapsed={collapsed} onClick={handleItemClick} />;
    case "button":
      return <ButtonItem item={item as SidebarButtonItem} collapsed={collapsed} onClick={handleItemClick} />;
    case "dropdown":
      return <DropdownItem item={item as SidebarDropdownItem} collapsed={collapsed} onClick={handleItemClick} />;
    case "divider":
      return <DividerItem item={item as SidebarDividerItem} />;
    case "custom":
      return <CustomItem item={item as SidebarCustomItem} />;
    default:
      return null;
  }
}

// Link item component
function LinkItem({ 
  item, 
  collapsed, 
  onClick 
}: { 
  item: SidebarLinkItem; 
  collapsed: boolean; 
  onClick: (e: React.MouseEvent) => void;
}) {
  const { activePath } = useUniversalSidebar();
  const isActive = item.isActive || (activePath && item.href === activePath);
  
  const content = (
    <div 
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground font-medium",
        item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        item.className
      )}
    >
      {item.icon && (
        <div className="flex-shrink-0 w-5 h-5">
          {React.isValidElement(item.icon)
            ? item.icon
            : item.icon && React.createElement(item.icon as any, { className: "w-5 h-5" })}
        </div>
      )}
      
      {!collapsed && (
        <>
          <span className="flex-grow truncate">{item.title}</span>
          
          {item.external && <ExternalLink className="flex-shrink-0 w-4 h-4 ml-1 opacity-70" />}
          
          {item.badge && (
            <div className={cn(
              "flex-shrink-0 flex items-center justify-center rounded-md px-1.5 py-0.5 text-xs bg-muted",
              typeof item.badge === "object" ? item.badge.className : undefined
            )}>
              {typeof item.badge === "object" ? item.badge.content : item.badge}
            </div>
          )}
        </>
      )}
    </div>
  );

  // Wrap with tooltip if collapsed
  const wrappedContent = collapsed && item.tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">
          {typeof item.tooltip === "string" ? item.tooltip : item.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : content;

  // Use Link for internal navigation, <a> for external
  if (item.external) {
    return (
      <a
        href={item.href}
        target={item.target || "_blank"}
        rel="noopener noreferrer"
        className="block w-full no-underline outline-none"
        onClick={onClick}
      >
        {wrappedContent}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      className="block w-full no-underline outline-none"
      onClick={onClick}
    >
      {wrappedContent}
    </Link>
  );
}

// Button item component
function ButtonItem({
  item,
  collapsed,
  onClick,
}: {
  item: SidebarButtonItem;
  collapsed: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    onClick(e);
    item.onClick(e);
  };

  const content = (
    <div
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        item.isActive && "bg-accent text-accent-foreground font-medium",
        item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        item.className
      )}
    >
      {item.icon && (
        <div className="flex-shrink-0 w-5 h-5">
          {React.isValidElement(item.icon)
            ? item.icon
            : item.icon && React.createElement(item.icon as any, { className: "w-5 h-5" })}
        </div>
      )}
      
      {!collapsed && (
        <>
          <span className="flex-grow truncate">{item.title}</span>
          
          {item.badge && (
            <div className={cn(
              "flex-shrink-0 flex items-center justify-center rounded-md px-1.5 py-0.5 text-xs bg-muted",
              typeof item.badge === "object" ? item.badge.className : undefined
            )}>
              {typeof item.badge === "object" ? item.badge.content : item.badge}
            </div>
          )}
        </>
      )}
    </div>
  );

  // Wrap with tooltip if collapsed
  const wrappedContent = collapsed && item.tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">
          {typeof item.tooltip === "string" ? item.tooltip : item.title}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : content;

  return (
    <button
      type="button"
      disabled={item.disabled}
      className="block w-full text-left outline-none"
      onClick={handleClick}
    >
      {wrappedContent}
    </button>
  );
}

// Dropdown item component
function DropdownItem({
  item,
  collapsed,
  onClick,
}: {
  item: SidebarDropdownItem;
  collapsed: boolean;
  onClick: (e: React.MouseEvent) => void;
}) {
  const [isOpen, setIsOpen] = useState(item.defaultOpen || false);
  const toggle = () => setIsOpen(prev => !prev);
  
  // If sidebar is collapsed and we're not on mobile, render as a tooltip dropdown
  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground cursor-pointer",
                item.isActive && "bg-accent text-accent-foreground font-medium",
                item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
                item.className
              )}
            >
              {item.icon && (
                <div className="flex-shrink-0 w-5 h-5">
                  {React.isValidElement(item.icon)
                    ? item.icon
                    : item.icon && React.createElement(item.icon as any, { className: "w-5 h-5" })}
                </div>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="p-1 w-48">
            <div className="flex flex-col gap-1">
              <div className="text-sm font-medium px-2 py-1.5">{item.title}</div>
              {item.children.map((childItem) => (
                <UniversalSidebarItem key={childItem.id} item={childItem} />
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // If not collapsed, render as a collapsible menu
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full"
    >
      <CollapsibleTrigger 
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          item.isActive && "bg-accent text-accent-foreground font-medium",
          item.disabled && "opacity-50 cursor-not-allowed pointer-events-none",
          item.className
        )}
        onClick={(e) => onClick(e)}
        disabled={item.disabled}
      >
        <div className="flex items-center gap-2">
          {item.icon && (
            <div className="flex-shrink-0 w-5 h-5">
              {React.isValidElement(item.icon)
                ? item.icon
                : item.icon && React.createElement(item.icon as any, { className: "w-5 h-5" })}
            </div>
          )}
          <span className="flex-grow truncate">{item.title}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {item.badge && (
            <div className={cn(
              "flex items-center justify-center rounded-md px-1.5 py-0.5 text-xs bg-muted",
              typeof item.badge === "object" ? item.badge.className : undefined
            )}>
              {typeof item.badge === "object" ? item.badge.content : item.badge}
            </div>
          )}
          
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="ml-5 mt-1 space-y-1 border-l pl-2">
          {item.children.map((childItem) => (
            <UniversalSidebarItem key={childItem.id} item={childItem} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// Divider item component
function DividerItem({ item }: { item: SidebarDividerItem }) {
  return <Separator className={cn("my-2", item.className)} />;
}

// Custom item component
function CustomItem({ item }: { item: SidebarCustomItem }) {
  return item.render({ className: item.className });
}