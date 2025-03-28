"use client";

import * as React from "react";
import {
  Clock,
  FileText,
  Folder,
  MoreVertical,
  Trash,
  Trash2,
  Undo,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

type DeletedItemType = "file" | "folder";

interface DeletedItem {
  id: string;
  name: string;
  type: DeletedItemType;
  deletedAt: string; // e.g., "2 days ago"
  daysUntilDeletion: number; // e.g., 28
  originalLocation?: string; // Optional
}

interface CardTrashProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  deletedItems?: DeletedItem[];
  maxHeight?: string;
  onRestoreItem?: (itemId: string) => void;
  onPermanentlyDeleteItem?: (itemId: string) => void;
  onEmptyTrash?: () => void; // Optional global action
}

const defaultDeletedItems: DeletedItem[] = [
  {
    id: "del1",
    name: "Old Budget Spreadsheet.xlsx",
    type: "file",
    deletedAt: "2 days ago",
    daysUntilDeletion: 28,
    originalLocation: "/Budgets/Archive/",
  },
  {
    id: "del2",
    name: "Draft Website Mockups",
    type: "folder",
    deletedAt: "5 days ago",
    daysUntilDeletion: 25,
  },
  {
    id: "del3",
    name: "Meeting Notes - Oct 15.docx",
    type: "file",
    deletedAt: "1 week ago",
    daysUntilDeletion: 23,
    originalLocation: "/Meetings/",
  },
  {
    id: "del4",
    name: "Temporary Files",
    type: "folder",
    deletedAt: "2 weeks ago",
    daysUntilDeletion: 16,
  },
];

const getItemIcon = (type: DeletedItemType) => {
  switch (type) {
    case "file":
      return <FileText className="h-4 w-4 text-muted-foreground" />;
    case "folder":
      return <Folder className="h-4 w-4 text-muted-foreground" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

export function CardFileHosting11({
  className,
  title = "Trash",
  description = "Items in trash will be permanently deleted after 30 days.",
  deletedItems = defaultDeletedItems,
  maxHeight = "350px",
  onRestoreItem = (id) => console.log("Restore item:", id),
  onPermanentlyDeleteItem = (id) => console.log("Permanently delete item:", id),
  onEmptyTrash = () => console.log("Empty trash"),
  ...props
}: CardTrashProps) {
  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trash className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          {deletedItems.length > 0 && (
            <Button variant="outline" size="sm" onClick={onEmptyTrash}>
              <Trash2 className="mr-1.5 h-4 w-4" />
              Empty Trash
            </Button>
          )}
        </div>
        <CardDescription className="pt-1 text-sm">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {deletedItems.length > 0 ? (
            <div className="space-y-1 p-4 pt-0">
              {deletedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative flex items-center justify-between rounded-md p-2 hover:bg-muted/50"
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
                      <p className="text-xs text-muted-foreground">
                        Deleted {item.deletedAt}
                        {item.originalLocation &&
                          ` from ${item.originalLocation}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 items-center space-x-1">
                    <Badge
                      variant="outline"
                      className="hidden sm:inline-flex items-center text-xs"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {item.daysUntilDeletion} days left
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Item options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => onRestoreItem(item.id)}
                        >
                          <Undo className="mr-2 h-4 w-4" />
                          <span>Restore</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => onPermanentlyDeleteItem(item.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete permanently</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  {index < deletedItems.length - 1 && (
                    <Separator className="absolute bottom-[-2px] left-4 right-4 h-px" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center p-4 text-center text-sm text-muted-foreground">
              Trash is empty.
            </div>
          )}
        </ScrollArea>
      </CardContent>
      {/* Optional Footer for summary or different view */}
    </Card>
  );
}
