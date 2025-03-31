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
import { SidebarProps } from "./types";

// Main component that should NOT wrap with the provider since we're doing that in the demo
export function UniversalSidebar({
  sections = [],
  items = [],
  header,
  footer,
  className,
  renderCustomItem,
  stickyItems = [],
}: Omit<SidebarProps, 'appearance' | 'onItemClick' | 'onOpenChange'>) {
  // The context is now provided by the parent component (demo.tsx)
  // Simply render the SidebarContainer which consumes the context
  return (
    <SidebarContainer
      sections={sections}
      items={items}
      header={header}
      footer={footer}
      className={className}
      renderCustomItem={renderCustomItem}
      stickyItems={stickyItems}
    />
  );
}

// Toggle component implementation remains the same
export function UniversalSidebarToggle({ 
  className,
  ...props 
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useUniversalSidebar();

  const handleClick = () => {
    console.log('[UniversalSidebarToggle] Toggle button clicked.'); // Log click
    toggleSidebar();
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={handleClick} // Use the handler with logging
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

// SidebarContainer implementation remains the same
function SidebarContainer({
    sections = [],
    items = [],
    header,
    stickyItems = [],
    footer,
    className,
    renderCustomItem,
 }: Omit<SidebarProps, 'appearance' | 'onItemClick' | 'onOpenChange'>) { 
  const contextState = useUniversalSidebar(); // Get the whole context
  const { isOpen, openMobile, isMobile, setOpenMobile, position, variant, appearance } = contextState; // Destructure needed state & functions

  // Log the state received by the container on each render
  console.log('[SidebarContainer] Rendering with state:', { isOpen, openMobile, isMobile }); 

  const sidebarWidth = appearance.width || "16rem";
  const collapsedWidth = appearance.collapsedWidth || "3rem";

  // Mobile version uses Sheet component
  if (isMobile) {
    return (
      // Use setOpenMobile directly from context for onOpenChange
      <Sheet open={openMobile} onOpenChange={setOpenMobile}> 
        {/* SheetContent and its children */}
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
              {/* Sections and Items rendering */}
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
             <div className="mt-auto border-t flex-shrink-0">
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
            <div className={cn("px-4 py-3 border-t flex-shrink-0", appearance.footerClassName)}>
              {footer}
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }
  
  // Desktop version - Using inline styles for width
  return (
    <div
      data-state={isOpen ? 'open' : 'closed'}
      className={cn(
        "h-full flex flex-col transition-all duration-300 ease-in-out bg-background",
        position === "right" ? "border-l" : "border-r",
        variant === "floating" && "rounded-lg border shadow-sm m-2",
        variant === "inset" && (position === 'left' ? "rounded-r-lg" : "rounded-l-lg") + " border shadow-sm m-2",
        className
      )}
      // Use inline style for width - this works reliably with transitions
      style={{
        width: isOpen ? sidebarWidth : collapsedWidth
      }}
    >
      {/* Header */}
      {header && (
        <div className={cn(
          "px-4 py-3 border-b flex-shrink-0",
          !isOpen && "flex items-center justify-center p-2", // Use direct conditional instead of data attributes
          appearance.headerClassName
        )}>
          {isOpen ? header : (header && React.isValidElement(header) && (header as React.ReactElement<any>).props.children?.[0] ? (header as React.ReactElement<any>).props.children[0] : null)}
        </div>
      )}
      
      {/* Scrollable content area */}
      <ScrollArea className="flex-1 min-h-0">
        <div className={cn(
          "px-2 py-2",
          !isOpen && "flex flex-col items-center", // Use direct conditional instead of data attributes
          appearance.contentClassName
        )}>
          {/* Sections and Items rendering */} 
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
          "mt-auto border-t flex-shrink-0",
          !isOpen && "flex flex-col items-center p-2" // Use direct conditional instead of data attributes
        )}>
          <div className={cn(
            "px-2 py-2 space-y-1", 
            !isOpen && "flex flex-col items-center p-0" // Use direct conditional instead of data attributes
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
          "px-4 py-3 border-t flex-shrink-0", 
          !isOpen && "flex items-center justify-center p-2", // Use direct conditional instead of data attributes
          appearance.footerClassName
        )}>
           {isOpen ? footer : (footer && React.isValidElement(footer) && (footer as React.ReactElement<any>).props.children?.[0] ? (footer as React.ReactElement<any>).props.children[0] : null)}
        </div>
      )}
    </div>
  );
}
