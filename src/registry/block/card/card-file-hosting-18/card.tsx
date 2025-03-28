"use client";
import * as React from "react";
import { FileText, Folder, GripVertical, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

interface QuickAccessItem {
  id: string;
  name: string;
  type: "file" | "folder";
  lastAccessed?: string; // Optional, e.g., "2 hours ago"
}

interface CardQuickAccessProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  items?: QuickAccessItem[];
  maxHeight?: string;
  onItemClick?: (itemId: string, itemType: "file" | "folder") => void;
  onViewAll?: () => void; // Link to full favorites/recent page
}

const defaultItems: QuickAccessItem[] = [
  {
    id: "qa1",
    name: "Project Proposal V2.docx",
    type: "file",
    lastAccessed: "15 mins ago",
  },
  {
    id: "qa2",
    name: "Marketing Assets",
    type: "folder",
    lastAccessed: "1 hour ago",
  },
  {
    id: "qa3",
    name: "Client Presentation Q4.pptx",
    type: "file",
    lastAccessed: "3 hours ago",
  },
  {
    id: "qa4",
    name: "Design System",
    type: "folder",
    lastAccessed: "Yesterday",
  },
  {
    id: "qa5",
    name: "Annual Report Draft.docx",
    type: "file",
    lastAccessed: "2 days ago",
  },
];

const getItemIcon = (type: "file" | "folder") => {
  switch (type) {
    case "file":
      return <FileText className="h-4 w-4 text-muted-foreground" />;
    case "folder":
      return <Folder className="h-4 w-4 text-primary" />; // Different color for folders
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

export function CardFileHosting18({
  className,
  title = "Quick Access",
  description = "Your frequently accessed files and folders.",
  items = defaultItems,
  maxHeight = "300px",
  onItemClick = (id, type) => console.log("Clicked item:", id, type),
  onViewAll = () => console.log("View all quick access"),
  ...props
}: CardQuickAccessProps) {
  return (
    <Card className={cn("w-full max-w-sm", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />{" "}
            {/* Star icon */}
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          <Button
            variant="link"
            size="sm"
            onClick={onViewAll}
            className="h-auto p-0"
          >
            View All
          </Button>
        </div>
        <CardDescription className="pt-1 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {items.length > 0 ? (
            <div className="space-y-0">
              {" "}
              {/* Reduced spacing */}
              {items.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div
                    className="flex items-center justify-between rounded-md p-3 hover:bg-muted/50 cursor-pointer"
                    onClick={() => onItemClick(item.id, item.type)}
                  >
                    <div className="flex min-w-0 items-center space-x-3">
                      <div className="flex-shrink-0">
                        {getItemIcon(item.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className="truncate text-sm font-medium"
                          title={item.name}
                        >
                          {item.name}
                        </p>
                        {item.lastAccessed && (
                          <p className="text-xs text-muted-foreground">
                            Accessed {item.lastAccessed}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* Optional: Add a drag handle or remove button */}
                    {/* <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" /> */}
                  </div>
                  {index < items.length - 1 && (
                    <Separator className="ml-3 mr-3" />
                  )}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex h-[150px] items-center justify-center p-4 text-center text-sm text-muted-foreground">
              No items in Quick Access yet.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
