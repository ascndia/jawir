"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card/card-shadcn/card";
import {
  ScrollArea,
  ScrollBar,
} from "@/registry/components/scroll-area/scroll-area-shadcn/scroll-area";
import Badge from "@/registry/components/badge/badge-shadcn/badge";
import Button from "@/registry/components/button/button-shadcn/button";
import { Separator } from "@/registry/components/separator/separator-shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/components/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/components/dropdown-menu/dropdown-menu-shadcn/dropdown-menu";
import {
  Folder,
  Globe,
  Database,
  RefreshCw,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  PlusCircle,
  MoreVertical,
} from "lucide-react";

type SourceType = "folder" | "web" | "database"; // Example types
type SourceStatus = "Active" | "Syncing" | "Error" | "Disabled";

interface RagSource {
  id: string;
  name: string;
  type: SourceType;
  pathOrUrl: string; // Display path or URL
  status: SourceStatus;
  lastSynced: Date | null;
  itemCount?: number; // Optional: e.g., number of files/pages
}

interface CardRagSourceManageListProps {
  sources?: RagSource[];
  className?: string;
  maxHeight?: string; // e.g., "h-[400px]"
  onAddSource?: (type: SourceType) => void;
  onRefreshSource?: (sourceId: string) => void;
  onDeleteSource?: (sourceId: string) => void;
}

// Helper function to format date/time
const formatDateTimeShort = (date: Date | null) => {
  if (!date) return "Never";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export default function CardRagSourceManageList1({
  sources = [
    // Default mock data
    {
      id: "src1",
      name: "Local Documents",
      type: "folder",
      pathOrUrl: "C:/Users/fixgk/Documents/PDFs",
      status: "Active",
      lastSynced: new Date(Date.now() - 3600000 * 2),
      itemCount: 58,
    },
    {
      id: "src2",
      name: "Project Wiki",
      type: "web",
      pathOrUrl: "https://internal.wiki/project-x",
      status: "Syncing",
      lastSynced: new Date(Date.now() - 60000),
      itemCount: 120,
    },
    {
      id: "src3",
      name: "Archived Reports",
      type: "folder",
      pathOrUrl: "D:/Archives/Reports",
      status: "Error",
      lastSynced: new Date(Date.now() - 86400000 * 5),
      itemCount: 210,
    },
    {
      id: "src4",
      name: "Customer Database",
      type: "database",
      pathOrUrl: "PostgreSQL @ db.example.com",
      status: "Disabled",
      lastSynced: null,
      itemCount: 15000,
    },
  ],
  className,
  maxHeight = "h-[400px]",
  onAddSource,
  onRefreshSource,
  onDeleteSource,
}: CardRagSourceManageListProps) {
  const getStatusInfo = (
    status: SourceStatus
  ): {
    variant: "default" | "secondary" | "destructive" | "outline";
    icon: React.ElementType;
  } => {
    switch (status) {
      case "Active":
        return { variant: "default", icon: CheckCircle2 }; // Use 'success' if available
      case "Syncing":
        return { variant: "secondary", icon: Loader2 };
      case "Error":
        return { variant: "destructive", icon: XCircle };
      case "Disabled":
        return { variant: "outline", icon: CheckCircle2 }; // Or a specific 'disabled' icon
      default:
        return { variant: "outline", icon: CheckCircle2 };
    }
  };

  const getSourceTypeIcon = (type: SourceType): React.ElementType => {
    switch (type) {
      case "folder":
        return Folder;
      case "web":
        return Globe;
      case "database":
        return Database;
      default:
        return Folder;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>RAG Data Sources</CardTitle>
          <CardDescription>
            Manage the knowledge sources for your agent.
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Source
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Add New Source Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAddSource?.("folder")}>
              <Folder className="mr-2 h-4 w-4" /> Local Folder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onAddSource?.("web")}>
              <Globe className="mr-2 h-4 w-4" /> Web URL/Sitemap
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onAddSource?.("database")}
              disabled
            >
              {" "}
              {/* Example disabled */}
              <Database className="mr-2 h-4 w-4" /> Database (Coming Soon)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className={maxHeight}>
          <div className="space-y-1 p-4 pt-0">
            {sources.map((source, index) => {
              const StatusIcon = getStatusInfo(source.status).icon;
              const statusVariant = getStatusInfo(source.status).variant;
              const SourceIcon = getSourceTypeIcon(source.type);
              const isSyncing = source.status === "Syncing";

              return (
                <React.Fragment key={source.id}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center space-x-3">
                      <SourceIcon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-none">
                          {source.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {source.pathOrUrl}
                        </p>
                        <div className="mt-1 flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>
                            Last Synced:{" "}
                            {formatDateTimeShort(source.lastSynced)}
                          </span>
                          {source.itemCount !== undefined && (
                            <>
                              <span>&middot;</span>
                              <span>
                                {source.itemCount.toLocaleString()} items
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge
                        variant={statusVariant}
                        className="flex items-center space-x-1"
                      >
                        <StatusIcon
                          className={`h-3 w-3 ${
                            isSyncing ? "animate-spin" : ""
                          }`}
                        />
                        <span>{source.status}</span>
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onRefreshSource?.(source.id)}
                            disabled={isSyncing}
                          >
                            <RefreshCw
                              className={`mr-2 h-4 w-4 ${
                                isSyncing ? "animate-spin" : ""
                              }`}
                            />
                            {isSyncing ? "Syncing..." : "Refresh Now"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={() => onDeleteSource?.(source.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Source
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  {index < sources.length - 1 && <Separator />}
                </React.Fragment>
              );
            })}
            {sources.length === 0 && (
              <div className="py-10 text-center text-sm text-muted-foreground">
                No data sources configured yet. Add one to get started.
              </div>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
      {/* Optional Footer */}
      {/* <CardFooter className="text-xs text-muted-foreground p-4 border-t">
        Sources are automatically synced periodically.
      </CardFooter> */}
    </Card>
  );
}
