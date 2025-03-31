"use client";

import React, { useState } from "react";
import { 
  Home, 
  FileText, 
  Settings, 
  Users, 
  Inbox, 
  Archive, 
  Star, 
  Trash, 
  BarChart, 
  Package, 
  PanelLeft, 
  Bell,
  LogOut,
  X,
  AlertCircle
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/registry/components/avatar";
import { Button } from "@/registry/components/button";
import { Badge } from "@/registry/components/badge";
import Switch from "@/registry/components/switch/switch-shadcn/switch";
import { Label } from "@/registry/components/label";
import {
  UniversalSidebar, 
  UniversalSidebarToggle,
  SidebarItem,
  SidebarSection,
  SidebarAppearance,
  UniversalSidebarProvider, // Import the provider
} from "./index"; 
import { cn } from "@/lib/utils";

// Main Demo Component - Now wraps everything in the Provider
export function UniversalSidebarDemo() {
  const [sidebarVariant, setSidebarVariant] = useState<"default" | "floating" | "inset">("default");
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">("left");
  const [sidebarCollapsible, setSidebarCollapsible] = useState<"offcanvas" | "icon" | "none">("icon");
  
  const appearance: SidebarAppearance = {
    variant: sidebarVariant,
    position: sidebarPosition,
    collapsible: sidebarCollapsible,
    // defaultOpen is now handled by the provider based on cookie/prop logic
  };

  // Example data structure - navigation items
  const navigationItems: SidebarItem[] = [
    {
      id: "home",
      type: "link",
      title: "Dashboard",
      icon: Home,
      href: "#",
      isActive: true,
    },
    {
      id: "analytics",
      type: "link",
      title: "Analytics",
      icon: BarChart,
      href: "#",
      badge: "New",
    },
    {
      id: "products",
      type: "dropdown",
      title: "Products",
      icon: Package,
      children: [
        {
          id: "all-products",
          type: "link",
          title: "All Products",
          href: "#",
        },
        {
          id: "categories",
          type: "link",
          title: "Categories",
          href: "#",
        },
        {
          id: "inventory",
          type: "link",
          title: "Inventory",
          href: "#",
        },
      ],
    }
  ];
  
  // Example sections
  const sections: SidebarSection[] = [
    {
      id: "messages",
      title: "Messages",
      collapsible: true,
      defaultOpen: true,
      items: [
        {
          id: "inbox",
          type: "link",
          title: "Inbox",
          icon: Inbox,
          href: "#",
          badge: 4,
        },
        {
          id: "starred",
          type: "link",
          title: "Starred",
          icon: Star,
          href: "#",
        },
        {
          id: "archive",
          type: "dropdown",
          title: "Archive",
          icon: Archive,
          children: [
            {
              id: "all-archive",
              type: "dropdown",
              title: "All Archive",
             children: [
                {
                  id: "archive-1",
                  type: "link",
                  title: "Archive 1",
                  href: "#",
                },
                {
                  id: "archive-2",
                  type: "link",
                  title: "Archive 2",
                  href: "#",
                },
                {
                  id: "archive-3",
                  type: "link",
                  title: "Archive 3",
                  href: "#",
                },
              ]
            },
            {
              id: "trash",
              type: "link",
              title: "Trash",
              href: "#",
            },
          ],
        },
        {
          id: "trash",
          type: "link",
          title: "Trash",
          icon: Trash,
          href: "#",
        },
      ],
    },
    {
      id: "team",
      title: "Team",
      collapsible: true,
      items: [
        {
          id: "members",
          type: "link",
          title: "Members",
          icon: Users,
          href: "#",
        },
        {
          id: "settings",
          type: "link",
          title: "Settings",
          icon: Settings,
          href: "#",
        },
      ],
    }
  ];
  const [showTrialNotification, setShowTrialNotification] = useState(true);
  const trialNotificationItem: SidebarItem = {
    id: "trial-notification",
    type: "custom",
    className: "p-2",
    render: ({ className }) => (
      showTrialNotification ? (
        <div className={cn(
          "bg-secondary text-secondary-foreground rounded-md p-3 text-sm relative",
          className
        )}>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1 right-1 h-6 w-6"
            onClick={() => setShowTrialNotification(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss</span>
          </Button>
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="h-4 w-4 text-primary" />
            <span className="font-medium">Trial Ends Soon</span>
          </div>
          <p className="text-xs mb-2">You have 3 days left on your trial.</p>
          <Button size="sm" className="w-full h-8">Upgrade Plan</Button>
        </div>
      ) : null
    ),
  };
  const stickyItems: SidebarItem[] = [trialNotificationItem];
  const sidebarHeader = (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/placeholder.jpg" alt="Company Logo" />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium text-sm">Acme Inc</span>
        <span className="text-xs text-muted-foreground">Workspace</span>
      </div>
    </div>
  );
  const sidebarFooter = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.jpg" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-sm">John Doe</span>
          <span className="text-xs text-muted-foreground">john@example.com</span>
        </div>
        <Button size="icon" variant="ghost" className="ml-auto">
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Log out</span>
        </Button>
      </div>
    </div>
  );

  // Define onItemClick handler if needed
  const handleItemClick = (item: SidebarItem, event: React.MouseEvent) => {
    console.log("Item clicked:", item);
    // Add navigation logic or state updates here if necessary
  };

  // Define onOpenChange handler if needed
  const handleOpenChange = (isOpen: boolean) => {
    console.log("Sidebar open state changed:", isOpen);
  };

  return (
    // Wrap the entire layout with the Provider
    <UniversalSidebarProvider
      appearance={appearance}
      onItemClick={handleItemClick}
      onOpenChange={handleOpenChange}
    >
      <div className="flex h-screen">
        {/* Render the Sidebar component (which consumes context) */}
        <UniversalSidebar
          sections={sections}
          items={navigationItems}
          header={sidebarHeader}
          stickyItems={stickyItems} 
          footer={sidebarFooter}
        />
        
        {/* Render the main content area */}
        <div className="flex-1 overflow-auto">
          {/* Demo Content including the Toggle */}
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-2">
              {/* Toggle is now inside the Provider's scope */}
              <UniversalSidebarToggle /> 
              <h1 className="text-xl font-semibold">Universal Sidebar Demo</h1>
            </div>
            
            {/* Configuration controls */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
               <div className="border rounded-lg p-4 space-y-4">
                 <h2 className="font-medium">Sidebar Appearance</h2>
                 
                 <div className="flex flex-col gap-4">
                   <div className="flex flex-col gap-2">
                     <Label>Variant</Label>
                     <div className="flex gap-2">
                       <Button 
                         variant={sidebarVariant === "default" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarVariant("default")}
                       >
                         Default
                       </Button>
                       <Button 
                         variant={sidebarVariant === "floating" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarVariant("floating")}
                       >
                         Floating
                       </Button>
                       <Button 
                         variant={sidebarVariant === "inset" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarVariant("inset")}
                       >
                         Inset
                       </Button>
                     </div>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <Label>Position</Label>
                     <div className="flex gap-2">
                       <Button 
                         variant={sidebarPosition === "left" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarPosition("left")}
                       >
                         Left
                       </Button>
                       <Button 
                         variant={sidebarPosition === "right" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarPosition("right")}
                       >
                         Right
                       </Button>
                     </div>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <Label>Collapsible</Label>
                     <div className="flex gap-2">
                       <Button 
                         variant={sidebarCollapsible === "offcanvas" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarCollapsible("offcanvas")}
                       >
                         Offcanvas
                       </Button>
                       <Button 
                         variant={sidebarCollapsible === "icon" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarCollapsible("icon")}
                       >
                         Icon
                       </Button>
                       <Button 
                         variant={sidebarCollapsible === "none" ? "default" : "outline"} 
                         size="sm" 
                         onClick={() => setSidebarCollapsible("none")}
                       >
                         None
                       </Button>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="border rounded-lg p-4 col-span-1 md:col-span-2">
                 <h2 className="font-medium mb-4">Features</h2>
                 <ul className="list-disc pl-5 space-y-2">
                   <li>Data-driven structure - items and sections are defined as JSON</li>
                   <li>Multiple item types - links, buttons, dropdowns, dividers, and custom content</li>
                   <li>Collapsible sections with customizable headers</li>
                   <li>Responsive design - adapts to mobile with slide-out sheet</li>
                   <li>Icon-only mode when collapsed</li>
                   <li>Support for badges, icons, and tooltips</li>
                   <li>Keyboard shortcut (Ctrl/Cmd + B) to toggle</li>
                   <li>State persistence via cookies</li>
                   <li>Customizable appearance (variant, position, width)</li>
                   <li>Accessibility features built-in</li>
                   <li>Shadcn UI integration and styling</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    </UniversalSidebarProvider>
  );
}