"use client";

import React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/components/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetDescription 
} from "@/registry/components/sheet";
import { ScrollArea } from "@/registry/components/scroll-area";
import { UniversalSidebarProvider, useUniversalSidebar } from "./sidebar-context";
import { UniversalSidebarSection } from "./sidebar-section";
import { UniversalSidebarItem } from "./sidebar-item";
import { SidebarItem, SidebarProps } from "./types";

// Main wrapper component that provides the sidebar context
export function UniversalSidebar({
  sections = [],
  items = [],
  header,
  footer,
  className,
  appearance = {},
  renderCustomItem,
  stickyItems = [],
  onItemClick,
  onOpenChange,
}: SidebarProps) {
  return (
    <UniversalSidebarProvider
      appearance={appearance}
      onOpenChange={onOpenChange}
      onItemClick={onItemClick}
      
    
    >
      <SidebarContainer
  
        sections={sections}
        items={items}
        header={header}
        footer={footer}
        className={className}
        renderCustomItem={renderCustomItem}
        stickyItems={stickyItems}
      />
    </UniversalSidebarProvider>
  );
}

// Sidebar toggle button that can be placed anywhere in the app
export function UniversalSidebarToggle({ 
  className,
  ...props 
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useUniversalSidebar();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

// Inner container component that implements the sidebar UI
function SidebarContainer({
  sections = [],
  items = [],
  header,
  stickyItems = [], // Keep prop definition for consistency
  footer,
  className,
  renderCustomItem,
}: Omit<SidebarProps, "appearance" | "onOpenChange" | "onItemClick"> & { stickyItems?: SidebarItem[] }) {
  const { 
    isOpen, 
    openMobile, 
    setOpenMobile,
    isMobile, 
    variant,
    collapsible,
    position,
    appearance
  } = useUniversalSidebar();
  
  const sidebarWidth = appearance.width || "16rem";
  const collapsedWidth = appearance.collapsedWidth || "3rem";
  
  // Mobile version uses Sheet component
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={position === "right" ? "right" : "left"}
          className={cn(
            "flex flex-col w-[80vw] max-w-xs p-0 bg-background",
            appearance.className
          )}
        >
          {/* Header */}
          {header && (
            <div className={cn("px-4 py-3 border-b", appearance.headerClassName)}>
              {header}
            </div>
          )}
          
          {/* Scrollable content area */}
          <ScrollArea className="flex-1">
            <div className={cn("px-2 py-2", appearance.contentClassName)}>
              {sections.length > 0 && 
                sections.map(section => (
                  <UniversalSidebarSection key={section.id} section={section} />
                ))
              }
              {items.length > 0 && 
                <div className="space-y-1">
                  {items.map(item => (
                    renderCustomItem ? (
                      <div key={item.id}>{renderCustomItem(item)}</div>
                    ) : (
                      <UniversalSidebarItem key={item.id} item={item} />
                    )
                  ))}
                </div>
              }
            </div>
          </ScrollArea>
          
          {stickyItems.length > 0 && (
            <div className="mt-auto border-t flex-shrink-0"> {/* Use mt-auto to push it down */}
              <div className="px-2 py-2 space-y-1">
                {stickyItems.map(item => (
                  renderCustomItem ? (
                    <div key={item.id}>{renderCustomItem(item)}</div>
                  ) : (
                    <UniversalSidebarItem key={item.id} item={item} />
                  )
                ))}
              </div>
            </div>
          )}
          
          {/* Footer */}
          {footer && (
            <div className={cn("px-4 py-3 border-t mt-auto", appearance.footerClassName)}>
              {footer}
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }
  
  // Desktop version
  return (
    <div
      className={cn(
        "h-full flex flex-col border-r transition-all duration-300 ease-in-out bg-background", // Added bg-background
        position === "right" ? "border-l" : "border-r",
        variant === "floating" && "rounded-lg border shadow-sm m-2",
        variant === "inset" && "rounded-l-lg border shadow-sm m-2", // Should likely be rounded based on position
        className
      )}
      style={{
        width: isOpen ? sidebarWidth : collapsedWidth,
      }}
    >
      {/* Header */}
      {header && (
        <div className={cn(
          "px-4 py-3 border-b flex-shrink-0", // Added flex-shrink-0
          !isOpen && "flex items-center justify-center p-2",
          appearance.headerClassName
        )}>
          {/* Render header content, potentially hiding text when collapsed */} 
          {isOpen ? header : (React.isValidElement(header) && (header as React.ReactElement<any>).props.children && Array.isArray((header as React.ReactElement<any>).props.children) ? (header as React.ReactElement<any>).props.children[0] : null) }        </div>
      )}
      
      {/* Scrollable content area */}
      <ScrollArea className="flex-1 min-h-0"> {/* Added min-h-0 for flexbox scroll */}
        <div className={cn(
          "px-2 py-2", 
          !isOpen && "flex flex-col items-center",
          appearance.contentClassName
        )}>
          {sections.length > 0 && 
            sections.map(section => (
              <UniversalSidebarSection key={section.id} section={section} />
            ))
          }
          {items.length > 0 && 
            <div className="space-y-1">
              {items.map(item => (
                renderCustomItem ? (
                  <div key={item.id}>{renderCustomItem(item)}</div>
                ) : (
                  <UniversalSidebarItem key={item.id} item={item} />
                )
              ))}
            </div>
          }
        </div>
      </ScrollArea>
      
      {/* Sticky items section */}
      {stickyItems.length > 0 && (
        <div className={cn(
          "mt-auto border-t flex-shrink-0", // Use mt-auto to push it down
          !isOpen && "flex flex-col items-center p-2" 
        )}>
          <div className={cn(
            "px-2 py-2 space-y-1", 
            !isOpen && "flex flex-col items-center p-0"
          )}>
            {stickyItems.map(item => (
              renderCustomItem ? (
                <div key={item.id}>{renderCustomItem(item)}</div>
              ) : (
                <UniversalSidebarItem key={item.id} item={item} />
              )
            ))}
          </div>
        </div>
      )}
      
      {/* Footer */}
      {footer && (
        <div className={cn(
          "px-4 py-3 border-t mt-auto flex-shrink-0", // Added mt-auto and flex-shrink-0
          !isOpen && "flex items-center justify-center p-2",
          appearance.footerClassName
        )}>
           {/* Render footer content, potentially hiding text when collapsed */} 
           {/* {isOpen ? header : (React.isValidElement(header) && (header as React.Element<any>).props && Array.isArray((header as React.Element<any>).props.children) ? (header as React.Element<any>).props.children[0] : null) } */}
          {isOpen ? footer : (React.isValidElement(footer) && Array.isArray((footer as React.ReactElement<any>).props.children) ? (footer as React.ReactElement<any>).props.children[0] : null) }
        </div>
      )}
    </div>
  );
}