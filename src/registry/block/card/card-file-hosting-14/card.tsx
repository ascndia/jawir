"use client";

import * as React from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Folder,
  MoreVertical,
  RefreshCw,
  WifiOff,
  Clock, // Added
} from "lucide-react";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import { Progress } from "@/registry/components/progress"; // For syncing progress
import { ScrollArea } from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";

type OfflineStatus = "synced" | "syncing" | "error" | "pending";

interface OfflineItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size: string; // Local size
  status: OfflineStatus;
  syncProgress?: number; // 0-100, only for 'syncing' status
  errorMessage?: string; // Only for 'error' status
}

interface CardOfflineAccessProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  offlineItems?: OfflineItem[];
  totalOfflineSize?: string;
  maxHeight?: string;
  onRemoveOfflineAccess?: (itemId: string) => void;
  onRetrySync?: (itemId: string) => void;
  onForceSync?: () => void; // Optional global action
}

const defaultOfflineItems: OfflineItem[] = [
  {
    id: "off1",
    name: "Client Presentation Q4.pptx",
    type: "file",
    size: "85.2 MB",
    status: "synced",
  },
  {
    id: "off2",
    name: "Design Assets - Project Phoenix",
    type: "folder",
    size: "1.1 GB",
    status: "syncing",
    syncProgress: 65,
  },
  {
    id: "off3",
    name: "Archived Reports",
    type: "folder",
    size: "550 MB",
    status: "error",
    errorMessage: "Insufficient storage space",
  },
  {
    id: "off4",
    name: "Contract Draft v3.docx",
    type: "file",
    size: "1.2 MB",
    status: "pending", // Waiting to sync
  },
];

const getItemIcon = (type: OfflineItem["type"]) => {
  switch (type) {
    case "file":
      return <FileText className="h-4 w-4 text-muted-foreground" />;
    case "folder":
      return <Folder className="h-4 w-4 text-muted-foreground" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusIndicator = (status: OfflineStatus) => {
  switch (status) {
    case "synced":
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Synced</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "syncing":
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Syncing...</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "error":
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <AlertCircle className="h-4 w-4 text-destructive" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Sync Error</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    case "pending":
      return (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Clock className="h-4 w-4 text-muted-foreground/70" />{" "}
              {/* Assuming Clock exists */}
            </TooltipTrigger>
            <TooltipContent>
              <p>Pending sync</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    default:
      return null;
  }
};

export function CardFileHosting14({
  className,
  title = "Offline Access",
  description = "Files and folders available when offline.",
  offlineItems = defaultOfflineItems,
  totalOfflineSize = "1.7 GB", // Example calculation
  maxHeight = "400px",
  onRemoveOfflineAccess = (id) => console.log("Remove offline access:", id),
  onRetrySync = (id) => console.log("Retry sync:", id),
  onForceSync = () => console.log("Force sync all"),
  ...props
}: CardOfflineAccessProps) {
  return (
    <Card className={cn("w-full max-w-lg", className)} {...props}>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <WifiOff className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onForceSync}
                  className="h-8 w-8"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span className="sr-only">Sync Now</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sync All Now</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="pt-1 text-sm">
          {description} Total size: {totalOfflineSize}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea style={{ height: maxHeight }} className="pr-4">
          {offlineItems.length > 0 ? (
            <div className="space-y-2 p-4 pt-0">
              {offlineItems.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex min-w-0 items-center space-x-2">
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
                          {item.size}
                          {item.status === "error" && item.errorMessage && (
                            <span className="ml-2 text-destructive">
                              ({item.errorMessage})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center space-x-1">
                      {getStatusIndicator(item.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Item options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {item.status === "error" && (
                            <DropdownMenuItem
                              onClick={() => onRetrySync(item.id)}
                            >
                              <RefreshCw className="mr-2 h-4 w-4" />
                              <span>Retry Sync</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={() => onRemoveOfflineAccess(item.id)}
                          >
                            <WifiOff className="mr-2 h-4 w-4" />
                            <span>Remove Offline Access</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {item.status === "syncing" &&
                    item.syncProgress !== undefined && (
                      <Progress
                        value={item.syncProgress}
                        className="h-1 w-full"
                      />
                    )}
                  {/* Add separator if needed */}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[200px] items-center justify-center p-4 text-center text-sm text-muted-foreground">
              No items available offline.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
